import { Browser, chromium, expect, Locator, Page, test } from '@playwright/test'
import { count } from 'console';

test('Learning Locators', async () => {
    let browser: Browser = await chromium.launch({headless: false, channel: 'chrome'});
    let page: Page = await browser.newPage();
    
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    let rightPanelLinks: string[] = await page.locator('.list-group-item').allInnerTexts();
    console.log(rightPanelLinks);
    console.log(rightPanelLinks.length);

    for(let e of rightPanelLinks){
        console.log(e)
        if(e === 'Forgotten Password'){
            await page.getByText(e).first().click();
            break;
        }
    }

    // await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    let footerLinks: Locator[] = await page.locator('footer a').all();
    console.log(footerLinks);
    console.log(footerLinks.length);

    let allFooterLinks = [];
    for(let e of footerLinks){
        //console.log(await e.innerText());
        // console.log(await e.getAttribute('href'));
        let linkText: string = await e.innerText();
        allFooterLinks.push(linkText);
    }
    console.log(allFooterLinks)
   
});

test('Multiple Elements', async ({page}) => {
    await page.goto('https://www.w3schools.com/');
    page.locator('input#tnb-google-search-input').fill('Java');

    await page.waitForSelector('div#tnb-search-suggestions a');
    const collection = page.locator('div#tnb-search-suggestions a');
    const count = await collection.count();
    for(let i=0; i<count; i++){
        const text = await collection.nth(i).textContent();
        console.log(text);
    }
})