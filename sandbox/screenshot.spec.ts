import {test, expect, Locator} from '@playwright/test';

test('Screenshot', async ({page}) => {
    await page.goto('https://www.orangehrm.com/en/contact-sales');
    await page.locator('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
    
    await page.screenshot({path: 'one.png'});
    await page.screenshot({path: 'fullpage.png', fullPage: true});
    await page.screenshot({path: './screenshots/mypic.png'});
    let logoEle: Locator = page.getByAltText('OrangeHRM Logo').first();
    await logoEle.screenshot({path: './screenshots/logoElement.png'});

    let formEle: Locator = page.locator('form#Form_getForm')
    await formEle.screenshot({path: './screenshots/formElement.png'});
})