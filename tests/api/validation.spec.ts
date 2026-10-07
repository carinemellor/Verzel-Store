import { test } from '@playwright/test';
import { customer, item } from '../data/store';
import { exchange, expectError, type ApiError } from '../support/api';

const invalidItems = [
  { id: '01', name: 'itens ausentes', data: {}, code: 'ITENS_OBRIGATORIOS' },
  { id: '02', name: 'itens vazios', data: { itens: [] }, code: 'ITENS_OBRIGATORIOS' },
  { id: '03', name: 'item nulo', data: { itens: [null] }, code: 'ITEM_INVALIDO' },
  { id: '04', name: 'produto inexistente', data: { itens: [item('INEXISTENTE')] }, code: 'PRODUTO_NAO_ENCONTRADO' },
  { id: '05', name: 'produto duplicado', data: { itens: [item('P005'), item('P005')] }, code: 'ITEM_DUPLICADO' },
  { id: '06', name: 'quantidade zero', data: { itens: [item('P005', 0)] }, code: 'QUANTIDADE_INVALIDA' },
  { id: '07', name: 'quantidade negativa', data: { itens: [item('P005', -1)] }, code: 'QUANTIDADE_INVALIDA' },
  { id: '08', name: 'quantidade fracionária', data: { itens: [item('P005', 1.5)] }, code: 'QUANTIDADE_INVALIDA' },
  { id: '09', name: 'quantidade como texto', data: { itens: [{ produtoId: 'P005', quantidade: '1' }] }, code: 'QUANTIDADE_INVALIDA' },
  { id: '10', name: 'CA10 seis unidades', data: { itens: [item('P005', 6)] }, code: 'QUANTIDADE_MAXIMA_EXCEDIDA' },
];

for (const [routeId, path] of [['C', '/api/carrinho/calcular'], ['O', '/api/pedidos']] as const) {
  for (const scenario of invalidItems) {
    test(`API-V${routeId}${scenario.id} rejeita ${scenario.name} em ${path}`, async ({ request }, info) => {
      const body = await exchange<ApiError>(request, info, 'POST', path, 422, { cliente: customer, ...scenario.data });
      expectError(body, scenario.code);
    });
  }

  for (const [index, raw] of ['{', 'null', '[]', '"texto"'].entries()) {
    test(`API-J${routeId}${index + 1} corpo JSON inválido ${raw} em ${path}`, async ({ request }, info) => {
      const body = await exchange<ApiError>(request, info, 'POST', path, 400, raw);
      expectError(body, 'JSON_INVALIDO');
    });
  }

  test(`API-M${routeId} método GET não permitido em ${path}`, async ({ request }, info) => {
    const body = await exchange<ApiError>(request, info, 'GET', path, 405);
    expectError(body, 'METODO_NAO_PERMITIDO');
  });
}
