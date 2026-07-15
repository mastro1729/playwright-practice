import { expect, Locator, Page } from "@playwright/test";
import { Product } from "../models/Product";

export class ShoppingCartPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Product cards displayed on the Products page
    private get productCards(): Locator {
        return this.page.locator("//div[@tabindex='1']");
    }

    // Shopping cart icon 
    private get cartButton(): Locator {
        return this.page.locator("//div[@title='Products in cart quantity']/ancestor::button");
    }

    // Close (X) button in the shopping cart
    private get closeCartButton(): Locator {
        return this.page.locator("//button[span='X']");
    }

    // Product cards displayed inside the shopping cart
    private get cartItems(): Locator {
        return this.page.locator("//div[contains(@class, 'sc-11uohgb-0')]");
    }

    // '+' button used to increase product quantity
    private get increaseQuantityButtons(): Locator {
        return this.page.locator("//button[text()='+']");
    }

    // '-' button used to decrease product quantity
    private get decreaseQuantityButtons(): Locator {
        return this.page.locator("//button[text()='-']");
    }

    // Cart subtotal
    private get subtotal(): Locator {
        return this.page.locator("//p[text()='SUBTOTAL']/following-sibling::div/p");
    }

    // Locate all remove ('X') buttons dispalyed in the shopping cart
    private get removeProductButtons(): Locator {
        return this.page.getByRole("button", { name: "remove product from cart" });
    }

    // Checkout button
    private get checkoutButton(): Locator {
        return this.page.getByRole('button', {name: 'CHECKOUT'});
    }

    // Navigate to the shopping cart application
    async goto(): Promise<void> {
        // The browser does not always receive all the products immediately when the page starts loading.
        // Instead, JavaScript requests them later and updates the page when the response arrives.
        // Use 'networkidle' because the product list is loaded asynchronously.
        // Waiting for the network to become idle ensures all products are available before interacting with the page.
        await this.page.goto('https://react-shopping-cart-67954.firebaseapp.com/products', { waitUntil: 'networkidle' });
    }

    // Add all products matching the specified price to the shopping cart
    async addProductsByPrice(price: string, quantity: number = 1): Promise<Product[]> {

        // Store products that are expected to appear in the shopping cart
        const expectedProducts: Product[] = [];
        const productCount = await this.productCards.count();
        console.log(`Product Count: ${productCount}`);

        // Iterate through all product cards displayed on the page
        for (let i = 0; i < productCount; i++) {
            const productCard = this.productCards.nth(i);
            const productDetails = await productCard.locator("p").allInnerTexts();

            const productName = productDetails[0].trim();
            const productPrice = productDetails[1].trim().replace(/\s+/g, "");

            // Add products whose price matches the specified price
            if (productPrice === price) {

                expectedProducts.push({
                    name: productName,
                    price: productPrice,
                    quantity
                });

                // Add the matching product to the shopping cart
                const addToCartButton = productCard.getByRole('button', { name: 'Add to cart' });
                await addToCartButton.scrollIntoViewIfNeeded();
                await expect(addToCartButton).toBeVisible();
                await addToCartButton.click();
                console.log(`Added product: ${productName}`);

                // Close the cart after adding the product to continue shopping
                await this.closeCartButton.click();
                await this.page.waitForTimeout(300);
            }
        }
        return expectedProducts;
    }

    // Open the shopping cart
    async openCart(): Promise<void> {
        await this.cartButton.click();
        await this.page.waitForTimeout(300);
    }

    // Read all products displayed in the shopping cart
    async getProductsInCart(): Promise<Product[]> {

        // Store the products actually displayed in the shopping cart:
        const actualProducts: Product[] = [];
        const cartCount = await this.cartItems.count();
        console.log(`Products in cart: ${cartCount}`);

        for (let i = 0; i < cartCount; i++) {

            // Read the details of each product displayed in the cart
            const cartItem = this.cartItems.nth(i);
            const cartDetails = await cartItem.locator("p").allInnerTexts();
            console.log(`Cart Details: ${cartDetails}`);

            const cartProductName = cartDetails[0].trim();
            const cartProductPrice = cartDetails[2].replace(/\s+/g, "");
            const quantity = Number(cartDetails[1].match(/\d+/)?.[0]);

            // Store the product details
            actualProducts.push({
                name: cartProductName,
                price: cartProductPrice,
                quantity
            });
        }
        return actualProducts;
    }

    // Read the cart subtotal
    async getCartSubtotal(): Promise<number> {

        // Read the cart subtotal
        const subtotalText = await this.subtotal.first().innerText();
        return Number(subtotalText.replace("$", "").trim());
    }

    // Increase the quantity of the specified product in the shopping cart
    async increaseQuantity(productIndex: number, count: number = 1): Promise<void> {

        // Click the '+' button the required number of times
        for (let i = 0; i < count; i++) {
            await this.increaseQuantityButtons.nth(productIndex).click();
        }
    }

    // Increase the quantity of every product in the shopping cart
    async increaseQuantityForAllProducts(increaseBy: number): Promise<void> {

        // Get the total number of products displayed in the cart
        const productCount = await this.cartItems.count();

        // Increase the quantity of each product
        for (let productIndex = 0; productIndex < productCount; productIndex++) {
            await this.increaseQuantity(productIndex, increaseBy);
        }
    }

    // Deccrease the quantity of the specified product in the shopping cart
    async decreaseQuantity(productIndex: number, count: number = 1): Promise<void> {

        // Click the '-' button the required number of times
        for (let i = 0; i < count; i++) {
            await this.decreaseQuantityButtons.nth(productIndex).click();
        }
    }

    // Remove the specified product from the shopping cart
    async removeProduct(productIndex: number): Promise<void> {

        // Read the current products displayed in the shopping cart
        const products = await this.getProductsInCart();

        // Decrease the qunatity until only one item remains
        // If we click the '-' button 'quantity' times, the last click would fail 
        // because the application replaces the '-' button with the 'X' button
        // when the quantity reaches 1.
        if (products[productIndex].quantity > 1) {
            await this.decreaseQuantity(
                productIndex, products[productIndex].quantity - 1
            );
        }

        // Remove the remaining product from the shopping cart
        await this.removeProductButtons.nth(productIndex).click();
    }

    // Remove every product from the shopping cart
    async removeAllProducts(): Promise<void> {

        const productCount = await this.cartItems.count();

        // Remove products from last to first to avoid index shifting
        // If products are removed from first to last, the indices of the remaining products
        // shift after each removal, causing some products to be skipped.
        // Iterate from last to first to ensure every product is removed correctly.
        for (let productIndex = productCount - 1; productIndex >= 0; productIndex--) {
            await this.removeProduct(productIndex);
        }
    }

    // Decrease the quantity of every product in the shopping cart
    async decreaseQuantityForAllProducts(decreaseBy: number): Promise<void> {

        const productCount = await this.cartItems.count();

        for (let productIndex = 0; productIndex < productCount; productIndex++) {
            await this.decreaseQuantity(productIndex, decreaseBy);
        }
    }

    //Read the total number of items displayed in the shopping cart badge
    async getCartBadgeCount(): Promise<number> {
        const badgeCount = await this.cartButton.innerText();
        return Number(badgeCount);
    }

    // Close the shopping cart
    async closeCart(): Promise<void> {
        await this.closeCartButton.click();
        await this.page.waitForTimeout(300);
    }

    // Proceed to checkout
    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }
}