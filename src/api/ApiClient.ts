import { APIRequestContext, APIResponse, test } from '@playwright/test';

/** Thin typed wrapper around Playwright's APIRequestContext. */
export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  private async send(label: string, call: () => Promise<APIResponse>): Promise<APIResponse> {
    return test.step(label, call);
  }

  get(path: string, params?: Record<string, string | number>): Promise<APIResponse> {
    return this.send(`GET ${path}`, () => this.request.get(path, { params }));
  }

  post<T extends object>(path: string, data: T): Promise<APIResponse> {
    return this.send(`POST ${path}`, () => this.request.post(path, { data }));
  }

  put<T extends object>(path: string, data: T): Promise<APIResponse> {
    return this.send(`PUT ${path}`, () => this.request.put(path, { data }));
  }

  delete(path: string): Promise<APIResponse> {
    return this.send(`DELETE ${path}`, () => this.request.delete(path));
  }
}
