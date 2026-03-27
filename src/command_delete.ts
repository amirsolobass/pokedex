import * as fs from 'node:fs';
import { State } from './state.js';

export async function commandDeleteGame(state: State): Promise<void> {
    const SAVE_FILE = './save.json';

    if (fs.existsSync(SAVE_FILE)) {
        fs.unlinkSync(SAVE_FILE);
        console.log("Save file deleted from disk.");
    }

    // Reset the current session state
    state.caughtPokemon = {};
    state.party = [];
    state.nextLocationURL = "https://pokeapi.co/api/v2/location-area/";
    state.prevLocationURL = null;

    console.log("Session reset. You are starting fresh!");
}