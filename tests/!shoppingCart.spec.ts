import {test, expect} from '@playwright/test';

interface Product {
    name: string;
    price: string;
    quantity: number;
}

test('Shopping Cart', async ({page}) => {

    // Navigate to the application
    await page.goto('https://react-shopping-cart-67954.firebaseapp.com/products', {waitUntil:'networkidle'});

    //Locate all product cards:
    const productCards = page.locator("//div[@tabindex='1']");
    const productCount = await productCards.count();

    console.log(`Product Count: ${productCount}`);

    // Store products that are expected to appear in the shopping cart
    const expectedProducts: Product[] = [];

    // Iterate through all product cards displayed on the page
    for(let i=0; i<productCount; i++) {
        const productCard = productCards.nth(i);
        const productDetails = await productCard.locator("p").allInnerTexts();

        const productName = productDetails[0].trim();
        const productPrice = productDetails[1].trim().replace(/\s+/g, "");

        // Add only products priced at $10.90
        if(productPrice === "$10.90") {

            expectedProducts.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });

            const addToCartButton = productCard.getByRole('button', {name: 'Add to cart'});

            await addToCartButton.scrollIntoViewIfNeeded();
            await expect(addToCartButton).toBeVisible();
            await addToCartButton.click();

            console.log(`Added product: ${productName}`);

            // Close the cart after adding the product to continue shopping
            await page.locator("//button[span='X']").click();
            await page.waitForTimeout(300);
        }
    }

    console.log("Expected Products: ", expectedProducts);

    // Open the shopping cart
    await page.locator("//div[@title='Products in cart quantity']/ancestor::button").click();
    await page.waitForTimeout(500);

    // Read all products displayed in the shopping cart
    const cartItems = page.locator("//div[contains(@class, 'sc-11uohgb-0')]");
    const cartCount = await cartItems.count();

    console.log(`Products in cart: ${cartCount}`);

    // Store the products actually displayed in the shopping cart:
    const actualProducts: Product[] = [];

    for(let i=0; i<cartCount; i++) {

        const cartItem = cartItems.nth(i);
        const cartDetails = await cartItem.locator("p").allInnerTexts();
        console.log(`Cart Details: ${cartDetails}`);

        const cartProductName = cartDetails[0].trim();
        const cartProductPrice = cartDetails[2].replace(/\s+/g, "");
        const quantity = Number(cartDetails[1].match(/\d+/)?.[0]);

        actualProducts.push({
            name: cartProductName,
            price: cartProductPrice,
            quantity
        });
    }

    console.log("Actual Products: ", actualProducts);

    // Read the cart subtotal
    const subtotalText = await page.locator("//p[text()='SUBTOTAL']/following-sibling::div/p").first().innerText();

    const actualSubtotal = Number(subtotalText.replace("$", "").trim());

    // Calculate the expected subtotal
    const expectedSubtotal = expectedProducts.reduce(
        (total, product) => total + Number(product.price.replace("$", "")),
        0
    );

    console.log(`Expected Subtotal: ${expectedSubtotal.toFixed(2)}`);
    console.log(`Actual Subtotal: ${actualSubtotal.toFixed(2)}`);
    
    // Verify that the products in the cart match the expected products
    expect(actualProducts).toEqual(expectedProducts);

    // Verify the cart subtotal
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);
});