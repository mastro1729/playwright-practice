import {test, expect} from '@playwright/test';

import path from "path";
import { fileURLToPath } from "url";
import XLSX from "xlsx"; //[npm install xlsx]

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);   
const excelPath = path.join(__dirname, "../testdata/TestFile.xlsx");

const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const users = XLSX.utils.sheet_to_json(sheet) as UserRegistration[];

interface UserRegistration {
    firstName: string;
    lastName: string;
    phone: string;
    password: string
}

for(let [index, user] of users.entries()){
    test(`Registration Test for ${index+1}`, async ({page}) => {

        let { firstName, lastName, phone, password} = user as any;

        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
        await page.getByRole('textbox', {name: 'First Name'}).fill(firstName);
        await page.getByRole('textbox', {name: 'Last Name'}).fill(lastName);
        await page.getByRole('textbox', {name: 'E-Mail'}).fill(getRandomEmail());
        await page.getByRole('textbox', {name: 'Telephone'}).fill(phone);
        await page.getByRole('textbox', {name: 'Password'}).first().fill(password);
        await page.getByRole('textbox', {name: 'Password Confirm'}).fill(password);
        
        await page.getByRole('radio', {name: 'Yes', checked: false}).click();

        await page.locator('[name="agree"]').click();
        await page.locator('[value="Continue"]').click();

        await expect(page.getByText('Your Account Has Been Created!', {exact: true})).toBeVisible();
})
}

function getRandomEmail(): string {
    let randomValue = Math.random().toString(36).substring(2, 9);
    return `auto_${randomValue}@nal.com`;
}