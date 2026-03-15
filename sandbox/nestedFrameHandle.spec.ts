import {test, expect, FrameLocator} from "@playwright/test";

test('Nested Frame Handle', async ({page}) => {
    await page.goto('https://selectorshub.com/iframe-scenario');

    const frame1: FrameLocator = page.frameLocator(`iframe#pact1[class='entered lazyloaded']`);
    const frame2: FrameLocator = frame1.frameLocator(`#pact2`);
    const frame3: FrameLocator = frame2.frameLocator(`#pact3`);

    await frame1.getByTitle('Enter your first crush name').fill('Testing');
    await frame2.getByPlaceholder('Current Crush Name').fill('Selenium');
    await frame3.getByPlaceholder('Destiny').fill('Playwright');
    await page.waitForTimeout(5000);

    await frame1.locator('#inp_val').fill('Manual Testing');
    await frame2.locator('#jex').fill('Selenium with Java');
    await frame3.locator('#glaf').fill('Playwright with JS/TS');
    await page.waitForTimeout(5000);
});