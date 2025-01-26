import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
  }

  async searchForProduct(productName: string) {
    await this.page.waitForSelector('input[id="twotabsearchtextbox"]');
    await this.page.fill('input[id="twotabsearchtextbox"]', productName);
    await this.page.click('input[id="nav-search-submit-button"]');
  }
}
