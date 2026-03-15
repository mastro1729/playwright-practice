import { expect, test } from "@playwright/test";

function findMissing(nums: number[]): number {
    let actualSum = 0;
    let n = nums.length;
    let expectedSum = n * (n + 1) / 2;
    //let actualSum = nums.reduce((sum, num) => sum + num, 0);
    for (const num of nums) {
        actualSum = actualSum + num;
    }
    return expectedSum - actualSum;
}


test('Find Missing', () => {
    const missing = findMissing([3, 0, 1]);
    console.log(missing);
})