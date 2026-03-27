import * as fs from 'node:fs';
import { State } from './state.js';

export const SAVE_FILE = './save.json';

export function saveGame(state: State): void {
    try {
        const saveData = {
            // Save Pokedex
            caughtPokemon: state.caughtPokemon,
            // Save party
            party: state.party,
            // Save location
            nextLocationURL: state.nextLocationURL,
            prevLocationURL: state.prevLocationURL,
            // Save Discoveries
            discovered: state.discovered,
        };
        const jsonString = JSON.stringify(saveData, null, 2);
        fs.writeFileSync(SAVE_FILE, jsonString, 'utf-8');

        console.log("Progress saved successfully!");
    } catch (err) {
        throw new Error(`Failed to save game: ${(err as Error).message}`);
    }
}