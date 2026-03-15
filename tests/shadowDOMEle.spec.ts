import { test, expect } from '@playwright/test';

test('Shadow DOM Element', async ({ page }) => {
    await page.goto('https://selectorshub.com/iframe-in-shadow-dom/');
    await page.locator('#pizza').fill('Hello!');
    await page.waitForTimeout(3000);
})

test('Shadow DOM Elements', async ({ page }) => {
    await page.goto('https://selectorshub.com/iframe-in-shadow-dom/');
    // await page.locator('#app2').first().locator(":shadow #pizza").fill('Hello');
    //await page.locator('#pizza').fill('Hello!');
    await page.locator('#app2 >> #pizza').fill('Hello!');
    await page.waitForTimeout(3000);
})

test('Shadow DOM Element in frame', async ({ page }) => {
    await page.goto('https://selectorshub.com/shadow-dom-in-iframe');
    await page.frameLocator('#pact').locator('#tea').fill('Hello!');
    await page.waitForTimeout(3000);
})

test('Shadow DOM in Chrome Downloads', async ({ page }) => {
    await page.goto('chrome://downloads');
    await page.locator('downloads-manager')
              .locator(':shadow downloads-toolbar')
              .locator(':shadow cr-toolbar')
              .locator(':shadow #clearAll')
              .click();
    await page.waitForTimeout(3000);
});

test('Shadow DOM', async ({ page }) => {
    await page.goto('https://books-pwakit.appspot.com/');
    const searchBox = page
                           .locator('input#input');
    
   // console.log(await page.innerHTML());
    console.log("visible:" , await searchBox.isVisible());
    console.log("enabled:", await searchBox.isEnabled());
    console.log("box:", await searchBox.boundingBox());
    
    await searchBox.fill('Harry Potter');
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/.*cart/);
});

test('Shadow DOM Play', async ({ page }) => {
    await page.goto('https://material-web.dev/components/button/');
    // const searchBox = page.locator('md-filled-button button#button').nth(2);
    const searchBox = page.getByRole("button", {name: "Filled"}).nth(1);
    
   // console.log(await page.innerHTML());
    console.log("visible:" , await searchBox.isVisible());
    console.log("enabled:", await searchBox.isEnabled());
    console.log("box:", await searchBox.boundingBox());
    
    await searchBox.click();
    await page.waitForTimeout(3000);
    //await expect(page).toHaveURL(/.*cart/);
});