import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil.js";
import { LoginPage } from "../Pages/LoginPage.js";
import { ResultsPage } from "../Pages/ResultsPage.js";

export class HomePage {
    // Page Locators
    readonly page: Page;
    private readonly eleUtil;

    private readonly loginLink: Locator;
    private readonly logoutLink: Locator;
    private readonly search: Locator;
    private readonly searchIcon: Locator;
    
    // Page Class Constructor
    constructor(page: Page){
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.logoutLink = page.getByText('Logout');
        this.loginLink = page.getByText('Login');
        this.search = page.getByRole('textbox', {name: 'Search'});
        this.searchIcon = page.locator('div#search > span.input-group-btn >  button.btn');
    }

    // Page actions/methods
    async isUserLoggedIn(): Promise<boolean> {
        return await this.eleUtil.isVisible(this.logoutLink, 1);
    }

    async doLogout(): Promise<LoginPage> {
        await this.eleUtil.click(this.logoutLink, { timeout: 5000}, 0);
        await this.eleUtil.click(this.loginLink);
        return new LoginPage(this.page);
    }

    async doSearch(text: string): Promise<ResultsPage> {
        await this.eleUtil.fill(this.search, text);
        await this.eleUtil.click(this.searchIcon);
        return new ResultsPage(this.page);
    }
   
}