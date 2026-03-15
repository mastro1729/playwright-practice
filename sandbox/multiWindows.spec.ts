import {test, expect, Page} from '@playwright/test';

test('Multiple Window Tabs', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

     page.on('framenavigated', async () => {
        let acceptCookies = page.locator('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
        if(await acceptCookies.isVisible()) {
            await acceptCookies.click();
        }
    });

    await page.goto('https://www.orangehrm.com/en/contact-sales');
    let orangeHrmTitle = await page.title();

    await page.locator(`//a[contains(@href, 'linkedin')]`).click();
    await page.locator(`//a[contains(@href, 'facebook')]`).click();
    await page.locator(`//a[contains(@href, 'youtube')]`).click();

    await page.waitForTimeout(3000);

    let allPages: Page[] = context.pages();
    console.log(allPages.length);
    
    for(let pg of allPages){
        console.log(await pg.title());
        if(await pg.title() !== orangeHrmTitle){
            await pg.close();
        }
    }
    await page.bringToFront();
    console.log(await page.title());
    await page.getByRole('textbox', {name: 'Full Name'}).fill('Hello');
    await page.waitForTimeout(3000);
})