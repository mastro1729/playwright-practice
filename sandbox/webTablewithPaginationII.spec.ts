import { test, expect, Locator } from '@playwright/test';

test('Multiple Selection', async ({ page }) => {
  await page.goto('https://selectorshub.com/xpath-practice-page/'); 

  while(true){
    let eleColl = await page.
                  locator(`//td[text()='India']/preceding-sibling::td/input[@type='checkbox']`)
                  .all();
    
    if(eleColl.length > 0){
      for(let ele of eleColl){
        await ele.click();
      }
    }
    
    let next = page.getByRole('link', {name: 'Next'});
    if(await next.isDisabled()){
        console.log('Reached last page!');
        break;
    }
    await next.click();
    await page.waitForTimeout(800);
  }
});