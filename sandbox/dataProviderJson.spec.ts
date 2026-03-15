import {test, expect} from '@playwright/test';

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("CWD:", process.cwd());
console.log("DIRNAME:", __dirname);

const absolutePath = path.join(__dirname, "testdata/register.json");
console.log("TRYING Path:", absolutePath);

console.log("File Exists?", fs.existsSync(absolutePath));

/* type RegData = {
    firstName: string,
    lastName: string,
    email: string,
    telephone: string,
    password: string,
    subscribeNewsletter: string
}

let regdata:RegData[] = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));

for(let user of regdata){
    test(`Registration Test for ${user.firstName}`, async ({page}) => {
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
        await page.getByRole('textbox', {name: 'E-Mail Address'}).fill(user.firstName);
        await page.getByRole('textbox', {name: 'E-Mail Address'}).fill(user.lastName);
        await page.getByRole('textbox', {name: 'E-Mail Address'}).fill(user.email);
        await page.getByRole('textbox', {name: 'E-Mail Address'}).fill(user.telephone);
        await page.getByRole('textbox', {name: 'E-Mail Address'}).fill(user.password);
        await page.getByRole('textbox', {name: 'E-Mail Address'}).fill(user.password);
        
        
        if(user.subscribeNewsletter === "Yes") {
            await page.getByRole('textbox', {name: 'E-Mail Address'}).fill(user.subscribeNewsletter);
        }
        else {
            await page.getByRole('textbox', {name: 'E-Mail Address'}).fill(user.subscribeNewsletter);
        }

        await page.getByRole('textbox', {name: 'Password'}).fill(user.password);
        await page.getByRole('button', {name: 'Login'}).click();

        //expect(page.getByText()).toBeVisible();
        
})
} */

// console.log("CWD:", process.cwd()); */