import { test, expect, Locator, FrameLocator } from '@playwright/test';

test('Validate text content inside top, middle, & bottomframes of the frameset', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/nested_frames', { waitUntil: 'load' });

    console.log(page.frames().map(f => f.name()));

    const frameTop: FrameLocator = page.frameLocator('frame[name="frame-top"]');
    const frameLeft: FrameLocator = frameTop.frameLocator('frame[name="frame-left"]');
    const frameMiddle: FrameLocator = frameTop.frameLocator('frame[name="frame-middle"]');
    const frameRight: FrameLocator = frameTop.frameLocator('frame[name="frame-right"]');

    const leftText = await frameLeft.locator('body').innerText();
    expect(leftText).toContain('LEFT');
    
    const middleText = await frameMiddle.locator('body').innerText();
    expect(middleText).toContain('MIDDLE');
    
    const rightText = await frameRight.locator('body').innerText();
    expect(rightText).toContain('RIGHT');

});