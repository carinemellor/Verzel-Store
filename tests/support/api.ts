import { expect, type APIRequestContext, type TestInfo } from '@playwright/test';

/** Anexa a troca HTTP antes das asserções, inclusive quando o servidor responde incorretamente. */
export async function exchange<T>(
  request: APIRequestContext,
  testInfo: TestInfo,
  method: 'GET' | 'POST',
  path: string,
  status: number,
  data?: unknown,
): Promise<T> {
  const response = await request.fetch(path, {
    method,
    data,
    headers: { 'Content-Type': 'application/json' },
    timeout: 15_000,
  });
  const raw = await response.text();
  await testInfo.attach(`HTTP ${method} ${path}`, {
    body: JSON.stringify({
      request: { method, path, data },
      response: { status: response.status(), headers: response.headers(), body: raw },
    }, null, 2),
    contentType: 'application/json',
  });
  expect(response.status(), `${method} ${path}: ${raw}`).toBe(status);
  expect(response.headers()['content-type']).toContain('application/json');
  return JSON.parse(raw) as T;
}

export type ApiError = {
  erro: { codigo: string; mensagem: string; campo?: string; campos?: { campo: string; mensagem: string }[] };
};

export function expectError(body: ApiError, code: string) {
  expect(body.erro).toMatchObject({ codigo: code, mensagem: expect.any(String) });
  expect(body.erro.mensagem.length).toBeGreaterThan(0);
}
