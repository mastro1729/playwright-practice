import {test, expect, Page} from '@playwright/test';

test('DropDown Handle', async ({page}) => {
    await page.goto('https://naveenautomationlabs.com/opencart/ui/dropdowns.html');
    
    /* await page.locator(`//div[@class='select-trigger']/span[text()='Choose your preferred programming language']`).click();
    await page.getByText('Java', {exact: true}).click();
    await page.waitForTimeout(3000);

    await page.locator(`//div[@class='select-trigger']/span[text()='Choose your preferred web framework']`).click();
    await page.getByText('Angular', {exact: true}).click();
    await page.waitForTimeout(3000);

    await page.locator(`//div[@class='select-trigger']/span[text()='Select your experience level']`).click();
    await page.getByText('Mid-level (4-6 years)', {exact: true}).click();
    await page.waitForTimeout(3000); */

    await selectTheValue(page, 'Choose your preferred programming language', 'Java');
    await selectTheValue(page, 'Choose your preferred web framework', 'Angular');
    await selectTheValue(page, 'Select your experience level', 'Mid-level (4-6 years)');
     await page.waitForTimeout(5000);


})

async function selectTheValue(page: Page, dropDownLabel: string, value: string): Promise<void> {
    await page.locator(`//div[@class='select-trigger']/span[text()='${dropDownLabel}']`).click();
    await page.getByText(`${value}`, {exact: true}).click();
}