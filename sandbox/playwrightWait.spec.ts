import {test, expect} from '@playwright/test';

test('Tab Sequence', async ({page}) => {

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    let firstname = page.locator('input#input-firstname123');
    await firstname.waitFor({state: 'visible', timeout: 5000});
    await firstname.fill('Hey');

})