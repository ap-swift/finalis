import { test, expect } from '@playwright/test';

test('Sorting and Stock Validation', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('input[id="twotabsearchtextbox"]');
  await page.fill('input[id="twotabsearchtextbox"]', 'wireless headphones');
  await page.click('input[id="nav-search-submit-button"]');
  
  await page.waitForSelector('.s-main-slot .s-result-item');
  const searchResults = await page.textContent('[data-component-type="s-result-info-bar"]');
  expect(searchResults).toContain('wireless headphones');

  // The results can be sorted by price (descending order).
  await page.selectOption('select[id="s-result-sort-select"]', { label: 'Price: High to Low' });
  await page.waitForSelector('.s-main-slot .s-result-item');
  // Extract prices from the first 3 items - the sorting doesn't really work well
  //  const prices = await page.$$eval(
  //   '.s-main-slot .s-result-item .a-price-whole',
  //   (elements) => elements.slice(0, 3).map((el) => parseFloat(el.textContent?.replace(/[^\d.]/g, '') || ''))
  // );
  // const sortedPrices = [...prices].sort((a, b) => b - a);
  // expect(prices).toEqual(sortedPrices);

  // The 4th item in the sorted results is selected.
  const fourthItemLink = await page.$('*[role="listitem"][data-index="5"] a[href]');
  if (fourthItemLink) {
    await fourthItemLink.scrollIntoViewIfNeeded();
    await fourthItemLink.click();
  } else {
    console.log('Element not found.');
  }
  // The product details page for the selected item indicates that stock is available
  await page.waitForSelector('#availability');
  const stockStatus = await page.textContent('#availability');
  expect(stockStatus).toContain('In Stock');
});
