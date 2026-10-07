import { test, expect } from '../../tests/support/fixtures';
import { customer } from '../../tests/data/store';
import { customerChecks, fieldLabels, annotations } from '../data/customer-cases';

for (const check of customerChecks) {
  test(`${check.id} Interface verifica ${check.name}`, { annotation: annotations(check) }, async ({ store, page }, info) => {
    await store.open();
    await store.addProduct('Mochila Urbana 20L');
    await store.openCart();
    await store.checkout();
    const input = { ...customer, [check.field]: check.value };
    await store.fillCustomer(input);

    const exchanges: Promise<void>[] = [];
    page.on('response', response => {
      if (new URL(response.url()).pathname !== '/api/pedidos') return;
      exchanges.push((async () => {
        await info.attach('pedido-enviado-pela-interface', {
          body: JSON.stringify({ request: { cliente: input }, response: { status: response.status(), body: await response.json() } }, null, 2),
          contentType: 'application/json',
        });
      })());
    });

    try {
      await page.getByRole('button', { name: 'Confirmar pedido', exact: true }).click();
      if (check.valid) {
        await expect(page).toHaveURL(/\/pedido-confirmado$/);
        await expect(page.getByRole('heading', { name: /^Pedido VZ-\d{6}$/ })).toBeVisible();
      } else {
        const field = page.getByLabel(fieldLabels[check.field], { exact: true });
        await expect(field).toHaveAttribute('aria-invalid', 'true');
        await expect(field).toHaveAccessibleDescription(/Informe/);
        await expect(page).toHaveURL(/\/checkout$/);
        // A validação da interface deve bloquear o envio dos dados inválidos.
        expect(exchanges).toHaveLength(0);
      }
    } finally {
      await Promise.all(exchanges);
      await info.attach('dados-da-verificacao', {
        body: JSON.stringify({ campo: check.field, entrada: input, deveAceitar: check.valid, paginaFinal: page.url() }, null, 2),
        contentType: 'application/json',
      });
    }
  });
}
