import {test, expect} from '@playwright/test';

test('Click the "Get started" link', async ({page}) => {
    await page.goto("https://playwright.dev/");
    page.getByRole("link", {name: "Get started"}).click();
    await expect(page).toHaveURL(/.*docs/);
    await page.waitForTimeout(5000);

})