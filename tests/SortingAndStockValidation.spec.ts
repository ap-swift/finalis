import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

test('Sorting and Stock Validation', async ({ page }) => {
  // Initialize page objects
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  // Test steps
  await homePage.navigate();
  await homePage.searchForProduct('wireless headphones');

  const isSearchValid = await searchResultsPage.validateSearchResults('wireless headphones');
  expect(isSearchValid).toBeTruthy();

  await searchResultsPage.sortByPriceDescending();
  await searchResultsPage.selectFourthItem();

  const isStockAvailable = await productDetailsPage.validateStockAvailability();
  expect(isStockAvailable).toBeTruthy();
});
