import { test, expect } from '@playwright/test';

import path from "path";
import { fileURLToPath } from "url";
import XLSX from "xlsx"; //[npm install xlsx]

interface LoginTestData {
    username: string,
    password: string,
    expectedResult: string
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getLoginCreds(xlsxFileName: string): LoginTestData[] {
    const absolutePath = path.join(__dirname, "../testdata", xlsxFileName);
    const workbook = XLSX.readFile(absolutePath);
    const sheet = workbook.Sheets["Register"];
    const users = XLSX.utils.sheet_to_json<LoginTestData>(sheet);
    return users;
}

const records = getLoginCreds("Login.xlsx");
for (const record of records) {
    test(`Login Test for ${record.username}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.locator("#user-name").fill(record.username);
        await page.locator("#password").fill(record.password);
        await page.click("#login-button");
        await page.waitForTimeout(1500);
        if (record.expectedResult === 'success') {
            await expect(page).toHaveURL(/inventory/);
        } else {
            const selector = page.locator("[data-test='error']");
            await expect(selector).toBeVisible();
        }
    });
}