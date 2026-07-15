import {test, expect, Locator} from '@playwright/test';

test('Verify highest stock price', async ({page}) => {

    // Navigate to the Yahoo Finance Most Active Stocks page.
    await page.goto('https://finance.yahoo.com/markets/stocks/most-active/',
                    {
                        timeout: 60_000,
                        waitUntil: 'domcontentloaded'
                    }
    );
    
    // Locate all stock price elements from the Price column.
    // const priceLocator = page.locator("//tbody/tr/td//fin-streamer[@data-field='regularMarketPrice']");
    const priceLocator = page.locator("//tbody/tr/td[4]");

    // Ensure at least one price is visible before proceeding
    expect(priceLocator.first()).toBeVisible();
    
    // Retrieve all matching price locators.
    const prices = await priceLocator.all();

    // Initialize with the smallest safe integer so any valid price becomes the highest initially.
    let highestPrice = Number.MIN_SAFE_INTEGER;

    // Iterate through each stock price.
    for(const price of prices){

        // Read the displayed price text.
        let priceInText: string = await price.innerText();

        // Remove non-numeric characters and convert te value to a number.
        const priceValue = Number(priceInText.replace(/[^\d.]/g, ''));

        // Update the highest price only if the current value is valid and
        // greater than the previously recorded highest price.
        if(!isNaN(priceValue) && priceValue > highestPrice){
            highestPrice = priceValue;
        }
    }

    // Log the highest stock price for debugging/reference
    console.log(`Highest price is: ${highestPrice}`);

    // Verify that a valid highest price was found.
    expect(highestPrice).toBeGreaterThan(0);
})