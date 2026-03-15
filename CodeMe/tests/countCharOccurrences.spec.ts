import { expect, test } from "@playwright/test";

function countCharOccurrencesWithRecord(str: string): Record<string, number> {
    const counts: Record<string, number> = {};
    for(const char of str) {
        if(!counts[char]) {
            counts[char] = 1;
        } else {
            counts[char]++;
        }
    }
    return counts;
}
function countCharOccurrencesWithMap(str: string): Map<string, number> {
    const map = new Map<string, number>();
    for(const char of str) {
        if(!map.has(char)) {
            map.set(char, 1);
        } else {
            map.set(char, (map.get(char) ?? 0) +1);
        }
    }
    return map;
}
test('Count Char Occurrences', () => {
    const input = "Banana";
    const output = countCharOccurrencesWithRecord(input);
    console.log(output);
})

test('Count Char Occurrences With Map', () => {
    const input = "Banana";
    const output = countCharOccurrencesWithMap(input);
    console.log(output);
})