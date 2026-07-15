import { Product } from "../models/Product";

export class ShoppingCartUtils {

    // Calculate the cart subtotal based on product price and quantity
    static calculateSubtotal(products: Product[]): number {

        return products.reduce((total, product) => {

            return total + Number(product.price.replace("$", "")) * product.quantity;

        }, 0);
    }

    // Update the expected quantity for a specific product
    static updateProductQuantity(products: Product[], productIndex: number, increaseBy: number): void {
        products[productIndex].quantity += increaseBy;
    }

    // Update the expected quantity for all products
    static updateAllProductsQuantity(products: Product[], increaseBy: number): void {

        for (const product of products) {
            product.quantity += increaseBy;
        }
    }

    // Remove the expected product from the shopping cart
    static removeExpectedProduct(products: Product[], productIndex: number): void {

        products.splice(productIndex, 1);
    }

    // Calculate the total quantity of all products
    static calculateTotalQunatity(products: Product[]): number {

        return products.reduce((total, product) => {

            return total + product.quantity;

        }, 0);
    }
}