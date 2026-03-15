import {test, expect} from '@playwright/test';

let inputArray = [
        {username: 'pwtest@nal.com', password: 'test123'},
        {username: 'pwapp@nal.com', password: 'test123'}
    ];

for(let input of inputArray) {
        test(`Data Provider ${input.username} and ${input.password}`, async ({page}) => {
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
        await page.getByRole('textbox', {name: 'E-Mail Address'}).fill(input.username);
        await page.getByRole('textbox', {name: 'Password'}).fill(input.password);
        await page.getByRole('button', {name: 'Login'}).click();

        await expect(page).toHaveTitle('My Account');
    });
}