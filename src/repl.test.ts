import { cleanInput } from "./repl.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { describe, expect, test } from "vitest";

describe.each([
    {
        input: "  hello  world  ",
        expected: ["hello", "world"],
    },
    {
        input: "   foo   bar   baz   ",
        expected: ["foo", "bar", "baz"],
    },
    {
        input: "   singleword   ",
        expected: ["singleword"],
    },
    {
        input: "   multiple   spaces   between   words   ",
        expected: ["multiple", "spaces", "between", "words"],
    },
    {
        input: "  CASE  INSENSITIVE   TEST  ",
        expected: ["case", "insensitive", "test"],
    }
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        // Call the function with the input
        const actual = cleanInput(input);

        // The `expect` and `toHaveLength` functions are from vitest
        // they will fail the test if the condition is not met
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            // likewise, the `toBe` function will fail the test if the values are not equal
            expect(actual[i]).toBe(expected[i]);
        }
    });
});

//describe.each([
//    {
//        input: "exit"
//    expected:
//}
//])("commandExit", ({ input, expected }) => {
//    test(`Expected: ${expected}`, () => {
//        const actual = commandExit(input);
//
//        expect(actual).to
//    });
//});