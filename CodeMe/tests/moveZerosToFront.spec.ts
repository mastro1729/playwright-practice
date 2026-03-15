import { expect, test } from "@playwright/test";

function moveZerosToFront(arr: number[]): number[] {
    let write = arr.length-1;

    for(let read=arr.length-1; read>=0; read--){
        if(arr[read] != 0){
            arr[write] = arr[read];
            write--;
        }
    }

    while(write >= 0){
        arr[write] = 0;
        write--;
    }

    return arr;
}

test('Move zeros to the front', () => {
    const input1 = [1, 0, 2, 0, 3, 4];
    const output1 = moveZerosToFront(input1);
    expect(output1).toEqual([0, 0, 1, 2, 3, 4]);

    const input2 = [0, 0, 0, 1];
    const output2 = moveZerosToFront(input2);
    expect(output2).toEqual([0, 0, 0, 1]);

    const input3 = [0, 1, 2, 3, 0];
    const output3 = moveZerosToFront(input3);
    expect(output3).toEqual([0, 0, 1, 2, 3]);
})