import { test, expect } from "@playwright/test";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { ShoppingCartUtils } from "../utils/ShoppingCartUtils";
import { DialogHelper } from "../helpers/DialogHelper";

const PRODUCT_PRICE = "$10.90";
const PRODUCT_INDEX = 0;
const INCREASE_BY = 4;
const DECREASE_BY = 4;
const CHECKOUT_DIALOG_PREFIX = "Checkout - Subtotal: $ ";

test('Add all $10.90 products and verify shopping cart', async ({ page }) => {

    // Create the Shopping Cart page object
    const shoppingCartPage = new ShoppingCartPage(page);

    // Navigate to the Shopping Cart application
    await shoppingCartPage.goto();

    // Add all products priced at $10.90
    const expectedProducts = await shoppingCartPage.addProductsByPrice(PRODUCT_PRICE);

    console.log("Expected Products: ", expectedProducts);

    // Open the shopping cart
    await shoppingCartPage.openCart();

    // Increase the quantity of the selected product
    await shoppingCartPage.increaseQuantity(PRODUCT_INDEX, INCREASE_BY);

    // Update the expected quantity after increasing it in the cart
    expectedProducts[PRODUCT_INDEX].quantity += INCREASE_BY;

    // Pause execution to inspect the cart manually
    // The total execution time of this pause counts toward Playwright's overall test timeout.
    // If the test is already close to the default 30-second timeout, this wait may cause 
    // the test to fail with "Test timeout exceed".
    await page.waitForTimeout(10000);

    // Read all products displayed in the shopping cart
    const actualProducts = await shoppingCartPage.getProductsInCart();

    console.log("Actual Products: ", actualProducts);

    // Verify that the cart products match the expected products
    expect(actualProducts).toEqual(expectedProducts);

    // Calculate the expected cart subtotal
    const expectedSubtotal = ShoppingCartUtils.calculateSubtotal(expectedProducts);

    // Read the actual cart subtotal
    const actualSubtotal = await shoppingCartPage.getCartSubtotal();

    console.log(`Expected Subtotal: ${expectedSubtotal.toFixed(2)}`);
    console.log(`Actual Subtotal: ${actualSubtotal.toFixed(2)}`);

    // Verify that the cart subtotal is correct
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);

});

test('Increase the quantity of a cart item and verify subtotal', async ({ page }) => {

    // Create the Shopping Cart page object
    const shoppingCartPage = new ShoppingCartPage(page);

    // Navigate to the Shopping Cart application
    await shoppingCartPage.goto();

    // Add all products priced at $10.90
    const expectedProducts = await shoppingCartPage.addProductsByPrice(PRODUCT_PRICE);

    console.log("Expected Products: ", expectedProducts);

    // Open the shopping cart
    await shoppingCartPage.openCart();

    // Increase the quantity of the selected product
    await shoppingCartPage.increaseQuantity(PRODUCT_INDEX, INCREASE_BY);

    // Update the expected quantity after increasing it in the cart
    // expectedProducts[PRODUCT_INDEX].quantity += INCREASE_BY;
    ShoppingCartUtils.updateProductQuantity(expectedProducts, PRODUCT_INDEX, INCREASE_BY);

    // Pause execution to inspect the cart manually
    await page.waitForTimeout(10000);

    // Read all products displayed in the shopping cart
    const actualProducts = await shoppingCartPage.getProductsInCart();

    console.log("Actual Products: ", actualProducts);

    // Verify that the cart products match the expected products
    expect(actualProducts).toEqual(expectedProducts);

    // Calculate the expected cart subtotal
    const expectedSubtotal = ShoppingCartUtils.calculateSubtotal(expectedProducts);

    // Read the actual cart subtotal
    const actualSubtotal = await shoppingCartPage.getCartSubtotal();

    console.log(`Expected Subtotal: ${expectedSubtotal.toFixed(2)}`);
    console.log(`Actual Subtotal: ${actualSubtotal.toFixed(2)}`);

    // Verify that the cart subtotal is correct
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);

});

test('Increase the quantity of all cart items and verify subtotal', async ({ page }) => {

    // Create the Shopping Cart page object
    const shoppingCartPage = new ShoppingCartPage(page);

    // Navigate to the Shopping Cart application
    await shoppingCartPage.goto();

    // Add all products priced at $10.90
    const expectedProducts = await shoppingCartPage.addProductsByPrice(PRODUCT_PRICE);

    console.log("Expected Products: ", expectedProducts);

    // Open the shopping cart
    await shoppingCartPage.openCart();

    // Increase the quantity of the selected product
    await shoppingCartPage.increaseQuantityForAllProducts(INCREASE_BY);

    // Update the expected quantity after increasing it in the cart
    // expectedProducts[PRODUCT_INDEX].quantity += INCREASE_BY;
    ShoppingCartUtils.updateAllProductsQuantity(expectedProducts, INCREASE_BY);

    // Pause execution to inspect the cart manually
    await page.waitForTimeout(10000);

    // Read all products displayed in the shopping cart
    const actualProducts = await shoppingCartPage.getProductsInCart();

    console.log("Actual Products: ", actualProducts);

    // Verify that the cart products match the expected products
    expect(actualProducts).toEqual(expectedProducts);

    // Calculate the expected cart subtotal
    const expectedSubtotal = ShoppingCartUtils.calculateSubtotal(expectedProducts);

    // Read the actual cart subtotal
    const actualSubtotal = await shoppingCartPage.getCartSubtotal();

    console.log(`Expected Subtotal: ${expectedSubtotal.toFixed(2)}`);
    console.log(`Actual Subtotal: ${actualSubtotal.toFixed(2)}`);

    // Verify that the cart subtotal is correct
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);

});

test('Decrease the quantity of a cart item and verify subtotal', async ({ page }) => {

    // Create the Shopping Cart page object
    const shoppingCartPage = new ShoppingCartPage(page);

    // Navigate to the Shopping Cart application
    await shoppingCartPage.goto();

    // Add all products priced at $10.90
    const expectedProducts = await shoppingCartPage.addProductsByPrice(PRODUCT_PRICE);

    console.log("Expected Products: ", expectedProducts);

    // Open the shopping cart
    await shoppingCartPage.openCart();

    // Increase the quantity of the selected product
    await shoppingCartPage.increaseQuantity(PRODUCT_INDEX, INCREASE_BY);

    // Update the expected quantity after increasing it in the cart
    // expectedProducts[PRODUCT_INDEX].quantity += INCREASE_BY;
    ShoppingCartUtils.updateProductQuantity(expectedProducts, PRODUCT_INDEX, INCREASE_BY);

    // Pause execution to inspect the cart manually
    await page.waitForTimeout(10000);

    // Decrease the quantity of the selected product
    await shoppingCartPage.decreaseQuantity(PRODUCT_INDEX, INCREASE_BY);

    // Update the expected quantity after decreasing it in the cart
    ShoppingCartUtils.updateProductQuantity(expectedProducts, PRODUCT_INDEX, -INCREASE_BY);

    // Pause execution to inspect the cart manually
    await page.waitForTimeout(10000);

    // Read all products displayed in the shopping cart
    const actualProducts = await shoppingCartPage.getProductsInCart();

    console.log("Actual Products: ", actualProducts);

    // Verify that the cart products match the expected products
    expect(actualProducts).toEqual(expectedProducts);

    // Calculate the expected cart subtotal
    const expectedSubtotal = ShoppingCartUtils.calculateSubtotal(expectedProducts);

    // Read the actual cart subtotal
    const actualSubtotal = await shoppingCartPage.getCartSubtotal();

    console.log(`Expected Subtotal: ${expectedSubtotal.toFixed(2)}`);
    console.log(`Actual Subtotal: ${actualSubtotal.toFixed(2)}`);

    // Verify that the cart subtotal is correct
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);

});

test('Decrease the quantity of all cart items and verify subtotal', async ({ page }) => {

    // Create the Shopping Cart page object
    const shoppingCartPage = new ShoppingCartPage(page);

    // Navigate to the Shopping Cart application
    await shoppingCartPage.goto();

    // Add all products priced at $10.90
    const expectedProducts = await shoppingCartPage.addProductsByPrice(PRODUCT_PRICE);

    console.log("Expected Products: ", expectedProducts);

    // Open the shopping cart
    await shoppingCartPage.openCart();

    // Increase the quantity of every product in the shopping cart
    await shoppingCartPage.increaseQuantityForAllProducts(INCREASE_BY);

    // Update the expected quantity after increasing it in the cart
    // expectedProducts[PRODUCT_INDEX].quantity += INCREASE_BY;
    ShoppingCartUtils.updateAllProductsQuantity(expectedProducts, INCREASE_BY);

    // Pause execution to inspect the cart manually
    await page.waitForTimeout(5000);

    // Decrease the quantity of every product in the shopping cart
    await shoppingCartPage.decreaseQuantityForAllProducts(DECREASE_BY);

    // Update the expected quantity after decreasing it in the cart
    ShoppingCartUtils.updateAllProductsQuantity(expectedProducts, -DECREASE_BY);

    // Pause execution to inspect the cart manually
    await page.waitForTimeout(5000);

    // Read all products displayed in the shopping cart
    const actualProducts = await shoppingCartPage.getProductsInCart();

    console.log("Actual Products: ", actualProducts);

    // Verify that the cart products match the expected products
    expect(actualProducts).toEqual(expectedProducts);

    // Calculate the expected cart subtotal
    const expectedSubtotal = ShoppingCartUtils.calculateSubtotal(expectedProducts);

    // Read the actual cart subtotal
    const actualSubtotal = await shoppingCartPage.getCartSubtotal();

    console.log(`Expected Subtotal: ${expectedSubtotal.toFixed(2)}`);
    console.log(`Actual Subtotal: ${actualSubtotal.toFixed(2)}`);

    // Verify that the cart subtotal is correct
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);

});

test('Remove a product from the shopping cart and verify subtotal', async ({ page }) => {

    // Create the Shopping Cart page object
    const shoppingCartPage = new ShoppingCartPage(page);

    // Navigate to the Shopping Cart application
    await shoppingCartPage.goto();

    // Add all products priced at $10.90
    const expectedProducts = await shoppingCartPage.addProductsByPrice(PRODUCT_PRICE);

    console.log("Expected Products: ", expectedProducts);

    // Open the shopping cart
    await shoppingCartPage.openCart();

    // Remove the selected product from the shopping cart
    await shoppingCartPage.removeProduct(PRODUCT_INDEX);

    // Pause execution to inspect the cart manually
    await page.waitForTimeout(10000);

    // Remove the expected product
    ShoppingCartUtils.removeExpectedProduct(expectedProducts, PRODUCT_INDEX);

    // Read all products displayed in the shopping cart
    const actualProducts = await shoppingCartPage.getProductsInCart();

    console.log("Actual Products: ", actualProducts);

    // Verify that the cart products match the expected products
    expect(actualProducts).toEqual(expectedProducts);

    // Calculate the expected cart subtotal
    const expectedSubtotal = ShoppingCartUtils.calculateSubtotal(expectedProducts);

    // Read the actual cart subtotal
    const actualSubtotal = await shoppingCartPage.getCartSubtotal();

    console.log(`Expected Subtotal: ${expectedSubtotal.toFixed(2)}`);
    console.log(`Actual Subtotal: ${actualSubtotal.toFixed(2)}`);

    // Verify that the cart subtotal is correct
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);

});

test('Remove all products from the shopping cart and verify the cart is empty', async ({ page }) => {

    // Create the Shopping Cart page object
    const shoppingCartPage = new ShoppingCartPage(page);

    // Navigate to the Shopping Cart application
    await shoppingCartPage.goto();

    // Add all products priced at $10.90
    const expectedProducts = await shoppingCartPage.addProductsByPrice(PRODUCT_PRICE);

    console.log("Expected Products: ", expectedProducts);

    // Open the shopping cart
    await shoppingCartPage.openCart();

    // Remove the selected product from the shopping cart
    await shoppingCartPage.removeProduct(PRODUCT_INDEX);

    // Pause execution to inspect the cart manually
    await page.waitForTimeout(10000);

    // Remove the expected product
    ShoppingCartUtils.removeExpectedProduct(expectedProducts, PRODUCT_INDEX);

    // Read all products displayed in the shopping cart
    const actualProducts = await shoppingCartPage.getProductsInCart();

    console.log("Actual Products: ", actualProducts);

    // Verify that the cart products match the expected products
    expect(actualProducts).toEqual(expectedProducts);

    // Calculate the expected cart subtotal
    const expectedSubtotal = ShoppingCartUtils.calculateSubtotal(expectedProducts);

    // Read the actual cart subtotal
    const actualSubtotal = await shoppingCartPage.getCartSubtotal();

    console.log(`Expected Subtotal: ${expectedSubtotal.toFixed(2)}`);
    console.log(`Actual Subtotal: ${actualSubtotal.toFixed(2)}`);

    // Verify that the cart subtotal is correct
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);

});

test('Verify the shopping cart badge updates correctly', async ({ page }) => {

    // Create the Shopping Cart page object
    const shoppingCartPage = new ShoppingCartPage(page);

    // Navigate to the Shopping Cart application
    await shoppingCartPage.goto();

    // Add all products priced at $10.90
    const expectedProducts = await shoppingCartPage.addProductsByPrice(PRODUCT_PRICE);

    console.log("Expected Products: ", expectedProducts);

    // Verify the initial shopping cart badge count
    expect(await shoppingCartPage.getCartBadgeCount()).toBe(ShoppingCartUtils.calculateTotalQunatity(expectedProducts));

    // Open the shopping cart
    await shoppingCartPage.openCart();

    // Increase the quantity of the seleted product in the shopping cart
    await shoppingCartPage.increaseQuantity(PRODUCT_INDEX, INCREASE_BY);

    // Update the expected quantity after increasing it in the cart
    // expectedProducts[PRODUCT_INDEX].quantity += INCREASE_BY;
    ShoppingCartUtils.updateProductQuantity(expectedProducts, PRODUCT_INDEX, INCREASE_BY);

    // Pause execution to inspect the cart manually
    await page.waitForTimeout(5000);

    // Close the shopping cart
    await shoppingCartPage.closeCart();

    // Verify the shopping cart badge count
    expect(await shoppingCartPage.getCartBadgeCount()).toBe(ShoppingCartUtils.calculateTotalQunatity(expectedProducts));

    // Open the shopping cart
    await shoppingCartPage.openCart();

    // Decrease the quantity of the selected product in the shopping cart
    await shoppingCartPage.decreaseQuantity(PRODUCT_INDEX, DECREASE_BY);

    // Update the expected quantity after decreasing it in the cart
    ShoppingCartUtils.updateProductQuantity(expectedProducts, PRODUCT_INDEX, -DECREASE_BY);

    // Pause execution to inspect the cart manually
    await page.waitForTimeout(5000);

    // Close the shopping cart
    await shoppingCartPage.closeCart();

    // Verify the shopping cart badge count
    expect(await shoppingCartPage.getCartBadgeCount()).toBe(ShoppingCartUtils.calculateTotalQunatity(expectedProducts));

    // Open the shopping cart
    await shoppingCartPage.openCart();

    // Remove the selected product from the shopping cart
    await shoppingCartPage.removeProduct(PRODUCT_INDEX);

    // Remove the expected product
    ShoppingCartUtils.removeExpectedProduct(expectedProducts, PRODUCT_INDEX);

    // Close the shopping cart
    await shoppingCartPage.closeCart();

    // Verify the shopping cart badge count
    expect(await shoppingCartPage.getCartBadgeCount()).toBe(ShoppingCartUtils.calculateTotalQunatity(expectedProducts));
});

test('Verify checkout displays the correct subtotal', async ({ page }) => {

    // Create the Shopping Cart page object
    const shoppingCartPage = new ShoppingCartPage(page);

    // Navigate to the Shopping Cart application
    await shoppingCartPage.goto();

    // Add all products priced at $10.90
    const expectedProducts = await shoppingCartPage.addProductsByPrice(PRODUCT_PRICE);

    console.log("Expected Products: ", expectedProducts);

    // Open the shopping cart
    await shoppingCartPage.openCart();

    // Increase the quantity of the selected product
    await shoppingCartPage.increaseQuantity(PRODUCT_INDEX, INCREASE_BY);

    // Update the expected quantity after increasing it in the cart
    ShoppingCartUtils.updateProductQuantity(expectedProducts, PRODUCT_INDEX, INCREASE_BY);

    // Pause execution to inspect the cart manually
    // The total execution time of this pause counts toward Playwright's overall test timeout.
    // If the test is already close to the default 30-second timeout, this wait may cause 
    // the test to fail with "Test timeout exceed".
    await page.waitForTimeout(10000);

    // Calculate the expected cart subtotal
    const expectedSubtotal = ShoppingCartUtils.calculateSubtotal(expectedProducts);
    console.log(`Expected Subtotal: ${expectedSubtotal.toFixed(2)}`);

    // Read the actual cart subtotal
    const actualSubtotal = await shoppingCartPage.getCartSubtotal();
    console.log(`Actual Subtotal: ${actualSubtotal.toFixed(2)}`);

    // Verify that the cart subtotal is correct
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);

    // Build the expected Checkout dialog message
    const expectedDialogMessage = `${CHECKOUT_DIALOG_PREFIX}${expectedSubtotal.toFixed(2)}`;

    /**
     * Why are we verifying the dialog before clicking Checkout?
     * 
     * We are not verifying it yet - we are registering the dialog handler.
     * The verification happens automatically when the dialog appears.
     */
    // Register a dialog handler before triggering the Checkout dialog.
    // The dialog is triggered immediately after the button is clicked,
    // so the listener must be ready to verify and accept it.
    DialogHelper.verifyDialog(page, expectedDialogMessage);

    // Click the Checkout button to open the Checkout dialog.
    await shoppingCartPage.checkout();

});