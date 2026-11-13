import { Page, expect, test } from '@playwright/test';

/** Shared behaviour for every page object. */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected abstract readonly path: string;

  async open(): Promise<void> {
    await test.step(`Open ${this.path}`, async () => {
      await this.page.goto(this.path);
    });
  }

  async expectUrlToContain(fragment: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }
}
