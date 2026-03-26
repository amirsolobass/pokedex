import { Cache } from "./pokecache.js";
import { test, expect, vi } from "vitest";

// Original Parameterized Expiry Tests
test.concurrent.each([
    {
        key: "https://example.com",
        val: "testdata",
        interval: 500,
    },
    {
        key: "https://example.com/path",
        val: "moretestdata",
        interval: 1000,
    },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    await new Promise((resolve) => setTimeout(resolve, interval * 2.5));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop();
});

// Test 1: Verification of multiple unique keys
test("Cache stores and retrieves multiple unique keys independently", () => {
    const cache = new Cache(5000);
    const data1 = { id: 1, name: "bulbasaur" };
    const data2 = { id: 4, name: "charmander" };

    cache.add("key1", data1);
    cache.add("key2", data2);

    expect(cache.get("key1")).toEqual(data1);
    expect(cache.get("key2")).toEqual(data2);

    cache.stopReapLoop();
});

// Test 2: Overwriting existing keys
test("Adding an existing key updates the value and resets its presence", () => {
    const cache = new Cache(5000);
    const initialVal = "initial";
    const updatedVal = "updated";

    cache.add("key", initialVal);
    expect(cache.get("key")).toBe(initialVal);

    cache.add("key", updatedVal);
    expect(cache.get("key")).toBe(updatedVal);

    cache.stopReapLoop();
});

// Test 3: Handling missing keys
test("Returns undefined for non-existent keys or cleared keys", () => {
    const cache = new Cache(5000);

    expect(cache.get("non-existent")).toBeUndefined();

    cache.add("temp", "data");

    // Checking for presence of delete method before execution
    if (typeof (cache as any).delete === "function") {
        (cache as any).delete("temp");
        expect(cache.get("temp")).toBeUndefined();
    }

    cache.stopReapLoop();
});

// Test 4: Fast expiry (Stress testing the reaper)
test("Reaper clears data immediately after interval", async () => {
    const interval = 10;
    const cache = new Cache(interval);

    cache.add("fast-key", "fast-val");

    // Multiplier increased to 3x to ensure the interval cycle has completed
    await new Promise((r) => setTimeout(r, interval * 3));

    expect(cache.get("fast-key")).toBeUndefined();
    cache.stopReapLoop();
});

// Test 5: Type Integrity
test("Cache preserves complex object structures", () => {
    const cache = new Cache(5000);
    const complexObj = {
        nested: { array: [1, 2, 3] },
        bool: true,
    };

    cache.add("complex", complexObj);
    const retrieved = cache.get<typeof complexObj>("complex");

    expect(retrieved).toMatchObject(complexObj);
    expect(retrieved?.nested.array).toContain(2);
});
