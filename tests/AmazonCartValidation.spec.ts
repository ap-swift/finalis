import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';

test('Amazon Cart Validation', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);
  const productDetailsPage = new ProductDetailsPage(page);
  const cartPage = new CartPage(page);

  // Navigate to Amazon home page and search for a product
  await homePage.navigate();
  await homePage.searchForProduct('wireless headphones');

  // Validate search results and select the first product
  const isSearchValid = await searchResultsPage.validateSearchResults('wireless headphones');
  expect(isSearchValid).toBeTruthy();

  await searchResultsPage.selectFourthItem();

  // Get product details from the product page
  const productName = await page.textContent('#productTitle');
  const productPriceText = await page.textContent('.a-price .a-offscreen');
  const productPrice = parseFloat(productPriceText?.replace(/[^0-9.]/g, '') || '0');
  console.log("productName", productName)
  console.log("productPriceText", productPriceText)
  console.log("productPrice", productPrice)

  // Add the product to the cart
  await productDetailsPage.addToCart();

  // Go to the cart page
  await page.click('#nav-cart');

  // Validate the cart
  await cartPage.validateProductDetails(productName!.trim(), productPrice, 1);
});
