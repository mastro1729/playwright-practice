import { ElementHandle, expect, test } from '@playwright/test';

test('Extract all disabled dates from calendar', async ({ page }) => {
    await page.goto('https://www.redbus.in');
    await page.locator('[aria-label*="Select Date"]').click();
    await page.locator('div[class*="datepicker"]').waitFor();

    /* const disabledDates = await page.locator(`//div[@role='button' and @aria-disabled='true']`)
              .evaluateAll(elements => 
                elements.map(e1 => e1.getAttribute('aria-label'))); */

    const dateLocator = page.locator('//ul//div[@role="button"]');
    const dateElements: ElementHandle<Node>[] = await dateLocator.elementHandles();
    //console.log(dateElements);
    // expect(disabledDates.length).toBeGreaterThan(0);

    /*  for(const element of dateElements) {
         const label = await element.getAttribute('aria-label');
         console.log(label); 
     } */

    const today = new Date();
    today.setHours(0, 0, 0, 0); 
  
    for (const ele of dateElements) {
        const rawText =
            await ele.getAttribute('aria-label');
        const dateText = rawText?.split(',').slice(0,3).join(',');

        const calendarDate = new Date(dateText!);
        calendarDate.setHours(0, 0, 0, 0);

        if (today > calendarDate) {
            const isDisabled =
                await ele.getAttribute('aria-disabled');
            console.log({
                date: dateText,
                disabled: isDisabled === 'true'
            });
        }
    }
})