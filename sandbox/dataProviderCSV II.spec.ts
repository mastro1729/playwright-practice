import { test, expect } from '@playwright/test';

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { parse } from 'csv-parse/sync'; //[npm install csv-parse]

interface LoginTestData {
    username: string,
    password: string,
    expectedResult: string
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getLoginCreds(csvFileName: string): LoginTestData[] {
    const absolutePath = path.join(__dirname, "../testdata", csvFileName);
    let fileContent = fs.readFileSync(absolutePath, 'utf-8');

    let records: LoginTestData[] = parse(fileContent, {
        delimiter: ',',
        columns: true,
        skip_empty_lines: true,
        trim: true
    });
    return records;
}

const records = getLoginCreds("login.csv");
for (let record of records) {
    test(`Login Test for ${record.username}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.locator("#user-name").fill(record.username);
        await page.locator("#password").fill(record.password);
        await page.click("#login-button");
        await page.waitForTimeout(1500);
        if(record.expectedResult === 'success') {
            await expect(page).toHaveURL(/inventory/);
        } else {
            const selector = page.locator("[data-test='error']");
            await expect(selector).toBeVisible();
        }
    });
}