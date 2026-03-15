import{test, expect} from '@playwright/test';

test('Move To Element', async ({page}) => {
    await page.goto('https://www.spicejet.com/');
    await page.getByText('Add-ons', {exact: true}).hover();
    await page.getByTestId('test-id-Taxi').click();
    await page.waitForTimeout(5000);
})