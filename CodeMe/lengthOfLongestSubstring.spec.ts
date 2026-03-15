import {expect, test} from '@playwright/test';

function lengthOfLongestSubstring(str: string): number{
    let right = 0;
    let left = 0;
    let maxLength = 0;
    let startIndex = 0;
    const set = new Set<string>();
    for(right=0; right<str.length; right++){
        while(set.has(str[right])){
            set.delete(str[left]);
            left++;
        }
        set.add(str[right]);
        console.log(set);
        maxLength = Math.max(maxLength, right-left+1);
    }
    return maxLength;
}

test('Length of longest substring', ()=> {
    const result = lengthOfLongestSubstring("abcab");
    console.log(result);
})