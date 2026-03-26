import { commandExit } from "./command_exit.js"
import { commandHelp } from "./command_help.js"
import { commandMap, commandMapb } from "./command_map.js"
import { commandExplore } from "./command_explore.js"
import { commandCatch } from "./command_catch.js"
import type { CLICommand, State } from "./state.js"
import { commandInspect } from "./command_inspect.js"
import { commandPokedex } from "./command_pokedex.js"

export function getCommands(): Record<string, CLICommand> {
    return {
        catch: {
            name: "catch",
            description: "Try to catch a Pokemon",
            callback: commandCatch,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        inspect: {
            name: "inspect",
            description: "Shows information about a Pokemon",
            callback: commandInspect,
        },
        map: {
            name: "map",
            description: "Displays the names of 20 (next) location areas in the Pokemon world",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays the names of 20 (previous) location areas in the Pokemon world",
            callback: commandMapb,
        },
        explore: {
            name: "explore",
            description: "Explore a location to find Pokemon",
            callback: commandExplore,
        },
        pokedex: {
            name: "pokedex",
            description: "View your caught Pokemon",
            callback: commandPokedex,
        },
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
    };
}