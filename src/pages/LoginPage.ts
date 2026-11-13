import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  protected readonly path = '/';

  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async login(user: string, pass: string): Promise<void> {
    await test.step(`Login as ${user}`, async () => {
      await this.username.fill(user);
      await this.password.fill(pass);
      await this.loginButton.click();
    });
  }

  async expectError(text: string | RegExp): Promise<void> {
    await expect(this.errorMessage).toContainText(text);
  }
}
