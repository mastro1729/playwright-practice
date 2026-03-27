import { test, expect } from '@playwright/test';

test('Calendar Handling I', async ({ page }) => {

  await page.goto('https://seleniumpractise.blogspot.com/2016/08/how-to-handle-calendar-in-selenium.html');
  await page.locator(`input#datepicker`).click();
  
  const expectedMonthYear = 'January 2030';
  const expectedDay = '1';
  const expectedMonth = '01';
  const expectedYear = '2030';
  const maxIterations = 60;
  let dateSelected = false;
  for (let i = 0; i < maxIterations; i++) {
    const rawText = await page.locator(`div.ui-datepicker-title`).textContent();
    if (!rawText) {
      throw new Error('Calendar title not found');
    }
    const currentMonthYear = rawText.replace(/\s+/g, ' ');
    //const currentMonthYear = rawText;
    console.log(currentMonthYear);
    if (currentMonthYear === expectedMonthYear) {
      await page.getByText(expectedDay, { exact: true }).click();
      await page.waitForTimeout(800);
      dateSelected = true;
      break;
    }
    await page.locator(`span:has-text('Next')`).click();
  }
  expect(dateSelected).toBeTruthy();
  const formattedDay = String(expectedDay).padStart(2, '0');
  const expectedInputValue = `${expectedMonth}/${formattedDay}/${expectedYear}`;
  await expect(page.locator('#datepicker')).toHaveValue(expectedInputValue);
});