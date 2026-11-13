import { test, expect } from '../../src/fixtures';
import { PRODUCTS } from '../../src/utils/testData';

test.describe('Cart', () => {
  test('add item updates the badge and cart contents @smoke', async ({ loggedInInventory, cartPage }) => {
    await loggedInInventory.addToCart(PRODUCTS.backpack.slug);
    await loggedInInventory.expectCartCount(1);

    await loggedInInventory.openCart();
    await cartPage.expectItemCount(1);
    await cartPage.expectContains(PRODUCTS.backpack.name);
  });

  test('can add multiple items and remove one', async ({ loggedInInventory, cartPage }) => {
    await loggedInInventory.addToCart(PRODUCTS.backpack.slug);
    await loggedInInventory.addToCart(PRODUCTS.bikeLight.slug);
    await loggedInInventory.expectCartCount(2);

    await loggedInInventory.openCart();
    await cartPage.remove(PRODUCTS.backpack.slug);
    await cartPage.expectItemCount(1);
    await cartPage.expectContains(PRODUCTS.bikeLight.name);
  });
});

test.describe('Inventory', () => {
  test('lists products and sorts by price low to high', async ({ loggedInInventory }) => {
    expect(await loggedInInventory.itemCount()).toBeGreaterThan(0);

    await loggedInInventory.sortBy('lohi');
    const prices = await loggedInInventory.itemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
});
