import { expect, test } from "@playwright/test";

test('Verify student record across paginated table', async ({page}) => {

    await page.goto('https://practice.expandtesting.com/dynamic-pagination-table');
    const tableRows = page.locator("//tbody[@id='demo']/tr");
    const nextButton = page.locator("//a[@data-dt-idx='next']");

    const expectedStudent = {
        name: 'Sophia Anderson',
        gender: 'Female',
        classLevel: 'Senior',
        homeState: 'Arizona',
        major: 'History',
        activity: 'Dance Club'
    };

    let studentFound = false;
    let currentPage = 1;

    while(true){
        await expect(tableRows.first()).toBeVisible();
        const rowCount = await tableRows.count();

        for(let i=0; i<rowCount; i++){
            const row = tableRows.nth(i);
            const studentName = await row.locator('td').nth(0).innerText();
            if(studentName === expectedStudent.name) {
                studentFound = true;
                break;
            }
        }

        if(studentFound) break;

        if(await nextButton.isDisabled()) break;

        await nextButton.click();
        currentPage++;
    }
    expect(studentFound).toBeTruthy();
})