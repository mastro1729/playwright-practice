import {test, expect} from '@playwright/test';
import path from 'path';

test('File Upload I', async ({page}) => {

    await page.goto('https://practice.expandtesting.com/upload');
    // In JS, the backslash is used as an escape character, so we need two backslashes to represent one literal backslash.
    // But the forward slash is just a normal character and works without any escaping.
    await page.locator('input#fileInput').setInputFiles("C:/Users/mlatchup/Documents/TestFile.txt");
    await page.locator('button#fileSubmit').click();
    await page.waitForTimeout(3000);
})

test('Multi File Upload', async ({page}) => {

    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    // In JS, the backslash is used as an escape character, so we need two backslashes to represent one literal backslash.
    // But the forward slash is just a normal character and works without any escaping.
    await page.locator('input#filesToUpload').setInputFiles(["C:/Users/mlatchup/Documents/TestFile.txt", "C:/Users/mlatchup/Documents/TestFile.txt"]);
    await page.waitForTimeout(3000);
})

test('File Upload II', async ({page}) => {

    await page.goto('https://practice.expandtesting.com/upload');
    // In JS, the backslash is used as an escape character, so we need two backslashes to represent one literal backslash.
    // But the forward slash is just a normal character and works without any escaping.
    await page.locator('input#fileInput').setInputFiles({
        name: 'resume.txt',
        mimeType: 'text/plan',
        buffer: Buffer.from('Test Automation Resume')
    });
    await page.locator('button#fileSubmit').click();
    await page.waitForTimeout(3000);
})

test('Multi File Upload II', async ({page}) => {

    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    // In JS, the backslash is used as an escape character, so we need two backslashes to represent one literal backslash.
    // But the forward slash is just a normal character and works without any escaping.
    await page.locator('input#filesToUpload').setInputFiles(
       [{
        name: 'testfile.txt',
        mimeType: 'text/plan',
        buffer: Buffer.from('Test Automation Resume')
        },
        {
        name: 'samplefile.txt',
        mimeType: 'text/plan',
        buffer: Buffer.from('Test Automation Resume')
        }]
    );
    await page.waitForTimeout(3000);
})

test('File Upload V', async ({page}) => {

    const filePath = path.join(process.cwd(), '/testdata/TestFile.txt');
    console.log(process.cwd());
    console.log(filePath);
    await page.goto('https://qa-automation-practice.netlify.app/file-upload');
    // In JS, the backslash is used as an escape character, so we need two backslashes to represent one literal backslash.
    // But the forward slash is just a normal character and works without any escaping.
    const fileInput = page.locator('input#file_upload');
    await fileInput.setInputFiles(filePath);
    //await page.waitForTimeout(3000);
    await fileInput.setInputFiles([]);
    //await page.waitForTimeout(3000);
    await fileInput.setInputFiles(filePath);
    const uploadBtn = page.locator("button[type='submit']");
    await uploadBtn.click();
    const uploadSuccessMsg = page.locator("div#file_upload_response");
    await expect(uploadSuccessMsg).toBeVisible();
})