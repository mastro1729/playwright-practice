import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil.js";
import { HomePage } from "../Pages/HomePage.js";
import { RegisterPage } from "../Pages/RegisterPage.js";

export class LogonPage {
    // Page Locators
    private readonly page: Page;
    private readonly eleUtil;
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    /* private readonly warningMsg: Locator;
    private readonly registerLink: Locator; */
    
    // Page Class Constructor
    constructor(page: Page){
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.emailId = page.getByPlaceholder("Username");
        this.password = page.getByPlaceholder("Password");
        this.loginBtn = page.locator("#login-button");
       /*  this.warningMsg = page.locator('div.alert.alert-danger.alert-dismissible');
        this.registerLink = page.locator(`//div[@class='list-group']/a[text()='Register']`); */
    }

    // Page actions/methods
    async goToLoginPage(baseURL: string | undefined) {
        await this.page.goto(baseURL + '?route=account/login');
    }

    async doLogin(email: string, password: string): Promise<HomePage> {
        await this.eleUtil.fill(this.emailId, email);
        await this.eleUtil.fill(this.password, password);
        await this.eleUtil.click(this.loginBtn);
        return new HomePage(this.page);
    }

    /* async getInvalidLoginMessage(): Promise<string | null> {
        const warningMessage = await this.eleUtil.getInnerText(this.warningMsg);
        console.log('Invalid login warning message: ' + warningMessage);
        return warningMessage;
    }

    async naviagatetoRegisterPage(): Promise<RegisterPage> {
        await this.eleUtil.click(this.registerLink);
        return new RegisterPage(this.page);
    } */
}