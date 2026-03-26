import type { State } from "./state.js"

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("you must provide a Pokemon name")
    }
    const pokemon = args[0];
    const caught = state.caughtPokemon
    if (pokemon in caught) {
        console.log(`Name: ${caught[pokemon].name}`);
        console.log(`Height: ${caught[pokemon].height}`);
        console.log(`Weight: ${caught[pokemon].weight}`);
        console.log("Stats:");
        for (const stat of caught[pokemon].stats) {
            console.log(` -${stat.stat.name}: ${stat.base_stat}`);
        }
        console.log("Types:");
        for (const type of caught[pokemon].types) {
            console.log(` - ${type.type.name}`);
        }
    }
    else {
        console.log("you have not caught that pokemon");
    }
}