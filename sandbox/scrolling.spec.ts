import {test, expect} from '@playwright/test';

test('Scrolling', async ({page}) => {

    await page.goto('https://www.orangehrm.com/en/contact-sales');
    

    // ScrollIntoView
    /* await page.locator('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
    await page.locator(`footer li a`, {hasText: 'Careers'}).scrollIntoViewIfNeeded();
    await page.locator(`footer li a`, {hasText: 'Careers'}).click(); */

    // Scroll down 1000 pixels
    await page.locator('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(3000);
    await page.evaluate(() => window.scrollBy(0, 2000));
    await page.waitForTimeout(3000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(3000);
    await page.evaluate(() => window.scrollTo(document.body.scrollHeight, 0));
    await page.waitForTimeout(3000);
})