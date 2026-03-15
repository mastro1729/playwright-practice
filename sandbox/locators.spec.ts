import { Browser, chromium, Page, test } from '@playwright/test'

test('Learning Locators', async () => {
    let browser: Browser = await chromium.launch({headless: false, channel: 'chrome'});
    let page: Page = await browser.newPage();
    /* await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    
    // Find the element using locator and then perform the action
    // id --> css selector --> #value of id attribute 
    // If id is not available --> htmltag[attribute='value']
    await page.locator('#input-email').fill('march2024@open.com');
    await page.locator('#input-password').fill('Selenium@12345');
    await page.locator(`input[value='Login']`).click();
    await page.waitForTimeout(5000); */

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    await page.getByPlaceholder('First Name').fill('Peter');
   // await page.locator('#input-firstname').highlight();
    await page.getByPlaceholder('Last Name').pressSequentially('Samprass', {delay: 500});
    await page.getByPlaceholder('E-Mail').fill('abc@test.com');
    await page.getByPlaceholder('Telephone').fill('9019495973');
     await page.getByAltText('naveenopencart').click();
     await page.waitForTimeout(5000);
    //page.getByRole('')
});