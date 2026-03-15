import {expect, test} from '@playwright/test';
import { LogonPage } from '../Pages/LogonPage';

test.beforeEach(async ({page, baseURL}) => {
    let logonPage = new LogonPage(page);
    await logonPage.goToLoginPage(baseURL);
    await logonPage.doLogin('standard_user', 'secret_sauce');
    await page.locator(".app_logo").waitFor();
});

test('Role-based Locator', async ({page}) => {
    await page.locator(".inventory_item")
              .filter({ hasText: 'Sauce Labs Backpack' })
              .getByRole('button', {name: /Add to cart/})
              .click();
    await expect(page.locator(".shopping_cart_badge")).toBeVisible();
    await page.waitForTimeout(3000);
});

test('Data-test Attribute', async ({page}) => {
    await page.locator("[data-test='add-to-cart-sauce-labs-backpack']")
              .click();
    await expect(page.locator(".shopping_cart_badge")).toBeVisible();
    await page.waitForTimeout(3000);
});

test('Text-Based Locator', async ({page}) => {
    await page.getByText("Sauce Labs Backpack")
              .click();
    await expect(page).toHaveURL(/inventory-item.html/);
    await page.waitForTimeout(3000);
});

test('Partial Attribute Match', async ({page}) => {
    await page.locator(".inventory_item")
              .filter({ hasText: 'Sauce Labs Backpack' })
              .locator('[id^="add-to-cart"]')
              .click();
    await expect(page.locator(".shopping_cart_badge")).toBeVisible();
    await page.waitForTimeout(3000);
});