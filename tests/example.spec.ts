import { test, expect } from '@playwright/test';

test('Sorting and Stock Validation', async ({ page }) => {
  await page.goto('https://www.amazon.com/');

  await page.waitForSelector('input[id="twotabsearchtextbox"]');
  await page.fill('input[id="twotabsearchtextbox"]', 'wireless headphones');
  await page.click('input[id="nav-search-submit-button"]');
  
  await page.waitForSelector('.s-main-slot .s-result-item');
  const searchResults = await page.textContent('.s-main-slot');
  expect(searchResults).toContain('wireless headphones');
  
  await page.selectOption('select[id="s-result-sort-select"]', { label: 'Price: High to Low' });

  await page.waitForTimeout(500);
  await page.waitForSelector('.s-main-slot .s-result-item');
});
