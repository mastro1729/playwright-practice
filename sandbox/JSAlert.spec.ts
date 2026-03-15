import {test, expect} from '@playwright/test';

test('JS Alert', async ({page}) => {

    page.on("dialog", async (dialog) => {
        console.log(dialog.message());
        await dialog.accept('JS Prompt');
        // await dialog.dismiss();
        console.log(dialog.type());
        console.log("__________");
    })

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    //1. Simple alert
    await page.getByText('Click for JS Alert').click();

    //2. Confirm alert
    await page.getByText('Click for JS Confirm').click();
    
    //3. Prompt alert
    await page.getByText('Click for JS Prompt').click();
    await page.waitForTimeout(5000);
})