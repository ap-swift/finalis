import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async validateProductDetails(productName: string, productPrice: number, quantity: number) {
    // Validate product name
    const cartProductName = await this.page.textContent('.sc-product-title');
    if (!cartProductName || !cartProductName.includes(productName)) {
      throw new Error(`Expected product name "${productName}" not found in the cart.`);
    }
  
    // Validate product price with a tolerance
    const cartProductPrice = await this.page.textContent('.sc-product-price');
    const parsedPrice = parseFloat(cartProductPrice?.replace(/[^0-9.]/g, '') || '0');
    const tolerance = 0.01; // Allow for small rounding differences
    if (Math.abs(parsedPrice - productPrice) > tolerance) {
      throw new Error(`Expected price ${productPrice}, but found ${parsedPrice} in the cart.`);
    }
  
    // Validate quantity
    const cartQuantity = await this.page.getAttribute('input[name="quantityBox"]', 'value');
    if (parseInt(cartQuantity || '0') !== quantity) {
      throw new Error(`Expected quantity ${quantity}, but found ${cartQuantity} in the cart.`);
    }
  
    // Validate subtotal
    const subtotal = await this.page.textContent('#sc-subtotal-amount-activecart');
    const parsedSubtotal = parseFloat(subtotal?.replace(/[^0-9.]/g, '') || '0');
    const expectedSubtotal = productPrice * quantity;
    if (Math.abs(parsedSubtotal - expectedSubtotal) > tolerance) {
      throw new Error(`Expected subtotal ${expectedSubtotal}, but found ${parsedSubtotal}.`);
    }
  }
  
}
