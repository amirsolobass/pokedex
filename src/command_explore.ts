import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("you must provide a location name");
    }

    // 1. Fetch the location area data
    const locationData = await state.pokeapi.fetchLocation(args[0]);
    console.log(`Exploring ${locationData.name}...`);

    const encounters = locationData.pokemon_encounters;
    if (!encounters || encounters.length === 0) {
        console.log("It's quiet here... no Pokemon found.");
        return;
    }

    // 2. Pick a random encounter from the list
    const randomIndex = Math.floor(Math.random() * encounters.length);
    const randomPokemonName = encounters[randomIndex].pokemon.name;

    // 3. Fetch the full details for that specific Pokemon
    const wildPokemon = await state.pokeapi.fetchPokemon(randomPokemonName);

    // 4. Generate the random level
    const areaLevelMin = 1;
    const areaLevelMax = 10;
    const wildLevel = Math.floor(Math.random() * (areaLevelMax - areaLevelMin + 1)) + areaLevelMin;

    // 5. SET THE ENCOUNTER in the state so 'catch' can see it
    state.currentEncounter = {
        pokemon: wildPokemon,
        level: wildLevel,
        tries: 0,
    };

    console.log(`A wild ${wildPokemon.name.toUpperCase()} (Lv. ${wildLevel}) appeared!`);
    console.log(`Type 'catch ${wildPokemon.name}' to attempt a capture.`);
}