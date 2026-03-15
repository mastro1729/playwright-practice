import {test, expect, Page} from '@playwright/test'

test('Web Table Handling', async({page}) => {
    await page.goto('https://naveenautomationlabs.com/opencart/ui/webtable.html');
    /* await page.locator(`//td[text()='Joe.Root']/preceding-sibling::td/input[@type='checkbox']`).check();
    await page.locator(`//td[text()='John.Smith']/preceding-sibling::td/input[@type='checkbox']`).check();
    await page.waitForTimeout(3000); */
    selectUser(page, 'Joe.Root');
    selectUserWithCSS(page, 'Emily.Davis');
    //await page.locator(`tr:has(td:text('Emily.Davis'))`).locator(`td`).first().click();
    await page.waitForTimeout(5000);
})

async function selectUser(page: Page, username: string): Promise<void> {
    const checkbox = page.locator(`//td[text()='${username}']/preceding-sibling::td/input[@type='checkbox']`);
    await checkbox.click();
}

async function selectUserWithCSS(page: Page, username: string): Promise<void> {
    const checkBox = page.locator(`tr:has(td:text('${username}'))`).locator(`td`).first();
    await checkBox.click();
}

