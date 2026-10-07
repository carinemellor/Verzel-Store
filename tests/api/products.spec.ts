import { test, expect } from '@playwright/test';
import { products } from '../data/store';
import { exchange, expectError, type ApiError } from '../support/api';

test('API-P01 @smoke lista o catálogo fixo com tipos, preços e IDs únicos', async ({ request }, info) => {
  const body = await exchange<(typeof products[number] & { descricao: string; categoria: string })[]>(request, info, 'GET', '/api/produtos', 200);
  expect(body).toHaveLength(products.length);
  expect(new Set(body.map(product => product.id)).size).toBe(products.length);
  for (const product of products) {
    expect(body).toContainEqual(expect.objectContaining(product));
  }
  for (const product of body) {
    expect(product).toMatchObject({ descricao: expect.any(String), categoria: expect.any(String) });
    expect(product.preco).toBeGreaterThan(0);
  }
});

for (const product of products) {
  test(`API-P02-${product.id} consulta ${product.id} e valida seu contrato`, async ({ request }, info) => {
    const body = await exchange(request, info, 'GET', `/api/produtos/${product.id}`, 200);
    expect(body).toMatchObject({ ...product, descricao: expect.any(String), categoria: expect.any(String) });
  });
}

test('API-P03 produto inexistente responde 404', async ({ request }, info) => {
  const body = await exchange<ApiError>(request, info, 'GET', '/api/produtos/INEXISTENTE', 404);
  expectError(body, 'PRODUTO_NAO_ENCONTRADO');
});

test('API-P04 rota inexistente responde 404', async ({ request }, info) => {
  const body = await exchange<ApiError>(request, info, 'GET', '/api/rota-inexistente', 404);
  expectError(body, 'ROTA_NAO_ENCONTRADA');
});

test('API-P05 método não permitido responde 405', async ({ request }, info) => {
  const body = await exchange<ApiError>(request, info, 'POST', '/api/produtos', 405, {});
  expectError(body, 'METODO_NAO_PERMITIDO');
});
