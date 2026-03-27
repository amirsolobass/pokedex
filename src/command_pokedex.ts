import type { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    const ids = Object.keys(state.discovered).map(Number).sort((a, b) => a - b);

    if (ids.length === 0) {
        console.log("Your Pokedex is empty. Go catch some Pokemon!");
        return;
    }

    console.log("--- POKEDEX (All Discovered Species) ---");
    for (const id of ids) {
        const name = state.discovered[id];
        // Check if we still have at least one in our collection
        const isOwned = Object.values(state.caughtPokemon).some(p => p.speciesId === id);
        const marker = isOwned ? "★" : " ";

        console.log(`${marker} [#${id}] ${name.toUpperCase()}`);
    }
    console.log("---------------------------------------");
}

/*
export async function commandPokedex(state: State): Promise<void> {
    const allCaught = Object.values(state.caughtPokemon);

    if (allCaught.length === 0) {
        console.log("Your Pokedex is empty. Go catch some Pokemon!");
        return;
    }

    console.log("Your Pokedex (Species Caught):");
    console.log("-------------------");

    // 1. Get a unique list of species names
    const uniqueSpecies = new Set(allCaught.map(p => p.name.toLowerCase()));

    // 2. Sort them alphabetically for a professional look
    const sortedSpecies = Array.from(uniqueSpecies).sort();

    // 3. Print the list
    sortedSpecies.forEach((name, index) => {
        // Find the first instance of this species to get the speciesId
        const speciesData = allCaught.find(p => p.name.toLowerCase() === name);
        const speciesId = speciesData ? speciesData.speciesId : "???";

        console.log(`${index + 1}. [#${speciesId}] ${name.toUpperCase()}`);
    });

    console.log("-------------------");
    console.log(`Total unique species: ${uniqueSpecies.size}`);
}
*/