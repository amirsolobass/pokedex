import type { State } from "./state.js"
import { CaughtPokemon } from "./pokeapi.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("Usage: inspect <pokemon_name_or_id>");
    }

    const input = args[0].toLowerCase();
    const allCaught = Object.values(state.caughtPokemon);

    // 1. First, try to find an EXACT match by the unique instanceId (or short ID)
    const foundById = allCaught.find(p =>
        p.instanceId.toLowerCase() === input ||
        p.instanceId.startsWith(input) // Allows typing just the start of the UUID
    );

    if (foundById) {
        printPokemonDetails(foundById);
        return;
    }

    // 2. If no ID match, find ALL instances with that species name
    const nameMatches = allCaught.filter(p => p.name.toLowerCase() === input);

    if (nameMatches.length === 0) {
        console.log(`You haven't caught a ${input} yet!`);
        return;
    }

    // 3. If there's only ONE, show it. If there are MULTIPLE, show the list of IDs.
    if (nameMatches.length === 1) {
        printPokemonDetails(nameMatches[0]);
    } else {
        console.log(`You have ${nameMatches.length} ${input.toUpperCase()}s. Which one would you like to inspect?`);
        nameMatches.forEach(p => {
            const shortId = p.instanceId.split('-')[0];
            console.log(` - inspect ${shortId} (ID: ${shortId})`);
        });
    }
}

// Helper function to keep commandInspect clean
function printPokemonDetails(pokemon: CaughtPokemon) {
    const shortId = pokemon.instanceId.split('-')[0];
    console.log(`Name: ${pokemon.name.toUpperCase()} (ID: ${shortId})`);
    console.log(`Height: ${pokemon.height / 10}m | Weight: ${pokemon.weight / 10}kg`);
    console.log("Stats:");
    pokemon.stats.forEach(s => console.log(` - ${s.stat.name}: ${s.base_stat}`));
    console.log(`Types: ${pokemon.types.map(t => t.type.name).join(', ')}`);
}