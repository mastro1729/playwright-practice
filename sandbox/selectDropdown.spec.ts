import {test, expect, Locator} from '@playwright/test';

test('', async ({page}) => {
    await page.goto('https://practice.expandtesting.com/dropdown');
    let simple: Locator = page.locator(`select#dropdown`);
    let country: Locator = page.locator(`select#country`);

    // Select By Value Attribute
    await simple.selectOption('1');
    await country.selectOption('IN');
    await page.waitForTimeout(5000);

    // Select By Visible Text
    await simple.selectOption({label: 'Option 2'});
    await country.selectOption({label: 'Afghanistan'});
    await page.waitForTimeout(5000);

})