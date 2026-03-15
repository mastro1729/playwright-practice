import {test, expect} from '@playwright/test';

test('New Window Tab', async ({page}) => {

    page.on('framenavigated', async () => {
        let acceptCookies = page.locator('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
        if(await acceptCookies.isVisible()) {
            await acceptCookies.click();
        }
    });
    
    await page.goto('https://www.orangehrm.com/en/contact-sales');
    // await page.locator('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();

    let [newTab] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator(`//a[contains(@href, 'linkedin')]`).click()
    ]);

    await page.waitForTimeout(5000);
    console.log(await newTab.title());
    console.log(newTab.url());

    await newTab.close();
    await page.waitForTimeout(5000);

    await page.bringToFront();
    console.log(await page.title());

})