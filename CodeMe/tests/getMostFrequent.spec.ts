import {expect, test} from "@playwright/test";

function countOccurrences(arr: string[]): Record<string, number> {
    const counts: Record<string, number> = {};

    for(const item of arr){
        if(!counts[item]) {
            counts[item]=1;
        } else {
            counts[item]++;
        }
    }
    return counts;
}

function getMostFrequent(map: Map<string, number>): string | null {
    let maxKey: string | null = null;
    let maxCount: number = 0;

    // Loop through the Map entries & 
    // track the key with the highest count 
    // using two variables, maxKey & maxCount

    for(const [key, count] of map) {
        if(count > maxCount) {
            maxCount = count;
            maxKey = key;
        }
    }
    return maxKey;
}

test('Get Most Frequent', () => {
    // Arrange
    const arr: string[] = ["a", "b", "a", "c", "b", "a"];
    // Convert to counts
    const countsObj = countOccurrences(arr);
    // Convert Object to Map
    const countsMap = new Map(Object.entries(countsObj));
    // Act
    const result = getMostFrequent(countsMap);
    console.log(result);
    // Assert
    expect(result).toBe("a");
});