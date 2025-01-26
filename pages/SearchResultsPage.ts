import { Page } from '@playwright/test';

export class SearchResultsPage {
  constructor(private page: Page) {}

  async validateSearchResults(keyword: string) {
    await this.page.waitForSelector('.s-main-slot .s-result-item');
    const searchResults = await this.page.textContent('[data-component-type="s-result-info-bar"]');
    return searchResults?.includes(keyword);
  }

  async sortByPriceDescending() {
    await this.page.selectOption('select[id="s-result-sort-select"]', { label: 'Price: High to Low' });
    await this.page.waitForSelector('.s-main-slot .s-result-item');
  }

  async selectFourthItem() {
    const fourthItemLink = await this.page.$('*[role="listitem"][data-index="5"] a[href]');
    if (fourthItemLink) {
      await fourthItemLink.scrollIntoViewIfNeeded();
      await fourthItemLink.click();
    } else {
      throw new Error('Fourth item not found.');
    }
  }
}
