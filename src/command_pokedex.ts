import type { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    const caught = Object.values(state.caughtPokemon);
    if (caught.length === 0) {
        console.log("You haven't caught any Pokemon yet!");
        return;
    }
    console.log("Your Pokedex:");
    for (const pokemon of caught) {
        console.log(` - ${pokemon.name}`);
    }
}