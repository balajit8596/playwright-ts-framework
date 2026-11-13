import { test, expect } from '../../src/fixtures';
import { env } from '../../src/config/env';

test.describe('Login', () => {
  test('valid user can log in @smoke', async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(env.standardUser, env.password);
    await inventoryPage.expectLoaded();
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(env.lockedUser, env.password);
    await loginPage.expectError(/locked out/i);
  });

  test('wrong password shows an error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(env.standardUser, 'wrong-password');
    await loginPage.expectError(/do not match/i);
  });

  test('empty form requires username', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('', '');
    await loginPage.expectError(/Username is required/i);
  });
});
