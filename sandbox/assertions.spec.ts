import {test, expect} from '@playwright/test';

test('Hard Assertions', async ({page}) => {

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    let header = page.getByRole('heading', {name: 'Returning Customer'});
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Returning Customer');
    await expect(header).toContainText('Returning');

    let email = page.locator(`input#input-email`);
    await expect(email).toHaveAttribute('id', 'input-email');

    await expect(email).toHaveCSS('height', '34px');

    let footerLinks = page.locator(`//footer//a`);
    await expect(footerLinks).toHaveCount(16);
})

test('Sort Assertions', async ({page}) => {

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    let header = page.getByRole('heading', {name: 'Returning Customer'});
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Returning Customer');
    // await expect.soft(header).toContainText('Returningg');
    // await expect(header).toContainText('Returningg');

    console.log('done!')
})

test('Not Assertions', async ({page}) => {

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    
    await expect(page.locator('#error')).not.toBeVisible();
})

test('Screenshot Assertions', async ({page}) => {

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    
    let header = page.getByRole('heading', {name: 'Returning Customer'});
    await expect(header).toHaveScreenshot('header.png');
})

test('Generic Assertions', async ({page}) => {

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    
    await expect(page).toHaveTitle('Account Login');
    await expect(page).toHaveURL(/.*account\/login.*/);
})

test('Is Element Assertions', async ({page}) => {

    await page.goto('https://classic.freecrm.com/register/');
    
    await expect(page).toHaveTitle('Account Login');
    await expect(page).toHaveURL(/.*account\/login.*/);
})