import { test, expect } from '../../tests/support/fixtures';
import { customer } from '../../tests/data/store';
import { numericNames, numericNameAnnotations } from '../data/numeric-names';

for (const check of numericNames) {
  test(`${check.id} Interface observa ${check.name}`, { annotation: numericNameAnnotations(check) }, async ({ store, page }, info) => {
    await store.open();
    await store.addProduct('Mochila Urbana 20L');
    await store.openCart();
    await store.checkout();
    const input = { ...customer, nome: check.value };
    await store.fillCustomer(input);
    await page.getByRole('button', { name: 'Confirmar pedido', exact: true }).click();
    const confirmation = page.getByRole('heading', { name: /^Pedido VZ-\d{6}$/ });
    const invalidName = page.getByLabel('Nome completo', { exact: true }).and(page.locator('[aria-invalid="true"]'));
    await expect(confirmation.or(invalidName)).toBeVisible();
    const accepted = await confirmation.isVisible();
    await info.attach('observacao-nome-digitos', {
      body: JSON.stringify({ entrada: input, aceitou: accepted, paginaFinal: page.url() }, null, 2),
      contentType: 'application/json',
    });
    if (accepted) await expect(page).toHaveURL(/\/pedido-confirmado$/);
    else {
      await expect(invalidName).toHaveAccessibleDescription(/Informe/);
      await expect(page).toHaveURL(/\/checkout$/);
    }
  });
}
