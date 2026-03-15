import { test as base, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage.js';
import { LoginPage } from '../Pages/LoginPage.js';

interface myFixtures {
    homePage: HomePage
};

const test = base.extend<myFixtures>({
    homePage: async ({page, baseURL}, use, testInfo) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);

        const username = testInfo.project.metadata.appUsername;
        const password = testInfo.project.metadata.appPassword;

        const homePage = await loginPage.doLogin(username, password);

        expect(await homePage.isUserLoggedIn()).toBeTruthy();

        await use(homePage);
    }
});

export {test, expect};