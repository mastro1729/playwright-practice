import { Browser, chromium, expect, Locator, Page, test } from '@playwright/test'

test('Learning Locators', async () => {
    let browser: Browser = await chromium.launch({headless: false, channel: 'chrome'});
    let page: Page = await browser.newPage();
    
   /*  await page.goto('https://www.w3schools.com/');
    let footersEle: Locator = page.locator('div#footerwrapper a');
    await footersEle.filter({hasText: 'JavaScript Certificate', visible:true}).click();
    await page.waitForTimeout(5000); */

   /*  await page.goto('https://www.w3schools.com/');
    await page.getByRole('textbox', {name: 'Search field'}).fill('Certificate');
    await page.locator(`div#tnb-search-suggestions a`).filter({hasText:'JavaScript Certificate'}).click();
    //await footersEle.filter({hasText: 'JavaScript Certificate', visible:true}).click();
    await page.waitForTimeout(5000); */

    await page.goto('https://www.w3schools.com/html/html_tables.asp');
    const target = page.locator('table#customers tr').filter({hasText: 'Helen Bennett'});
    const text = await target.locator('td').nth(1).textContent();
    expect(text).toContain('Helen Bennett');
    await page.waitForTimeout(3000);
});