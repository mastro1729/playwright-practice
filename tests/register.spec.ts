import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { RegisterPage } from '../Pages/RegisterPage.js'
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync'; //[npm install csv-parse]

type RegData = {
    firstName: string,
    lastName: string,
    telephone: string,
    password: string,
    subscribeNewsLetter: string
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../testdata/register.csv");

const fileContent = fs.readFileSync(filePath, 'utf-8');
const registerationData: RegData[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
});

for (const user of registerationData) {

    test(`Verify User is able to Register for: ${user.firstName}`, async ({ page, baseURL }) => {
        let loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        const registerPage = await loginPage.naviagatetoRegisterPage();
        let isUserRegistered: boolean = await registerPage.registerUser(
            user.firstName, 
            user.lastName,
            getRandomEmail(),
            user.telephone, 
            user.password, 
            user.subscribeNewsLetter);
        expect(isUserRegistered).toBeTruthy();
    });
}

function getRandomEmail(): string {
    const randomValue = Math.random().toString(36).substring(2, 9);
    return `auto_${randomValue}@mail.com`;
}