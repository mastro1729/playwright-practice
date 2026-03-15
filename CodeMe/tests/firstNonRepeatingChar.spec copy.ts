import { expect, test } from "@playwright/test";




test('First Non Repeating Char', () => {
    expect(firstNonRepeatingChar("swiss")).toBe("w");
    expect(firstNonRepeatingChar("aabbcc")).toBeNull();
});

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

[0,0,0,0,0,0,1,1,1,1]

function moveZerosToEnd(array: number[]): number[]{
    let counter = 0;
    for(const i=0; i<array.length; i++){
        if(array[i] === 0){
            array[i]=1;
            counter++;
        }
    }

    while(counter < array.length){

    }
}

function moveZerosToBack(arr: number[]): number[] {
    let write = 0;

    for (let read = 0; read < arr.length; read++) {
        if (arr[read] != 0) {
            arr[write] = arr[read];
            write++;
        }
    }

    while (write < arr.length) {
        arr[write] = 0;
        write++;
    }

    return arr;
}
