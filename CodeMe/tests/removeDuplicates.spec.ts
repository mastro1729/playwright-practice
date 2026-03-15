import { test } from "@playwright/test";

function removeDuplicates(arr: number[]): number[] {
    // Record is a TypeScript type shortcut 
    // to describe an object with a fixed key type and fixed value type.

    // Create an empty object called seen
    const seen: Record<number, boolean> = {};
    // Create an empty array for final result
    const result: number[] = [];

    // Loop thru each number in the input array
    for (const num of arr) {
        // Check if we have already seen this number
        if (!seen[num]) {
            // Mark this number as seen
            seen[num] = true;
            // Push the number to the result array
            result.push(num);
        }
    }
    return result;
}

test('Remove duplicates', () => {
    const input = [1, 2, 2, 3, 4, 4, 5];
    const output = removeDuplicates(input);
    console.log(output);
})

test('Remove duplicatesI', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const [one, two, ...rest] = numbers;
    console.log(one, two, rest);
})
