import { test, expect } from '../support/fixtures';
import { coupons } from '../data/store';

test('UI-F01 @smoke CA07 cobra frete fixo e informa valor faltante', async ({ store, page }) => {
  await store.open();
  await store.addProduct('Mochila Urbana 20L');
  await store.openCart();
  await store.expectTotals({ subtotal: 'R$ 100,00', desconto: 'R$ 0,00', frete: 'R$ 19,90', total: 'R$ 119,90' });
  await expect(page.getByText('Faltam R$ 100,00 para o frete grátis.', { exact: true })).toBeVisible();
});

test('UI-F02 CA06 oferece frete grátis exatamente em R$ 200,00', async ({ store, page }) => {
  await store.open();
  await store.addProduct('Mochila Urbana 20L', 2);
  await store.openCart();
  await store.expectTotals({ subtotal: 'R$ 200,00', desconto: 'R$ 0,00', frete: 'Grátis', total: 'R$ 200,00' });
  await expect(page.getByText(/Faltam .* para o frete grátis\./)).toHaveCount(0);
});

test('UI-F03 CA08 mantém frete grátis ao aplicar cupom no subtotal 200', async ({ store }) => {
  await store.open();
  await store.addProduct('Mochila Urbana 20L', 2);
  await store.openCart();
  await store.applyCoupon(coupons.valid);
  await store.expectTotals({ subtotal: 'R$ 200,00', desconto: '- R$ 20,00', frete: 'Grátis', total: 'R$ 180,00' });
});

test('UI-F04 CA08 recalcula frete e cupom ao aumentar a quantidade', async ({ store, page }) => {
  await store.open();
  await store.addProduct('Mochila Urbana 20L');
  await store.openCart();
  await store.applyCoupon(coupons.valid);
  await page.getByRole('button', { name: 'Aumentar quantidade de Mochila Urbana 20L', exact: true }).click();
  await store.waitForCalculation();
  await store.expectTotals({ subtotal: 'R$ 200,00', desconto: '- R$ 20,00', frete: 'Grátis', total: 'R$ 180,00' });
});

test('UI-F05 @smoke CA10 limita cinco unidades na vitrine e no carrinho', async ({ store, page }) => {
  await store.open();
  await store.addProduct('Kit 3 Pares de Meias', 5);
  const product = page.getByRole('article', { name: 'Kit 3 Pares de Meias', exact: true });
  await expect(product.getByRole('button', { name: 'Adicionar ao carrinho', exact: true })).toBeDisabled();
  await expect(product.getByText('Limite de 5 unidades atingido.', { exact: true })).toBeVisible();
  await store.openCart();
  await expect(page.getByRole('status', { name: 'Quantidade de Kit 3 Pares de Meias', exact: true })).toHaveText('5');
  await expect(page.getByRole('button', { name: 'Aumentar quantidade de Kit 3 Pares de Meias', exact: true })).toBeDisabled();
  await expect(store.value('subtotal')).toHaveText('R$ 149,50');
  await page.getByRole('button', { name: 'Diminuir quantidade de Kit 3 Pares de Meias', exact: true }).click();
  await store.waitForCalculation();
  await expect(page.getByRole('button', { name: 'Aumentar quantidade de Kit 3 Pares de Meias', exact: true })).toBeEnabled();
  await expect(store.value('subtotal')).toHaveText('R$ 119,60');
});

test('UI-F06 remove o último produto e permite adicionar um novo item', async ({ store, page }, info) => {
  await store.open();
  await store.addProduct('Mochila Urbana 20L');
  await store.openCart();
  await store.applyCoupon(coupons.valid);
  await page.getByRole('button', { name: 'Remover Mochila Urbana 20L do carrinho', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Seu carrinho está vazio', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Ver produtos', exact: true }).click();
  await store.addProduct('Mochila Urbana 20L');
  await store.openCart();
  await expect(store.value('subtotal')).toHaveText('R$ 100,00');
  // A especificação não define se remover o último item deve limpar o cupom.
  // Registra-se o resultado observado, sem transformar a ambiguidade em defeito.
  await info.attach('observacao-cupom-apos-remover-ultimo-item', {
    body: JSON.stringify({ desconto: await store.value('desconto').innerText() }),
    contentType: 'application/json',
  });
});

test('UI-F07 ambiente preserva a mesma aba e isola uma nova aba', async ({ store, page, context }) => {
  await store.open();
  await store.addProduct('Mochila Urbana 20L');
  await store.openCart();
  await store.applyCoupon(coupons.valid);
  await page.reload();
  await store.waitForCalculation();
  await expect(store.value('subtotal')).toHaveText('R$ 100,00');
  await expect(store.value('desconto')).toHaveText('- R$ 10,00');
  const otherTab = await context.newPage();
  try {
    await otherTab.goto('/carrinho');
    await expect(otherTab.getByRole('heading', { name: 'Seu carrinho está vazio', exact: true })).toBeVisible();
  } finally {
    await otherTab.close();
  }
});

test('UI-F08 esvazia o carrinho e remove o cupom aplicado', async ({ store, page }) => {
  await store.open();
  await store.addProduct('Mochila Urbana 20L');
  await store.openCart();
  await store.applyCoupon(coupons.valid);
  await page.getByRole('button', { name: 'Esvaziar carrinho', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Seu carrinho está vazio', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Ver produtos', exact: true }).click();
  await store.addProduct('Mochila Urbana 20L');
  await store.openCart();
  await expect(store.value('desconto')).toHaveText('R$ 0,00');
  await expect(page.getByLabel('Cupom de desconto', { exact: true })).toBeVisible();
});
