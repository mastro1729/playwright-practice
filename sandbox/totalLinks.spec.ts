import { Browser, chromium, Locator, Page, test } from '@playwright/test'

test('Learning Locators', async () => {
    let browser: Browser = await chromium.launch({headless: false, channel: 'chrome'});
    let page: Page = await browser.newPage();
    
    await page.goto('https://www.w3schools.com/');
    let allLinks: string[] = await page.locator('a[href]').allInnerTexts();
    console.log(allLinks.length);

    let allImages: string[] = await page.locator('//img[@alt]').allInnerTexts();
    console.log(allImages.length);
   
});