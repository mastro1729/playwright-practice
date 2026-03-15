import {test, expect} from '@playwright/test';

test('Context Click', async ({page}) => {

    await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');
    await page.locator(`//span[text()='right click me']`).click({button: 'right'});
    await page.waitForTimeout(3000);

    let contextMenu: string[] = await page.locator(`ul.context-menu-list span`).allInnerTexts();
    console.log(contextMenu);
    await page.getByText('Edit', {exact: true}).click();
    await page.waitForTimeout(3000);
})