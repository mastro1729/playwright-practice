import { expect, test } from "@playwright/test";

test('Verify student record across paginated table', async ({page}) => {

    await page.goto('https://selectorshub.com/xpath-practice-page/');
    const targetRow = page.locator("//td[text()='Hong Kong']/preceding-sibling::td/input[@type='checkbox']");
    const nextButton = page.locator("//button[@aria-label='Next']");
    let targetFound = false;
    let currentPage = 1;
    
    while(true){
        const checkboxes = await targetRow.all();

        for(const checkbox of checkboxes){
            if(! (await checkbox.isChecked())) {
                await checkbox.check();
                targetFound = true;
                await page.waitForTimeout(300);
                break;
            }
        }

        if(targetFound) break;
        if(await nextButton.isDisabled()) break;

        await nextButton.click();
        currentPage++;
        await page.waitForTimeout(300);
    }
    expect(targetFound).toBeTruthy();
    expect(currentPage).toBe(1);
})