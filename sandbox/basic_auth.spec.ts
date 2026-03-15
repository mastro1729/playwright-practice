import {test, expect} from '@playwright/test';

test('Basic Authentication - Hardcoded URL', async ({page}) => {

    await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');
    await page.waitForTimeout(3000);
    await expect(page.locator('p')).toHaveText('Congratulations! You must have the proper credentials.');
   
})

test('Basic Authentication - Template Literals', async ({page}) => {

    let username: string = 'admin';
    let password: string = 'admin';

    // If string has ${variable}, use backticks, not quotes when you want to put variables inside a string.
    await page.goto(`https://${username}:${password}@the-internet.herokuapp.com/basic_auth`);
    await page.waitForTimeout(3000);
     await expect(page.locator('p')).toHaveText('Congratulations! You must have the proper credentials.');
   
})

test('Basic Authentication - Browser Context', async ({browser}) => {

    // Create isolated browser context with credentials
    // In Playwright, a browser context is an independent browser profile inside the same browser.
    // HTTPCredentials is a predefined property in Playwright - part of the BrowserContextOptions object.
    // It lets you specify a username & password for HTTP Basic Authentication.'
    // Playwright then automatically adds the Authorization header in every request for you.
    const context = await browser.newContext({
        httpCredentials: {
             username: 'admin',
             password: 'admin'
        }
    });

    const page = await context.newPage();
    await page.goto(`https://the-internet.herokuapp.com/basic_auth`);
    await page.waitForTimeout(3000);
    await expect(page.locator('p')).toHaveText('Congratulations! You must have the proper credentials.');
    await context.close();
})