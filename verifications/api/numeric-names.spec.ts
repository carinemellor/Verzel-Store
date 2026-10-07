import { test, expect } from '@playwright/test';
import { customer, item } from '../../tests/data/store';
import { expectError, type ApiError } from '../../tests/support/api';
import { numericNames, numericNameAnnotations } from '../data/numeric-names';

for (const check of numericNames) {
  test(`${check.id} API observa ${check.name}`, { annotation: numericNameAnnotations(check) }, async ({ request }, info) => {
    const input = { cliente: { ...customer, nome: check.value }, itens: [item('P005')] };
    const response = await request.post('/api/pedidos', { data: input });
    const body = await response.json();
    await info.attach('observacao-nome-digitos', {
      body: JSON.stringify({ entrada: input, aceitou: response.status() === 201, response: { status: response.status(), body } }, null, 2),
      contentType: 'application/json',
    });
    expect([201, 422]).toContain(response.status());
    if (response.status() === 201) {
      expect(body.numero).toMatch(/^VZ-\d{6}$/);
      expect(body.cliente.nome).toBe(check.value);
    } else {
      expectError(body as ApiError, 'DADOS_INVALIDOS');
      expect(body.erro.campos).toContainEqual({ campo: 'cliente.nome', mensagem: expect.any(String) });
    }
  });
}
