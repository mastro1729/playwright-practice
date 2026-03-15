import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil.js";
import { ProductInfoPage } from "../Pages/ProductInfoPage.js"

export class ResultsPage {
    // Page Locators
    private readonly page: Page;
    private readonly eleUtil;
    private readonly results: Locator;
    
    // Page Class Constructor
    constructor(page: Page){
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.results = page.locator('div.product-thumb');
    }

    // Page actions/methods
    async getSearchResultsCount(): Promise<number> {
        return await this.results.count();
    }

    async selectTheProduct(productName: string): Promise<ProductInfoPage> {
        await this.eleUtil.click(this.page.getByRole('link', {name: `${productName}`}));
        return new ProductInfoPage(this.page);
    }
    
}