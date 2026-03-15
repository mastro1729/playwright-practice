import { expect, test } from "@playwright/test";
import { ElementUtil, UserRegistration } from "../utils/ElementUtil.js";

const users = ElementUtil.loadRegistrationData();

for (const user of users) {
    test(`Register user: ${user.email}`, async ({ page }) => {

        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register',
            {
                waitUntil: "domcontentloaded",
                timeout: 60000
            }
        );
        await page.getByRole('textbox', { name: 'First Name' }).fill(user.firstName);
        await page.getByRole('textbox', { name: 'Last Name' }).fill(user.lastName);
        await page.getByRole('textbox', { name: 'E-Mail' }).fill(user.email);
        await page.getByRole('textbox', { name: 'Telephone' }).fill(String(user.phone));
        await page.getByRole('textbox', { name: 'Password' }).first().fill(user.password);
        await page.getByRole('textbox', { name: 'Password Confirm' }).fill(user.password);

        await page.getByRole('radio', { name: 'Yes', checked: false }).click();

        await page.locator('[name="agree"]').click();
        await page.locator('[value="Continue"]').click();

        await expect(page.getByText('Your Account Has Been Created!', { exact: true })).toBeVisible();
    });
}