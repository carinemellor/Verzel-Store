import { test, expect } from '@playwright/test';
import { coupons, item, type Cart } from '../data/store';
import { exchange } from '../support/api';

// Valores esperados derivados da especificação, nunca da resposta do sistema.
const calculations = [
  { id: '01', name: 'CA07 abaixo do limite sem cupom @smoke', itens: [item('P005')], subtotal: 100, desconto: 0, frete: 19.9, faltante: 100, total: 119.9 },
  { id: '02', name: 'CA01 CA09 desconto somente nos produtos @smoke', itens: [item('P005')], cupom: coupons.valid, subtotal: 100, desconto: 10, frete: 19.9, faltante: 100, total: 109.9 },
  { id: '03', name: 'CA06 abaixo do limite (199,80)', itens: [item('P001'), item('P002')], subtotal: 199.8, desconto: 0, frete: 19.9, faltante: 0.2, total: 219.7 },
  { id: '04', name: 'CA06 exatamente no limite sem cupom', itens: [item('P005', 2)], subtotal: 200, desconto: 0, frete: 0, faltante: 0, total: 200 },
  { id: '05', name: 'CA06 CA08 exatamente no limite com cupom', itens: [item('P005', 2)], cupom: coupons.valid, subtotal: 200, desconto: 20, frete: 0, faltante: 0, total: 180 },
  { id: '06', name: 'CA06 acima do limite (209,50)', itens: [item('P004', 3), item('P006', 2)], subtotal: 209.5, desconto: 0, frete: 0, faltante: 0, total: 209.5 },
  { id: '07', name: 'CA08 subtotal acima do limite e valor com desconto abaixo dele', itens: [item('P005'), item('P001'), item('P008')], cupom: coupons.valid, subtotal: 209.9, desconto: 20.99, frete: 0, faltante: 0, total: 188.91 },
  { id: '08', name: 'CA06 subtotal acima do limite @smoke', itens: [item('P007')], subtotal: 229.9, desconto: 0, frete: 0, faltante: 0, total: 229.9 },
  { id: '09', name: 'CA01 CA11 exemplo documentado com múltiplos produtos', itens: [item('P002'), item('P004', 2)], cupom: coupons.valid, subtotal: 239.7, desconto: 23.97, frete: 0, faltante: 0, total: 215.73 },
  { id: '10', name: 'CA10 aceita exatamente cinco unidades', itens: [item('P006', 5)], subtotal: 149.5, desconto: 0, frete: 19.9, faltante: 50.5, total: 169.4 },
  { id: '11', name: 'CA11 precisão decimal de subtotal, desconto e total', itens: [item('P001'), item('P006')], cupom: coupons.valid, subtotal: 89.8, desconto: 8.98, frete: 19.9, faltante: 110.2, total: 100.72 },
];

for (const scenario of calculations) {
  test(`API-C${scenario.id} ${scenario.name}`, async ({ request }, info) => {
    const body = await exchange<Cart>(request, info, 'POST', '/api/carrinho/calcular', 200, { itens: scenario.itens, cupom: scenario.cupom });
    expect.soft(body).toMatchObject({
      subtotal: scenario.subtotal,
      desconto: scenario.desconto,
      frete: scenario.frete,
      freteGratis: scenario.frete === 0,
      valorFaltanteFreteGratis: scenario.faltante,
      total: scenario.total,
    });
    expect(body.itens).toHaveLength(scenario.itens.length);
    for (const input of scenario.itens) {
      expect(body.itens).toContainEqual(expect.objectContaining(input));
    }
    for (const field of ['subtotal', 'desconto', 'frete', 'total', 'valorFaltanteFreteGratis'] as const) {
      expect.soft(body[field], `${field} deve ter precisão de centavos`).toBe(Number(body[field].toFixed(2)));
    }
    if (scenario.cupom) expect(body.cupom).toMatchObject({ codigo: coupons.valid, aplicado: true });
  });
}

for (const [index, code] of ['bemvindo10', 'BeMvInDo10', '  BEMVINDO10  ', '  bemvindo10  '].entries()) {
  test(`API-C12-${index + 1} CA02 normaliza ${JSON.stringify(code)}`, async ({ request }, info) => {
    const body = await exchange<Cart>(request, info, 'POST', '/api/carrinho/calcular', 200, { itens: [item('P005')], cupom: code });
    expect(body).toMatchObject({ desconto: 10, total: 109.9, cupom: { codigo: coupons.valid, aplicado: true } });
  });
}

for (const scenario of [
  { id: '13', code: coupons.invalid, message: 'Cupom inválido.', criterion: 'CA03' },
  { id: '14', code: coupons.expired, message: 'Cupom expirado.', criterion: 'CA04' },
]) {
  test(`API-C${scenario.id} ${scenario.criterion} calcula sem desconto e informa ${scenario.message}`, async ({ request }, info) => {
    const body = await exchange<Cart>(request, info, 'POST', '/api/carrinho/calcular', 200, { itens: [item('P005')], cupom: scenario.code });
    expect(body).toMatchObject({ desconto: 0, total: 119.9, cupom: { aplicado: false, mensagem: scenario.message } });
  });
}

test('API-C15 cálculo não mantém o cupom entre requisições', async ({ request }, info) => {
  const withCoupon = await exchange<Cart>(request, info, 'POST', '/api/carrinho/calcular', 200, { itens: [item('P005')], cupom: coupons.valid });
  expect(withCoupon.desconto).toBe(10);
  const withoutCoupon = await exchange<Cart>(request, info, 'POST', '/api/carrinho/calcular', 200, { itens: [item('P005')] });
  expect(withoutCoupon).toMatchObject({ desconto: 0, total: 119.9 });
});
