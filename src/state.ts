import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./get_commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationURL: string | null;
    prevLocationURL: string | null;
    caughtPokemon: Record<string, Pokemon>;
}

export function initState(cacheInterval: number): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > ',
    });

    const commands = getCommands();

    return {
        readline: rl,
        commands: commands,
        pokeapi: new PokeAPI(cacheInterval),
        nextLocationURL: null,
        prevLocationURL: null,
        caughtPokemon: {},
    };
}