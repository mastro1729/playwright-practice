import {expect, test} from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Download file on file.io', async ({page}) => {
    await page.goto('https://www.learningcontainer.com/');

    const[popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.click("//span[text()='PDF Sample Files']")
    ]);

    await popup.waitForLoadState('domcontentloaded');

    const[download] = await Promise.all([
        popup.waitForEvent('download'),
        popup.click("//a[text()='Sample PDF File for Testing']/ancestor::div[@class='media-body']/following-sibling::div/a")
    ]);

    const downloadDir = path.join(process.cwd(), 'downloads');
    const filepath = path.join(downloadDir, download.suggestedFilename());

    if(!fs.existsSync(downloadDir)){
        fs.mkdirSync(downloadDir);
    }

    await download.saveAs(filepath);

    expect(fs.existsSync(filepath)).toBeTruthy();
    expect(fs.statSync(filepath).size).toBeGreaterThan(0);
    expect(download.suggestedFilename()).toContain('.pdf');

});