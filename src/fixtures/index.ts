import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { ApiClient } from '../api/ApiClient';
import { env } from '../config/env';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  /** A page that is already logged in as the standard user. */
  loggedInInventory: InventoryPage;
  api: ApiClient;
};

/**
 * Custom fixtures: tests declare what they need and the framework
 * wires up page objects and setup, so specs stay short and readable.
 */
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),

  loggedInInventory: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(env.standardUser, env.password);
    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();
    await use(inventory);
  },

  api: async ({ request }, use) => use(new ApiClient(request)),
});

export { expect };
