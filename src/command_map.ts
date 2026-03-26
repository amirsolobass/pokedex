import type { State } from "./state.js"

export async function commandMap(state: State, ...args: string[]): Promise<void> {
    const locations = await state.pokeapi.fetchLocations(state.nextLocationURL || undefined);
    state.nextLocationURL = locations.next;
    state.prevLocationURL = locations.previous;
    const results = locations.results;
    for (const result of results) {
        console.log(result.name);
    }
}

export async function commandMapb(state: State, ...args: string[]): Promise<void> {
    if (!state.prevLocationURL) {
        throw new Error("you're on the first page");
    }
    const locations = await state.pokeapi.fetchLocations(state.prevLocationURL || undefined);
    state.nextLocationURL = locations.next;
    state.prevLocationURL = locations.previous;
    const results = locations.results;
    for (const result of results) {
        console.log(result.name);
    }
}