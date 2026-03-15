import {test, expect} from '@playwright/test';

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { parse } from 'csv-parse/sync'; //[npm install csv-parse]

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);   
const absolutePath = path.join(__dirname, "../testdata/register.csv");

type RegData = {
    firstName: string,
    lastName: string,
    email: string,
    telephone: string,
    password: string,
    subscribeNewsletter: string
}

let fileContent = fs.readFileSync(absolutePath, 'utf-8');
const rows = parse(fileContent);

let regdata: RegData[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
});

for(let user of regdata){
    test(`Registration Test for ${user.firstName}`, async ({page}) => {
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
        await page.getByRole('textbox', {name: 'First Name'}).fill(user.firstName);
        await page.getByRole('textbox', {name: 'Last Name'}).fill(user.lastName);
        await page.getByRole('textbox', {name: 'E-Mail'}).fill(getRandomEmail());
        await page.getByRole('textbox', {name: 'Telephone'}).fill(user.telephone);
        await page.getByRole('textbox', {name: 'Password'}).first().fill(user.password);
        await page.getByRole('textbox', {name: 'Password Confirm'}).fill(user.password);
        
        
        if(user.subscribeNewsletter === "Yes") {
            await page.getByRole('radio', {name: 'Yes', checked: false}).click();
        }
        else {
            await page.getByRole('radio', {name: 'No', checked: true}).click();
        }

        await page.locator('[name="agree"]').click();
        await page.locator('[value="Continue"]').click();

        await expect(page.getByText('Your Account Has Been Created!', {exact: true})).toBeVisible();

        //expect(page.getByText()).toBeVisible();
        
})
}

function getRandomEmail(): string {
    let randomValue = Math.random().toString(36).substring(2, 9);
    return `auto_${randomValue}@nal.com`;
}