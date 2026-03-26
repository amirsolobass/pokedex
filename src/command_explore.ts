import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("you must provide a location name");
    }

    const location = await state.pokeapi.fetchLocation(args[0]);
    console.log(`Exploring ${location.name}...`);
    console.log("Found Pokemon:");
    for (const poke of location.pokemon_encounters) {
        console.log(` - ${poke.pokemon.name}`);
    }

}