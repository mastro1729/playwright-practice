import { test, expect } from '@playwright/test';

test('Single Selection', async ({ page }) => {
  await page.goto('https://selectorshub.com/xpath-practice-page/'); 

  while(true){
    let lookUpEle = await page.locator(`//td[text()='Hong Kong']`).isVisible();
    if(lookUpEle){
        console.log('Element is found!');
        await page.
        locator(`//td[text()='Hong Kong']/preceding-sibling::td/input[@type='checkbox']`).check();
        await page.waitForTimeout(10000);
        break;
    }
    let next = page.getByRole('link', {name: 'Next'});
    
    if(await next.isDisabled()){
        console.log('Reached last page. Element not found!');
        break;
    }

    await next.click();
    await page.waitForTimeout(2000);
  }
});