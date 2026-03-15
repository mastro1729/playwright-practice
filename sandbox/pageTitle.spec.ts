/* import {test, expect} from "@playwright/test";

test('Open Playwright Website & check title', async ( {page} ) => {

    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);
    await page.waitForTimeout(5000);
}); */

import {test, expect} from "@playwright/test";

test('Open Playwright website & check title', async ({page}) => {
    await page.goto("https://playwright.dev/");
    expect(page).toHaveTitle(/Playwright/);
    await page.waitForTimeout(5000);
})