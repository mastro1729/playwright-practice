import { test, expect } from '../fixtures/baseFixture.js';
import { LoginPage } from '../Pages/LoginPage.js'
import { ResultsPage } from '../Pages/ResultsPage.js';

let searchData = [
     { searchKey: 'macbook', productName: 'MacBook Pro', imageCount: 4 },
     { searchKey: 'macbook', productName: 'MacBook Air', imageCount: 4 },
     { searchKey: 'samsung', productName: 'Samsung Galaxy Tab 10.1', imageCount: 7 },
];

for (let product of searchData) {
     test(`Verify Product Header ${product.productName}`, async ({ homePage }) => {
          
          const resultsPage: ResultsPage = await homePage.doSearch(product.searchKey);
          let productInfoPage = await resultsPage.selectTheProduct(product.productName);

          let productHeader = await productInfoPage.getProductHeader();
          expect(productHeader).toBe(product.productName);
     })
}

for (let product of searchData) {
     test(`Verify Product Image Count ${product.productName}`, async ({ homePage }) => {
          
          const resultsPage: ResultsPage = await homePage.doSearch(product.searchKey);
          let productInfoPage = await resultsPage.selectTheProduct(product.productName);

          let productImagesCount = await productInfoPage.getProductImagesCount();
          expect(productImagesCount).toBe(product.imageCount);
     })
}

test('Verify Product Metedata', async ({ homePage }) => {
    
     const resultsPage: ResultsPage = await homePage.doSearch('Macbook');
     let productInfoPage = await resultsPage.selectTheProduct('Macbook Pro');
     const actualProductDetails = await productInfoPage.getProductDetails();

     expect.soft(actualProductDetails.get('Header')).toBe('MacBook Pro');
     expect.soft(actualProductDetails.get('Brand')).toBe('Apple');
     expect.soft(actualProductDetails.get('Product Code')).toBe('Product 18');
     expect.soft(actualProductDetails.get('Reward Points')).toBe('800');
     expect.soft(actualProductDetails.get('Availability')).toBe('Out Of Stock');
})

test('Verify Product Pricedata', async ({ homePage }) => {
    
     const resultsPage: ResultsPage = await homePage.doSearch('Macbook');
     let productInfoPage = await resultsPage.selectTheProduct('Macbook Pro');
     const actualProductDetails = await productInfoPage.getProductDetails();

     expect.soft(actualProductDetails.get('Header')).toBe('MacBook Pro');
     expect.soft(actualProductDetails.get('price')).toBe('$2,000.00');
     expect.soft(actualProductDetails.get('Ex Tax')).toBe('$2,000.00');
})