import { CaughtPokemon } from "./pokeapi.js";
import { saveGame } from "./savegame.js";
import type { State } from "./state.js"
import { randomUUID } from "node:crypto";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("Usage: catch <pokemon_name>");
    }

    const inputName = args[0].toLowerCase();

    // 1. Check if there is an active encounter
    if (!state.currentEncounter) {
        console.log("There are no wild Pokemon nearby! Use 'explore' first.");
        return;
    }

    const { pokemon, level } = state.currentEncounter;

    // 2. Ensure the name matches what they saw
    if (pokemon.name.toLowerCase() !== inputName) {
        console.log(`That's not a ${inputName}! A wild ${pokemon.name} is right in front of you.`);
        return;
    }

    const encounter = state.currentEncounter!;
    encounter.tries++;


    console.log(`Throwing a Pokeball at Lv. ${level} ${pokemon.name}...`);

    // 3. Catch Logic (Modified by Level)
    const baseChance = 40 / pokemon.base_experience;
    // Higher level Pokemon are slightly harder to catch
    const levelModifier = 1 - (level / 100);
    const finalCatchChance = baseChance * levelModifier;

    if (Math.random() > finalCatchChance) {
        if (encounter.tries >= 3) {
            console.log(`Oh no! The wild ${encounter.pokemon.name} got spooked and fled!`);
            state.currentEncounter = null;
        } else {
            console.log(`${pokemon.name} broke free! Quick, try again!`);
        }
        return;
    }


    // 4. Success! Create the unique instance
    console.log(`Gotcha! ${encounter.pokemon.name} was caught!`);

    const caughtInstance: CaughtPokemon = {
        ...pokemon,
        instanceId: randomUUID(),
        level: level,    // The level we found it at!
        experience: 0,   // Freshly caught, 0 exp toward next level
        speciesId: pokemon.id
    };

    // 5. Update Storage and Discovery
    state.caughtPokemon[caughtInstance.instanceId] = caughtInstance;

    if (!(pokemon.id in state.discovered)) {
        state.discovered[pokemon.id] = pokemon.name;
    }

    // 6. Party Logic
    if (state.party.length < 6) {
        state.party.push(caughtInstance);
        console.log(`${pokemon.name} was added to your party!`);
    } else {
        console.log(`Party full! ${pokemon.name} was sent to storage.`);
    }

    // 7. Cleanup and Persist
    state.currentEncounter = null;
    saveGame(state);
}