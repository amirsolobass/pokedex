import type { State } from "./state.js";
import { saveGame } from "./savegame.js";

export async function commandSwitch(state: State, ...args: string[]): Promise<void> {
    if (args.length < 1) {
        throw new Error("Usage: switch <pokemon_id> [party_index 1-6]");
    }

    const targetId = args[0].toLowerCase();
    const targetSlot = args[1] ? parseInt(args[1]) - 1 : -1;

    // Find the Pokemon in storage
    const pokemon = Object.values(state.caughtPokemon).find(p =>
        p.instanceId.startsWith(targetId)
    );

    if (!pokemon) {
        console.log(`No Pokemon found with ID: ${targetId}`);
        return;
    }

    // Check if already in party
    if (state.party.some(p => p.instanceId === pokemon.instanceId)) {
        console.log(`${pokemon.name} is already in your party!`);
        return;
    }

    // Logic for adding or swapping
    if (targetSlot >= 0 && targetSlot < 6) {
        const oldPokemon = state.party[targetSlot];
        state.party[targetSlot] = pokemon;
        console.log(`Swapped ${oldPokemon ? oldPokemon.name : "empty slot"} for ${pokemon.name}!`);
    } else if (state.party.length < 6) {
        state.party.push(pokemon);
        console.log(`${pokemon.name} added to the party.`);
    } else {
        console.log("Party is full! Use 'switch <id> <1-6>' to replace a specific member.");
        return;
    }

    saveGame(state);
}