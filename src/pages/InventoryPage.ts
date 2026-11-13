import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';

  private readonly title: Locator;
  private readonly items: Locator;
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Products');
  }

  async itemCount(): Promise<number> {
    return this.items.count();
  }

  async addToCart(slug: string): Promise<void> {
    await test.step(`Add "${slug}" to cart`, async () => {
      await this.page.getByTestId(`add-to-cart-${slug}`).click();
    });
  }

  async expectCartCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async itemPrices(): Promise<number[]> {
    const texts = await this.page.getByTestId('inventory-item-price').allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
