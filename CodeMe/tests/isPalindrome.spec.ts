import { expect, test } from "@playwright/test";

function isPalindrome(str: string): boolean {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}


test('Palindrome check', () => {
    const input1 = "racecar";
    const output1 = isPalindrome(input1);
    expect(output1).toBe(true);

    const input2 = "madam!";
    const output2 = isPalindrome(input2);
    expect(output2).toBe(false);

    const input3 = "a";
    const output3 = isPalindrome(input3);
    expect(output3).toBe(true);
})