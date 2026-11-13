/** Product slugs used by data-test attributes on the demo store. */
export const PRODUCTS = {
  backpack: { slug: 'sauce-labs-backpack', name: 'Sauce Labs Backpack' },
  bikeLight: { slug: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light' },
  onesie: { slug: 'sauce-labs-onesie', name: 'Sauce Labs Onesie' },
} as const;

export interface Post {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

export const buildPost = (overrides: Partial<Post> = {}): Post => ({
  userId: 1,
  title: `Automation post ${Date.now()}`,
  body: 'Created by the Playwright API test suite',
  ...overrides,
});
