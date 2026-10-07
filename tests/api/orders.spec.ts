import { test, expect } from '@playwright/test';
import { coupons, customer, item, type Order } from '../data/store';
import { exchange, expectError, type ApiError } from '../support/api';

for (const [index, cep] of ['01310-100', '01310100'].entries()) {
  test(`API-O01-${index + 1} @smoke confirma pedido e normaliza CEP ${cep}`, async ({ request }, info) => {
    const body = await exchange<Order>(request, info, 'POST', '/api/pedidos', 201, { cliente: { ...customer, cep }, itens: [item('P005')], cupom: coupons.valid });
    expect(body.numero).toMatch(/^VZ-\d{6}$/);
    expect(new Date(body.criadoEm).toISOString()).toBe(body.criadoEm);
    expect(body).toMatchObject({
      cliente: { ...customer, cep: '01310100' },
      subtotal: 100, desconto: 10, frete: 19.9, freteGratis: false, valorFaltanteFreteGratis: 100, total: 109.9,
      cupom: { codigo: coupons.valid, aplicado: true },
      itens: [{ produtoId: 'P005', nome: 'Mochila Urbana 20L', precoUnitario: 100, quantidade: 1, total: 100 }],
    });
  });
}

test('API-O02 CA06 CA08 pedido preserva frete grátis com subtotal 200 e cupom', async ({ request }, info) => {
  const body = await exchange<Order>(request, info, 'POST', '/api/pedidos', 201, { cliente: customer, itens: [item('P005', 2)], cupom: coupons.valid });
  expect(body).toMatchObject({ subtotal: 200, desconto: 20, frete: 0, freteGratis: true, total: 180 });
});

for (const scenario of [
  { id: '03', code: coupons.invalid, error: 'CUPOM_INVALIDO' },
  { id: '04', code: coupons.expired, error: 'CUPOM_EXPIRADO' },
]) {
  test(`API-O${scenario.id} bloqueia pedido com ${scenario.code}`, async ({ request }, info) => {
    const body = await exchange<ApiError>(request, info, 'POST', '/api/pedidos', 422, { cliente: customer, itens: [item('P005')], cupom: scenario.code });
    expectError(body, scenario.error);
  });
}

for (const [index, scenario] of [
  { field: 'nome', value: 'Maria' },
  { field: 'email', value: 'email-invalido' },
  { field: 'cep', value: '1234567' },
].entries()) {
  test(`API-O05-${index + 1} rejeita ${scenario.field} inválido com detalhes de campo`, async ({ request }, info) => {
    const body = await exchange<ApiError>(request, info, 'POST', '/api/pedidos', 422, { cliente: { ...customer, [scenario.field]: scenario.value }, itens: [item('P005')] });
    expectError(body, 'DADOS_INVALIDOS');
    expect(body.erro.campos).toContainEqual({ campo: `cliente.${scenario.field}`, mensagem: expect.any(String) });
  });
}
