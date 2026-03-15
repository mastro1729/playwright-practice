import { test, expect, Locator } from '@playwright/test';

test('Bounding Box', async ({ page }) => {

    await page.goto('https://petdiseasealerts.org/forecast-map', { waitUntil: 'load' });
    await page.waitForTimeout(3000);

    const frame = page.frameLocator('iframe[id*="map-instance"]');
    let states: Locator[] = await frame.locator('svg #regions > g.region').all();
    console.log(states.length);

    for (const e of states) {
        let bounds = await e.boundingBox();
        if (bounds) {
            await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
            const stateName = await e.getAttribute("id");
            console.log(stateName);
            await page.waitForTimeout(200);
        }


    }
});