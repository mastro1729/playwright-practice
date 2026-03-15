import {test} from "@playwright/test";

function countWordOccurrencesI(str: string): Record<string, number> {

    const counts: Record<string, number> = {};

    const words = str.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    console.log(words);
    for(const item of words){
        if(!counts[item]){
            counts[item] = 1;
        } else {
            counts[item]++;
        }
    }
    return counts;
}

test('Count Word Occurrences I', () => {
    const input1 = "hello world hello"
    const output1 = countWordOccurrencesI(input1);
    console.log(output1);

    const input11 = "One one ONE two"
    const output11 = countWordOccurrencesI(input11);
    console.log(output11);
})

function countOccurrences(arr: string[]): Record<string, number> {

    const counts: Record<string, number> = {};

    for(const item of arr){
        if(!counts[item]){
            counts[item] = 1;
        } else {
            counts[item]++;
        }
    }
    return counts;
}

function countWordOccurrencesII(str: string): Map<string, number> {

    const map = new Map<string, number>();

    const words = str.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    console.log(words);

    for(const word of words){
        if(!map.has(word)){
            map.set(word, 1);
        } else {
            map.set(word, (map.get(word) ?? 0) + 1);
        }
    }
    return map;
}

test('Count Word Occurrences II', () => {
    const input1 = "hello world hello"
    const output1 = countWordOccurrencesII(input1);
    console.log(output1);

    const input11 = "One one ONE two"
    const output11 = countWordOccurrencesII(input11);
    console.log(output11);
})

function countOccurrencesWithMap(arr: string[]): Map<string, number> {
    const map = new Map<string, number>();
    for(const item of arr){
        if(!map.has(item)){
            map.set(item, 1);
        } else {
            map.set(item, (map.get(item) ?? 0) + 1);
        }
    }
    return map;
}

test('Count Occurrences', () => {
    const input = ["a", "b", "a", "c", "b", "a"];
    const output = countOccurrences(input);
    console.log(output);
})

test('Count Occurrences With Map', () => {
    const input = ["a", "b", "a", "c", "b", "a"];
    const output = countOccurrencesWithMap(input);
    console.log(output);
})