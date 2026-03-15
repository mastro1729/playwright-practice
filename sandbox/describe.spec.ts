import {test, expect} from '@playwright/test';

test.describe('Basic Test Suite', () => {
    test('Title Test', async ({page, browserName}) => {
    // test.skip(browserName === 'firefox', 'Not supported in firefox');
    await page.goto('https://www.w3schools.com/');
    await expect(page).toHaveTitle('W3Schools Online Web Tutorials');
})

test('URL Test', async ({page}) => {
    await page.goto('https://www.w3schools.com/');
    await expect(page).toHaveURL(/.*w3schools.*/);
})

})


test.describe('Advanced Test Suite', () => {
    test('Header Visibility Test', async ({page}) => {
    await page.goto('https://www.w3schools.com/');
    let header = page.getByRole('heading', {name: 'Learn to Code'});
    await expect(header).toHaveText('Learn to Code');
})

test('Search Icon Visibility Test', async ({page, browserName}) => {
    //test.slow();
    //test.slow(browserName === 'chromium', 'Marks a test as "slow');
    await page.goto('https://www.w3schools.com/');
    let searchicon = page.locator('i#learntocode_searchicon');
    await expect(searchicon).toBeVisible();
})

test('Google Search Icon Visibility Test', async ({page}) => {
    //test.fail();
    await page.goto('https://www.w3schools.com/');
    let googleSearchIcon = page.locator(`//*[name()='svg' and @id='tnb-google-search-icon']`);
    await expect(googleSearchIcon).toBeVisible();
})

test('W3Schools Certificates Visibility Test', async ({page}) => {
    await page.goto('https://www.w3schools.com/');
    let W3SCerts = page.locator(`//div[@class='tnb-right-section']
    // /a[normalize-space(.)='Get Certified']`).first();
    await expect(W3SCerts).toBeVisible();
})
})

