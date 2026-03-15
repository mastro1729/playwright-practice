import {test, expect, chromium} from "@playwright/test"

test('Multiple browser contexts with multiple pages', async () => {
    const browser = await chromium.launch({headless: false});

    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    const page2 = await context1.newPage();

    await page1.goto('https://playwright.dev');
    await expect(page1).toHaveTitle(/Playwright/);
    await page2.goto('https://www.w3schools.com/');
    await expect(page2).toHaveTitle(/Online Web Tutorials/);
    await context1.close();

    const context2 = await browser.newContext();
    const page3 = await context2.newPage();
    await page3.goto('https://www.github.com/');
    await expect(page3).toHaveTitle(/GitHub/);
    await context2.close();
})