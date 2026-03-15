import { test, expect, Locator } from '@playwright/test';

test('Bounding Box', async ({ page }) => {

    await page.goto('https://petdiseasealerts.org/forecast-map');
    await page.waitForTimeout(3000);

    const frame = page.frameLocator('iframe[id*="map - instance"]');
    let states: Locator[] = await frame.locator('svg #regions > g.region').all();

    for (const e of states) {
        let bounds = await e.boundingBox();
        if (bounds) {
            await page.mouse.move(bounds.x + bounds.width / 2, bounds.x + bounds.height / 2);
            await page.waitForTimeout(300);
            const stateName = await e.getAttribute("id");
            console.log(stateName);
            await page.waitForTimeout(300);
        }

    }
});