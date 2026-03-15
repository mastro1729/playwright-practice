import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";

interface LoginTestData {
    username: string,
    password: string,
    expectedResult: string
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getLoginCreds(jsonFileName: string): LoginTestData[] {
    const filePath = path.join(__dirname, "../testdata", jsonFileName);
    const records = fs.readFileSync(filePath, "utf8");
    const users: LoginTestData[] = JSON.parse(records);
    return users;
}

const records = getLoginCreds("Login.json");
console.log('Records:', records);
for (let record of records) {
    test(`Login Test for ${record.username}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60_000
            }
        );
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