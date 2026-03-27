import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./get_commands.js";
import { CaughtPokemon, PokeAPI, Pokemon } from "./pokeapi.js";
import * as fs from 'node:fs'
import { SAVE_FILE } from "./savegame.js"


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
    caughtPokemon: Record<string, CaughtPokemon>;
    party: CaughtPokemon[];
    discovered: Record<number, string>;
    currentEncounter: {
        pokemon: Pokemon;
        level: number;
        tries: number;
    } | null;
}

export function initState(cacheInterval: number): State {
    let savedData = {
        caughtPokemon: {},
        party: [],
        nextLocationURL: "https://pokeapi.co/api/v2/location-area/",
        prevLocationURL: null,
        discovered: {},
    };

    if (fs.existsSync(SAVE_FILE)) {
        try {
            const rawData = fs.readFileSync(SAVE_FILE, 'utf-8');
            savedData = JSON.parse(rawData);
            console.log("Welcome back! Loading your Pokedex...")
        } catch (err) {
            console.error("Save file is corrupted, starting fresh.")
        }
    }

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
        nextLocationURL: savedData.nextLocationURL,
        prevLocationURL: savedData.prevLocationURL,
        caughtPokemon: savedData.caughtPokemon,
        party: savedData.party,
        discovered: savedData.discovered,
        currentEncounter: null,
    };
}