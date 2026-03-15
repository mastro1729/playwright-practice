import { expect, test } from "@playwright/test";

function reverseWords(str: string): string {
    // JavaScript syntax for regular expressions uses / to define a regex literal.
    const words: string[] = str.split(/\s+/);
    const result: string[] = [];
    for(const word of words) {
        let reversed = "";
        for(let i=word.length-1; i>=0; i--){
            reversed = reversed + word[i];
        }
        result.push(reversed);
    }
    return result.join(" ");
}

test('Reverse each word in the sentence', () => {
    const input1 = "Hello World";
    const result1 = reverseWords(input1);

    const input2 = "a b c";
    const result2 = reverseWords(input2);
    expect(result1).toBe("olleH dlroW");
    expect(result2).toBe("a b c");
})