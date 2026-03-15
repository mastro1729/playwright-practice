import {test, expect} from '@playwright/test';

test('Tab Sequence', async ({page}) => {

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    await page.locator('input#input-firstname').focus();
    await page.locator('input#input-firstname').pressSequentially('Automation', {delay: 300});
    await page.keyboard.press('Tab');

    await page.keyboard.type('Testing', {delay: 300});
    await page.keyboard.press('Tab');

    await page.keyboard.type(getRandomEmail(), {delay: 300});
    await page.keyboard.press('Tab');

    await page.keyboard.type('9019495973', {delay: 300});
    await page.keyboard.press('Tab');

    await page.keyboard.type('Pass123!', {delay: 300});
    await page.keyboard.press('Tab');

    await page.keyboard.type('Pass123!', {delay: 300});
    await page.keyboard.press('Tab');

    await page.keyboard.press('Tab');

    await page.keyboard.press('Tab');

    await page.keyboard.press('Space');

    await page.keyboard.press('Enter');
    
    await page.waitForTimeout(3000);
})

function getRandomEmail(): string {
    return 'mailme' + Date.now() + '@mail.com';
}