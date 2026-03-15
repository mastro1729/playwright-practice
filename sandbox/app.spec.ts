import {test, expect} from '@playwright/test';

test.describe('Hooks Inside Describe', () => {

/* test.beforeAll(async ({page}) => {
    await page.goto('https://www.w3schools.com/');
})

test.afterAll(async ({page}) => {
    await page.close();
}) */

/* test.beforeEach(async ({page}) => {
    await page.goto('https://www.w3schools.com/');
})

test.afterEach(async ({page}) => {
    await page.close();
}) */

test('Title Test', async ({page}) => {
    await expect(page).toHaveTitle('W3Schools Online Web Tutorials');
})

test('Header Test', async ({page}) => {
    await expect(page.getByText('Learn to Code', {exact: true})).toBeVisible();
})

})