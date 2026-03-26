import type { State } from "./state.js"

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("you must provide a Pokemon name");
    }

    console.log(`Throwing a Pokeball at ${args[0]}...`);
    const pokemon = await state.pokeapi.fetchPokemon(args[0]);
    const base_experience = pokemon.base_experience;
    const catch_chance_numerator = 40;
    const catch_chance = catch_chance_numerator / base_experience;
    if (Math.random() > catch_chance) {
        console.log(`${pokemon.name} escaped!`);
        return;
    }
    else {
        console.log(`${pokemon.name} was caught!`);
        console.log("You may now inspect it with the inspect command.");
        state.caughtPokemon[pokemon.name] = pokemon;
        return;
    }
}