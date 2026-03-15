import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil.js";

export class ProductInfoPage {
    // Page Locators
    private readonly page: Page;
    private readonly eleUtil;
    private readonly header: Locator;
    private readonly imageCount: Locator;
    private readonly productMetadata: Locator;
    private readonly productPricedata: Locator;

    private readonly productMap = new Map<string, string | number | undefined>();
    
    // Page Class Constructor
    constructor(page: Page){
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.header = page.locator('h1');
        this.imageCount = page.locator('div#content img');
        this.productMetadata = page.locator(`//div[@id='content']//ul[@class='list-unstyled'][1]/li`);
        this.productPricedata = page.locator(`//div[@id='content']//ul[@class='list-unstyled'][2]/li`);
    }

    // Page actions/methods
   async getProductHeader(): Promise<string> {
    let header = await this.eleUtil.getInnerText(this.header);
    return header.trim();
   }

   async getProductImagesCount(): Promise<number> {
    await this.eleUtil.waitForElementVisible(this.imageCount);
    let productImagesCount = await this.imageCount.count();
    return productImagesCount;
   }

   async getProductDetails(): Promise<Map<string, string | number | undefined>> {
    this.productMap.set('Header', await this.getProductHeader());
    this.productMap.set('ImageCount', await this.getProductImagesCount());
    await this.getProductMetadata();
    await this.getProductPricedata();
    this.printProductDetails();
    return this.productMap;
   }

   private async printProductDetails() {
    for(const [key, value] of this.productMap) {
        console.log(key, value);
    }
   }

   private async getProductMetadata() {
    let productMetadata:string[] = await this.productMetadata.allInnerTexts();
    for(let meta of productMetadata) {
        const [metaKeyRaw, metaDataRaw] = meta.split(':');
        if(!metaKeyRaw || !metaDataRaw) continue;
        const metaKey = metaKeyRaw.trim();
        const metaValue = metaDataRaw.trim();
        this.productMap.set(metaKey, metaValue);
    }

   }

   private async getProductPricedata() {
    let productPricedata:string[] = await this.productPricedata.allInnerTexts();
    let productPrice = productPricedata[0].trim();
    let productExTax = productPricedata[1].split(':')[1].trim();
    this.productMap.set('price', productPrice);
    this.productMap.set('Ex Tax', productExTax);
   }


    
}