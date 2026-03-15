import { test, expect } from '../fixtures/baseFixture.js';
import {LoginPage} from '../Pages/LoginPage.js'

test('Verify valid Login', async ({homePage}) => {
  await expect(homePage.page).toHaveTitle('My Account');
});

// npm install --save-dev allure-playwright allure-commandline
// npx allure generate allure-results --clean -o allure-report
// Report successfully generated to allure-report
// npx allure open allure-report
test('Verify Invalid Login', async ({page, baseURL}) => {
    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    await loginPage.doLogin('pwtest@nal.com', 'test123456!');
    const warningMessage = await loginPage.getInvalidLoginMessage();
    expect(warningMessage).toBe(' Warning: No match for E-Mail Address and/or Password.');
});