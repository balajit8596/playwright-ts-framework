import { test, expect } from '../../src/fixtures';
import { buildPost } from '../../src/utils/testData';

test.describe('Posts API', () => {
  test('GET /posts returns a list @smoke', async ({ api }) => {
    const res = await api.get('/posts');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET /posts/1 returns the expected shape', async ({ api }) => {
    const res = await api.get('/posts/1');
    expect(res.ok()).toBeTruthy();
    expect(await res.json()).toMatchObject({
      id: 1,
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('POST /posts creates a resource', async ({ api }) => {
    const payload = buildPost();
    const res = await api.post('/posts', payload);
    expect(res.status()).toBe(201);
    expect(await res.json()).toMatchObject({ ...payload, id: expect.any(Number) });
  });

  test('PUT /posts/1 updates a resource', async ({ api }) => {
    const payload = buildPost({ id: 1, title: 'Updated title' });
    const res = await api.put('/posts/1', payload);
    expect(res.status()).toBe(200);
    expect((await res.json()).title).toBe('Updated title');
  });

  test('DELETE /posts/1 succeeds', async ({ api }) => {
    const res = await api.delete('/posts/1');
    expect(res.status()).toBe(200);
  });

  test('unknown resource returns 404', async ({ api }) => {
    const res = await api.get('/posts/999999');
    expect(res.status()).toBe(404);
  });
});
