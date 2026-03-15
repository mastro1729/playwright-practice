import { expect, Page, test } from "@playwright/test";

test('Multi-Window Handling', async({page}) => {
    // Get BrowserContext
    const context = page.context();

    page.on('framenavigated', async () => {
        let acceptCookies = page.locator('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
        if(await acceptCookies.isVisible()) {
            await acceptCookies.click();
        }
    });

    // Navigate to the application
    await page.goto('https://www.orangehrm.com/en/contact-sales');

    //Register Page Event Listener
     await Promise.all([
        context.waitForEvent('page'),
        page.locator(`//a[contains(@href, 'youtube')]`).click()
    ]);

    await Promise.all([
        context.waitForEvent('page'),
        page.locator(`//a[contains(@href, 'linkedin')]`).click()
    ]);

    await Promise.all([
        context.waitForEvent('page'),
        page.locator(`//a[contains(@href, 'facebook')]`).click()
    ]);

    const allPages: Page[] = context.pages();
    const originalTitle = await page.title();
    let targetPage: Page;

    for(const pg of allPages) {
        const title = await pg.title();
        if(pg.url().includes('www.youtube.com/user/orangehrm')) {
            targetPage = pg;
            break;
        }
    }
    await targetPage!.bringToFront();
    await targetPage!.waitForLoadState('domcontentloaded');
    await targetPage!.getByPlaceholder('Search').fill('Hello!');
    const options = targetPage!.locator(`div#i0 span[role='button']`)
    await options.first().waitFor({state: 'visible'});
    const allOptions: string[] = await options.allInnerTexts();
    console.log(allOptions);
    const target = options.filter({hasText: 'hello kaun papa ghar per nahin hai'});
    const text = await target.click();
    console.log(allOptions);
    //const target = all.filter()
    await targetPage!.waitForTimeout(3000);

})