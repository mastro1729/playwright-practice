import {test, expect} from '@playwright/test';

test('Get Highest Value', async ({page}) => {

    await page.goto('https://www.cricbuzz.com/live-cricket-scorecard/75651/ind-vs-aus-final-icc-cricket-world-cup-2023');
    // page.context
    
    // Collect all the score strings
    const texts: string[] = 
    await page.locator("//div[contains(@class, 'wb:hidden')]//div[text()='India']/ancestor::div[@id='team-2-innings-1']/following-sibling::div[@id='scard-team-2-innings-1']//div[contains(@class, 'font-bold text-sm')]").allInnerTexts();

    // Convert to numbers & filter out invalid ones
    let scores: number[] = [];
    for(let i=0; i<texts.length-1; i++){
        const text = texts[i].trim().replace(/,/g, '');
        const score = Number(text);
        // const num = Number(texts[score].trim());
        // isNaN(num) returns true if num is Not a Number
        // !isNaN(num) returns true only if num is a valid number.
        if (!isNaN(score))
            scores.push(score);
    }
    console.log(scores);

    // Find the highest value
    let maxScore = Number.MIN_SAFE_INTEGER;
    for(let score=0; score<scores.length; score++){
        if(scores[score] > maxScore){
            maxScore = scores[score];
        }
    }

    console.log("The highest score value is: " + maxScore);

})