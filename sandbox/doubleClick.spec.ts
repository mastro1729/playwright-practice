import {test, expect, FrameLocator} from '@playwright/test';

test('Double Click', async ({page}) => {

    await page.goto('https://api.jquery.com/dblclick');

    let frame = page.frameLocator('iframe');
    let target = frame.locator('div');
    await target.dblclick();
    await page.waitForTimeout(5000);
     await target.click({clickCount: 2});
     await page.waitForTimeout(5000);
})
