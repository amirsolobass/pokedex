import type { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
    console.log("Welcome to the Pokedex!\nUsage:");
    let i = 0;
    for (const command of Object.values(state.commands)) {
        console.log(`${i + 1}. ${command.name}: ${command.description}`);
        i++;
    }
}