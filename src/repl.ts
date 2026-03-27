import type { State } from './state.js'



// PREVIOUS (LOCAL) REPL IMPLEMENTATION
export function startREPL(state: State) {
    // display the prompt to the user
    state.readline.prompt();

    // listen for input
    state.readline.on("line", async (input) => {
        // clean the input
        const words = cleanInput(input);
        // if the input is empty, just display the prompt again
        if (words.length === 0) {
            state.readline.prompt();
            return;
        }

        // get the command name (the first word of the input)
        const commandName = words[0];

        // get the commands
        const commands = state.commands;

        // actual command
        const actual = commands[commandName];

        if (!actual) {
            console.log(`Unknown command. Type "help" for a list of commands.`);
            state.readline.prompt();
            return;
        }
        // check if command exists
        try {
            await actual.callback(state, ...words.slice(1));
        } catch (e) {
            console.log((e as Error).message);
        }
        state.readline.prompt();

    });
}


export function cleanInput(input: string): string[] {
    return input
        .toLowerCase()
        .trim()
        .split(" ")
        .filter((word) => word !== "");
}
