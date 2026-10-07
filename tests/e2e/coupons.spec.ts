import { test, expect } from '../support/fixtures';
import { coupons } from '../data/store';

test.beforeEach(async ({ store }) => {
  await store.open();
  await store.addProduct('Mochila Urbana 20L');
  await store.openCart();
});

test('UI-C01 @smoke CA01 CA09 aplica 10% somente sobre os produtos', async ({ store, page }) => {
  await store.applyCoupon(coupons.valid);
  await expect(page.getByText('Cupom BEMVINDO10 aplicado.', { exact: true })).toBeVisible();
  await store.expectTotals({ subtotal: 'R$ 100,00', desconto: '- R$ 10,00', frete: 'R$ 19,90', total: 'R$ 109,90' });
});

for (const [index, code] of ['bemvindo10', '  BeMvInDo10  '].entries()) {
  test(`UI-C02-${index + 1} CA02 normaliza ${JSON.stringify(code)} na interface`, async ({ store, page }) => {
    await store.applyCoupon(code);
    await expect(page.getByText('Cupom BEMVINDO10 aplicado.', { exact: true })).toBeVisible();
    await expect(store.value('desconto')).toHaveText('- R$ 10,00');
    await expect(store.value('total')).toHaveText('R$ 109,90');
  });
}

for (const scenario of [
  { id: '03', code: coupons.invalid, message: 'Cupom inválido.', criterion: 'CA03' },
  { id: '04', code: coupons.expired, message: 'Cupom expirado.', criterion: 'CA04' },
]) {
  test(`UI-C${scenario.id} ${scenario.criterion} exibe ${scenario.message} sem aplicar desconto`, async ({ store, page }) => {
    await store.applyCoupon(scenario.code);
    await expect(page.getByRole('alert')).toHaveText(scenario.message);
    await expect(page.getByLabel('Cupom de desconto', { exact: true })).toHaveAttribute('aria-invalid', 'true');
    await expect(store.value('desconto')).toHaveText('R$ 0,00');
    await expect(store.value('total')).toHaveText('R$ 119,90');
  });
}

test('UI-C05 CA05 remove o cupom antes de aplicar novamente', async ({ store, page }) => {
  await store.applyCoupon(coupons.valid);
  await expect(page.getByLabel('Cupom de desconto', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Aplicar cupom', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Remover cupom', exact: true }).click();
  await store.waitForCalculation();
  await expect(store.value('desconto')).toHaveText('R$ 0,00');
  await expect(store.value('total')).toHaveText('R$ 119,90');
  await store.applyCoupon(coupons.valid);
  await expect(store.value('desconto')).toHaveText('- R$ 10,00');
  await expect(store.value('total')).toHaveText('R$ 109,90');
});

test('UI-C06 impede aplicação de cupom em branco', async ({ page, store }) => {
  await page.getByLabel('Cupom de desconto', { exact: true }).fill('   ');
  await page.getByRole('button', { name: 'Aplicar cupom', exact: true }).click();
  await expect(page.getByRole('alert')).toHaveText('Informe um cupom.');
  await expect(store.value('desconto')).toHaveText('R$ 0,00');
});
