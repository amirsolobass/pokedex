import { saveGame } from "./savegame.js";
import type { State } from "./state.js";

export async function commandRelease(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("Usage: release <pokemon_id>");
    }

    const targetId = args[0].toLowerCase();

    // Find the Pokemon in storage (by full ID or short ID)
    const pokemonToRelease = Object.values(state.caughtPokemon).find(p =>
        p.instanceId.toLowerCase() === targetId ||
        p.instanceId.startsWith(targetId)
    );

    if (!pokemonToRelease) {
        console.log(`No Pokemon found with ID: ${targetId}`);
        return;
    }

    // Remove it from the caughtPokemon storage
    delete state.caughtPokemon[pokemonToRelease.instanceId];

    // 3. Remove it from the party if it's there
    const partyIndex = state.party.findIndex(p => p.instanceId === pokemonToRelease.instanceId);
    if (partyIndex !== -1) {
        state.party.splice(partyIndex, 1);
        console.log(`${pokemonToRelease.name} was removed from your party.`);
    }

    console.log(`${pokemonToRelease.name} has been released back into the wild!`);

    saveGame(state);
}