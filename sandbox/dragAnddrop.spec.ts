import {test, expect, Locator} from '@playwright/test';

test('Drag and Drop', async ({page}) => {

    /* await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    await page.waitForTimeout(3000);

    let source: Locator = page.locator('#column-a');
    let target: Locator = page.locator('#column-b');

    await source.dragTo(target);
    await page.waitForTimeout(5000);
    await expect(target).toHaveText('A'); */

    await page.goto('https://jqueryui.com/resources/demos/droppable/default.html');
    await page.waitForTimeout(3000);

    let source: Locator = page.locator('#draggable');
    let target: Locator = page.locator('#droppable');

    await source.dragTo(target);
    await page.waitForTimeout(5000);
    await expect(target).toHaveText('Dropped!');
})