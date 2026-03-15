import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker'; // [npm install @faker-js/faker] [npm install xlsx]

    test('Registration Test', async ({page}) => {

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({firstName: 'Auto'});
        const telephone = faker.phone.number({ style: 'national' });
        const password = faker.internet.password({ length: 20, memorable: true, pattern: /[A-Z]/, prefix: 'Auto ' });

        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
        await page.getByRole('textbox', {name: 'First Name'}).fill(firstName);
        await page.getByRole('textbox', {name: 'Last Name'}).fill(lastName);
        await page.getByRole('textbox', {name: 'E-Mail'}).fill(email);
        await page.getByRole('textbox', {name: 'Telephone'}).fill(telephone);
        await page.getByRole('textbox', {name: 'Password'}).first().fill(password);
        await page.getByRole('textbox', {name: 'Password Confirm'}).fill(password);
        
        await page.getByRole('radio', {name: 'Yes', checked: false}).click();

        await page.locator('[name="agree"]').click();
        await page.locator('[value="Continue"]').click();

        await expect(page.getByText('Your Account Has Been Created!', {exact: true})).toBeVisible();

        //expect(page.getByText()).toBeVisible();
        
})

function getRandomEmail(): string {
    let randomValue = Math.random().toString(36).substring(2, 9);
    return `auto_${randomValue}@nal.com`;
}