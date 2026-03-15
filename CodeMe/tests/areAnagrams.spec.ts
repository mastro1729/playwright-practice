import { expect, test } from "@playwright/test";

function areAnagrams(str1: string, str2: string): boolean {
    // Length check
    if (str1.length !== str2.length) {
        return false;
    }
    // Frequency array of size 256
    const count = new Array(256).fill(0);
    // We use char.charAt(0) 
    // Because the character is at index 0.
    for (let i = 0; i < str1.length; i++) {
        count[str1[i].charCodeAt(0)]++;
        count[str2[i].charCodeAt(0)]--;
    }

    for (let freq of count) {
        if(freq !== 0) 
            return false;
    }
    return true;
}

test('Anagram check', () => {
    const input1 = "listen";
    const input11 = "silent";
    const output111 = areAnagrams(input1, input11);
    expect(output111).toBe(true);

    const input2 = "hello";
    const input22 = "bello";
    const output222 = areAnagrams(input2, input22);
    expect(output222).toBe(false);

    const input3 = "";
    const input33 = "";
    const output333 = areAnagrams(input3, input33);
    expect(output333).toBe(true);
})