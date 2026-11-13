import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  protected readonly path = '/cart.html';

  private readonly items: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.getByTestId('inventory-item');
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.items).toHaveCount(count);
  }

  async expectContains(name: string): Promise<void> {
    await expect(this.page.getByTestId('inventory-item-name').filter({ hasText: name })).toBeVisible();
  }

  async remove(slug: string): Promise<void> {
    await this.page.getByTestId(`remove-${slug}`).click();
  }
}
