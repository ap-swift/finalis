import { Page } from '@playwright/test';

export class ProductDetailsPage {
  constructor(private page: Page) {}

  async validateStockAvailability() {
    await this.page.waitForSelector('#availability');
    const stockStatus = await this.page.textContent('#availability');
    return stockStatus?.includes('In Stock');
  }
}
