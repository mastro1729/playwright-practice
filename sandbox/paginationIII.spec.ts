import { expect, test } from "@playwright/test";

test('Verify student record across paginated table', async ({page}) => {

    await page.goto('https://selectorshub.com/xpath-practice-page/');
    const targetRows = page.locator("//td[text()='India']/preceding-sibling::td/input[@type='checkbox']");
    const nextButton = page.locator("//button[@aria-label='Next']");
    let currentPage = 1;
    let totalChecked = 0;
    
    while(true){
        const checkboxes = await targetRows.all();
        const rowCount = await targetRows.count();

        for(const checkbox of checkboxes){
            if(! (await checkbox.isChecked())) {
                await checkbox.check();
                totalChecked++;
            }
        }

        if(await nextButton.isDisabled()) break;

        await nextButton.click();
        currentPage++;
        await page.waitForTimeout(300);
    }
    expect(totalChecked).toBe(83);
})