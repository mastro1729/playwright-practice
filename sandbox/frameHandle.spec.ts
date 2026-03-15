import {test, expect, FrameLocator, Locator} from '@playwright/test';

test('Frame Handle', async ({page}) => {
   /*  await page.goto('https://www.formsite.com/templates/registration-form-templates/vehicle-registration-form/');
    
    await page.getByTitle(`Vehicle-Registration-Forms-and-Examples`).click();

    const frameElement:FrameLocator = page.frameLocator(`iframe[id *= 'frame-one']`);
    frameElement.locator(`input#RESULT_TextField-1`).fill(`Test Automation`);
    await page.waitForTimeout(5000);

    let text: string = await page.getByRole('heading', {name: 'Vehicle Registration Form', exact: true}).innerText();
    console.log(text);
    await page.waitForTimeout(5000); */
    
   /*  await page.goto('https://www.londonfreelance.org/courses/frames/index.html');
   
    const frame: FrameLocator = page.frameLocator(`[name='main']`);
    const heading = frame.getByRole('heading', {name: 'Title bar ', exact: false});
    const text = await heading.innerText();
    console.log(text);
    await expect(heading).toHaveText(/Title bar/i); */

    await page.goto('https://www.londonfreelance.org/courses/frames/index.html');

    let frameCount: Locator[] = await page.locator(`//frame`).all();
    console.log(frameCount.length);
    
    const result = [];
    for(let frame of frameCount){
        let frameText: string | null = await frame.getAttribute('src');
        result.push(frameText);
    }
    console.log(result);
});