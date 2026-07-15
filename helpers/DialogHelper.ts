import { expect, Page } from '@playwright/test';

export class DialogHelper {

    // Verify the dialog message and accept the dialog
    static verifyDialog(page: Page, expectedMessage: string): void {

        page.once("dialog", async dialog => {
            console.log("Expected:", JSON.stringify(expectedMessage));
            console.log("Received:", JSON.stringify(dialog.message()));
            
            expect(dialog.message()).toBe(expectedMessage);
            await dialog.accept();
        });

    }
    
}