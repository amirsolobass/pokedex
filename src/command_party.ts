import type { State } from "./state.js";

export async function commandParty(state: State): Promise<void> {
    if (state.party.length === 0) {
        console.log("Your party is empty! Go catch some Pokemon.");
        return;
    }

    console.log("Your Current Party:");
    console.log("-------------------");

    state.party.forEach((pokemon, index) => {
        // We use a substring of the UUID to keep the UI clean
        const shortId = pokemon.instanceId.split('-')[0];

        console.log(`${index + 1}. ${pokemon.name.toUpperCase()} (ID: ${shortId})`);
        console.log(` - Type: ${pokemon.types.map(t => t.type.name).join('/')}`);
        console.log(` - HP: ${pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat}`);
    });

    console.log("-------------------");
}