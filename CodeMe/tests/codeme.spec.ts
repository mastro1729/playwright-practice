import {expect, test} from '@playwright/test';

function countOccurrences(str: string): Record<string, number>{
    const counts: Record<string, number> = {};
    for(const char of str){
        if(!counts[char]){
            counts[char]=1;
        } else {
            counts[char]=counts[char]+1;
        }
    }
    return counts;
}

test('Count Char Occurrences', () => {
    const input = "Banana";
    const output = countOccurrences(input);
    console.log(output);
})

function moveZerosToEnd(array: number[]): number[]{
    let write = 0;
    for(let read=0; read < array.length; read++){
        if(array[read] !== 0){
            array[write] = array[read];
            write++;
        }
    }

    while(write < array.length){
        array[write] = 0;
        write++;
    }

    return array;
}

test('Move zeros to end', () => {
    const input = [0,0,0,0,1,2,3,0,0,0,4,5,0];
    const output = moveZerosToEnd(input);
    console.log(output);
})

function moveZerosToFront(array: number[]): number[]{
    let write = array.length-1;
    for(let read=array.length-1; read >= 0; read--){
        if(array[read] !== 0){
            array[write] = array[read];
            write--;
        }
    }

    while(write >= 0){
        array[write] = 0;
        write--;
    }

    return array;
}

test('Move zeros to front', () => {
    const input = [0,0,0,0,1,2,3,0,0,0,4,5,0];
    const output = moveZerosToFront(input);
    console.log(output);
})

function moveEvensToFront(array: number[]): number[]{
    let write = array.length-1;
    for(let read=array.length-1; read >= 0; read--){
        if(array[read] !== 0){
            array[write] = array[read];
            write--;
        }
    }

    while(write >= 0){
        array[write] = 0;
        write--;
    }

    return array;
}

test('Move Evens to front', () => {
    const input = [0,0,0,0,1,2,3,0,0,0,4,5,0];
    const output = moveZerosToFront(input);
    console.log(output);
})