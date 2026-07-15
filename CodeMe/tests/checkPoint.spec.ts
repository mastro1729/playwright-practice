import { test, expect } from "@playwright/test";

test("Check Point", async ({ page }) => {

    await page.goto("https://react-shopping-cart-67954.firebaseapp.com/", { waitUntil: "networkidle" });

    const productCards = page.locator("//div[@tabindex='1']");
    const productCount = await productCards.count();

    const expectedProducts = [];
    for (let i = 0; i < productCount; i++) {
        const productCard = productCards.nth(i);
        const productDetails = await productCard.locator("p").allInnerTexts();
        //console.table(productDetails);
        const productName = productDetails[0];
        const productPrice = productDetails[1].replace(/\s+/g, "");

        if (productPrice === "$10.90") {
            expectedProducts.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });

            const addToCartButton = productCard.locator("//button[text()='Add to cart']");
            await addToCartButton.scrollIntoViewIfNeeded();
            await expect(addToCartButton).toBeVisible();
            await addToCartButton.click();
            //console.table(productDetails);
            await page.locator("//button[span[text()='X']]").click();
            await page.waitForTimeout(300);
        }

    }
    console.table(expectedProducts);

    const subtotalText = await page.locator("//p[text()='SUBTOTAL']/following-sibling::div/p").first().innerText();
    const actualSubtotal = Number(subtotalText.replace("$", "").trim());

    await page.locator("//div[@title='Products in cart quantity']/ancestor::button").click();
    await page.waitForTimeout(500);

    const cartItems = page.locator("//div[contains(@class, 'sc-11uohgb-0')]");
    const cartCount = await cartItems.count();
    const actualProducts = [];

    for(let i=0; i<cartCount; i++) {
        const cartItem = cartItems.nth(i);
        const cartDetails = await cartItem.locator("p").allInnerTexts();
        //console.table(cartDetails);
        const cartProductName = cartDetails[0];
        const cartProductPrice = cartDetails[2].replace(/\s+/, "");
        const cartProductQuantity = Number(cartDetails[1].match(/\d+/)?.[0]);
        actualProducts.push({
            name: cartProductName,
            price: cartProductPrice,
            quantity: cartProductQuantity
        });
    }
    console.table(expectedProducts);

    const expectedSubtotal = expectedProducts.reduce(
        (total, product) => total + Number(product.price.replace("$", "")),
        0
    );       

    expect(actualProducts).toEqual(expectedProducts);
    expect(actualSubtotal).toEqual(expectedSubtotal);
});