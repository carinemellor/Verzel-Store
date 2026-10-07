import { test, expect } from '@playwright/test';
import { customer, item, type Order } from '../../tests/data/store';
import { exchange, expectError, type ApiError } from '../../tests/support/api';
import { customerChecks, annotations } from '../data/customer-cases';

for (const check of customerChecks) {
  test(`${check.id} API verifica ${check.name}`, { annotation: annotations(check) }, async ({ request }, info) => {
    const input = { ...customer, [check.field]: check.value };
    const data = { cliente: input, itens: [item('P005')] };
    if (check.valid) {
      const body = await exchange<Order>(request, info, 'POST', '/api/pedidos', 201, data);
      expect(body.numero).toMatch(/^VZ-\d{6}$/);
      expect(body.cliente).toEqual({ ...input, cep: input.cep.replace('-', '') });
    } else {
      const body = await exchange<ApiError>(request, info, 'POST', '/api/pedidos', 422, data);
      expectError(body, 'DADOS_INVALIDOS');
      expect(body.erro.campos).toContainEqual({ campo: `cliente.${check.field}`, mensagem: expect.any(String) });
    }
  });
}
