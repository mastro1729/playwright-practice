import { expect, test } from "@playwright/test";

function countOccurrences(str: string): Record<string, number> {
    const counts: Record<string, number> = {};
    for(const char of str) {
        if(!counts[char]){
            counts[char] = 1;
        } else {
            counts[char]++;
        }
    }
    return counts;
}
function firstNonRepeatingChar(str: string): string | null {
    const countsObj = countOccurrences(str);
    //const countsMap = new Map<string, number>(Object.entries(countsObj));
    // Must Loop over the string, not the map
    // Map won't return the first-non-repeating character
    // Because Map sorts entries by key insertion order.
    for(const char of str){
        if(countsObj[char] === 1) {
            return char;
        }
    }
    return null;
}
test('First Non Repeating Char', () => {
    expect(firstNonRepeatingChar("swiss")).toBe("w");
    expect(firstNonRepeatingChar("aabbcc")).toBeNull();
});