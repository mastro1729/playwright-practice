import { test, expect, Page, Locator } from '@playwright/test';

import path from "path";
import { fileURLToPath } from "url";
import XLSX from "xlsx"; //[npm install xlsx]

type flexibleLocator = string | Locator;

export interface UserRegistration {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string
}

export class ElementUtil {

    private page: Page;
    private defaultTimeout: number = 30000;

    constructor(page: Page, timeOut: number = 30000) {
        this.page = page;
        this.defaultTimeout = timeOut;
    }

    /**
     * 
     * @param locator 
     * @returns 
     */
    private getLocator(locator: flexibleLocator, index?: number): Locator {
        if (typeof locator === 'string') {
            if (index) {
                return this.page.locator(locator).nth(index);
            }
            else {
                return this.page.locator(locator).first();
            }
        }
        else {
            if (index) {
                return locator.nth(index);
            }
            else {
                return locator.first();
            }
        }
    }

    /**
     * 
     * @param locator 
     * @param options 
     */
    async click(locator: flexibleLocator, options?: { force?: boolean; timeout?: number }, index?: number): Promise<void> {
        await this.getLocator(locator, index).click({
            force: options?.force,
            timeout: options?.timeout || this.defaultTimeout
        });
        console.log(`Clicked on element: ${locator}`);
    }

    /**
     * 
     * @param locator 
     * @param text 
     */
    async fill(locator: flexibleLocator, text: string): Promise<void> {
        await this.getLocator(locator).fill(text, { timeout: this.defaultTimeout });
        console.log(`Filled text: ${text} into element: ${locator}`);
    }

    /**
     * 
     * @param locator 
     */
    async doubleClick(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).dblclick({
            timeout: this.defaultTimeout
        });
        console.log(`Double Clicked on element: ${locator}`);
    }

    /**
     * 
     * @param locator 
     */
    async rightClick(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).click({
            button: 'right',
            timeout: this.defaultTimeout
        });
        console.log(`Right Clicked on element: ${locator}`);
    }

    /**
     * 
     * @param locator 
     * @param text 
     * @param delay 
     */
    async type(locator: flexibleLocator, text: string, delay: number = 500): Promise<void> {
        await this.getLocator(locator).pressSequentially(text, {
            delay,
            timeout: this.defaultTimeout
        });
        console.log(`Typed text: ${text} into element: ${locator}`);
    }

    /**
     * 
     * @param locator 
     */
    async clear(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).clear({
            timeout: this.defaultTimeout
        });
        console.log(`Cleared the text ${locator}`);
    }

    async getText(locator: flexibleLocator): Promise<string | null> {
        const text = await this.getLocator(locator).textContent();
        return text;
    }

    async getInnerText(locator: flexibleLocator): Promise<string> {
        const text = await this.getLocator(locator).innerText();
        return text;
    }

    async getAttributeValue(locator: flexibleLocator, attributeName: string): Promise<string | null> {
        const text = await this.getLocator(locator).getAttribute(attributeName);
        return text;
    }

    async getInputValue(locator: flexibleLocator): Promise<string> {
        const text = await this.getLocator(locator).inputValue();
        return text;
    }

    async getAllInnerTexts(locator: flexibleLocator): Promise<String[]> {
        return this.getLocator(locator).allInnerTexts();
    }

    /**
     * 
     * @param locator 
     * @param timeout 
     * @returns 
     */
    /*   async isVisible(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
          try{
              await this.getLocator(locator).waitFor({
              state: 'visible',
              timeout
          });
          return true;
          }
          catch {
              return false;
          }
      } */

    async isVisible(locator: flexibleLocator, index?: number): Promise<boolean> {
        return await this.getLocator(locator, index).isVisible();
    }

    async isEnabled(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isEnabled();
    }

    async isDisabled(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isDisabled();
    }

    async isHidden(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isHidden();
    }

    async isChecked(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isChecked();
    }

    async isEditable(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isEditable();
    }

    async waitForElementVisible(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
        try {
            await this.getLocator(locator).waitFor({ state: 'visible', timeout });
            return true;
        }
        catch {
            return false;
        }
    }

    async waitForElementAttached(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
        try {
            await this.getLocator(locator).waitFor({ state: 'attached', timeout });
            return true;
        }
        catch {
            return false;
        }
    }

    async waitForPageLoad(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
        try {
            await this.getLocator(locator).waitFor({ state: 'attached', timeout });
            return true;
        }
        catch {
            return false;
        }
    }

    async selectByText(locator: flexibleLocator, text: string) {
        await this.getLocator(locator).selectOption({ label: text })
    }

    async selectByValue(locator: flexibleLocator, value: string) {
        await this.getLocator(locator).selectOption({ value: value })
    }


    async selectByIndex(locator: flexibleLocator, index: number) {
        await this.getLocator(locator).selectOption({ index: index })
    }

    static loadRegistrationData(): UserRegistration[] {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const excelPath = path.join(__dirname, "../testdata/TestFile.xlsx");

        const workbook = XLSX.readFile(excelPath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet) as UserRegistration[];

        return rows;
    }
}