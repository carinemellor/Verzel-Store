import { test, expect } from '../support/fixtures';
import { coupons, customer } from '../data/store';

test('UI-O01 @smoke finaliza pedido com cupom e confere confirmação e carrinho vazio', async ({ store, page }, info) => {
  await store.open();
  await store.addProduct('Mochila Urbana 20L');
  await store.openCart();
  await store.applyCoupon(coupons.valid);
  await store.checkout();
  await store.expectTotals({ subtotal: 'R$ 100,00', desconto: '- R$ 10,00', frete: 'R$ 19,90', total: 'R$ 109,90' });
  await store.fillCustomer(customer);
  const responsePromise = page.waitForResponse(response => new URL(response.url()).pathname === '/api/pedidos' && response.request().method() === 'POST');
  await page.getByRole('button', { name: 'Confirmar pedido', exact: true }).click();
  const response = await responsePromise;
  expect(response.status()).toBe(201);
  await expect(page).toHaveURL(/\/pedido-confirmado$/);
  await expect(page.getByRole('heading', { name: /^Pedido VZ-\d{6}$/ })).toBeVisible();
  await store.expectTotals({ subtotal: 'R$ 100,00', desconto: '- R$ 10,00', frete: 'R$ 19,90', total: 'R$ 109,90' });
  await expect(page.getByText('1x Mochila Urbana 20L', { exact: true })).toBeVisible();
  await info.attach('pedido-confirmado', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: /Carrinho/ }).click();
  await expect(page.getByRole('heading', { name: 'Seu carrinho está vazio', exact: true })).toBeVisible();
});

test('UI-O02 valida nome, e-mail e CEP inválidos antes de confirmar pedido', async ({ store, page }) => {
  await store.open();
  await store.addProduct('Mochila Urbana 20L');
  await store.openCart();
  await store.checkout();
  await store.fillCustomer({ nome: 'Maria', email: 'email-invalido', cep: '1234567' });
  await page.getByRole('button', { name: 'Confirmar pedido', exact: true }).click();
  await expect(page.getByText('Informe nome e sobrenome.', { exact: true })).toBeVisible();
  await expect(page.getByText('Informe um e-mail válido.', { exact: true })).toBeVisible();
  await expect(page.getByText('Informe um CEP com 8 dígitos.', { exact: true })).toBeVisible();
  for (const label of ['Nome completo', 'E-mail', 'CEP']) {
    await expect(page.getByLabel(label, { exact: true })).toHaveAttribute('aria-invalid', 'true');
  }
  await expect(page).toHaveURL(/\/checkout$/);
});

test('UI-O03 redireciona checkout com carrinho vazio para o carrinho', async ({ page }) => {
  await page.goto('/checkout');
  await expect(page).toHaveURL(/\/carrinho$/);
  await expect(page.getByRole('heading', { name: 'Seu carrinho está vazio', exact: true })).toBeVisible();
});
