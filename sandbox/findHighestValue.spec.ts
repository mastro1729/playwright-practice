import {test, expect, Locator} from '@playwright/test';

test('Get Highest Value', async ({page}) => {

    await page.goto('https://finance.yahoo.com/markets/stocks/most-active/',
                    {
                        timeout: 60_000,
                        waitUntil: 'domcontentloaded'
                    }
    );
    
    const priceLocator = page.locator("//tbody/tr/td//fin-streamer[@data-field='regularMarketPrice']");

    expect(priceLocator.first()).toBeVisible();
    
    const prices = await priceLocator.all();

    let maxValue = Number.MIN_SAFE_INTEGER;

    for(const price of prices){
        let priceInText: string = await price.innerText();
        const priceInNum = Number(priceInText.replace(/,/g, ''));

        if(!isNaN(priceInNum) && priceInNum > maxValue){
            maxValue = priceInNum;
        }
    }
    console.log("Highest price value is: " + maxValue);
})