import { expect, test } from "@playwright/test";

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

test('Move zeros to Back', () => {
    const input1 = [1, 0, 2, 0, 3, 4];
    const output1 = moveZerosToBack(input1);
    expect(output1).toEqual([1, 2, 3, 4, 0, 0]);

    const input2 = [0, 0, 0, 1];
    const output2 = moveZerosToBack(input2);
    expect(output2).toEqual([1, 0, 0, 0]);

    const input3 = [0, 1, 2, 3, 0];
    const output3 = moveZerosToBack(input3);
    expect(output3).toEqual([1, 2, 3, 0, 0]);
})