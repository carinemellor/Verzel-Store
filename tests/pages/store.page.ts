import { expect, type Locator, type Page } from '@playwright/test';

export class StorePage {
  constructor(readonly page: Page) {}

  async open() {
    await this.page.goto('/');
    await expect(this.page.getByRole('heading', { name: 'Camiseta Essencial', exact: true })).toBeVisible();
  }

  async addProduct(name: string, quantity = 1) {
    const card = this.page.getByRole('article', { name, exact: true });
    for (let count = 0; count < quantity; count++) {
      await card.getByRole('button', { name: 'Adicionar ao carrinho', exact: true }).click();
    }
  }

  async openCart() {
    await this.page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: /Carrinho/ }).click();
    await expect(this.page.getByRole('heading', { name: 'Carrinho', exact: true })).toBeVisible();
    await this.waitForCalculation();
  }

  async waitForCalculation() {
    // O resumo pode manter valores anteriores enquanto a API responde.
    await expect(this.page.locator('.coluna-resumo[aria-busy]')).toHaveAttribute('aria-busy', 'false');
    await expect(this.page.getByRole('region', { name: 'Resumo do pedido', exact: true })).toBeVisible();
  }

  async applyCoupon(code: string) {
    await this.page.getByLabel('Cupom de desconto', { exact: true }).fill(code);
    await this.page.getByRole('button', { name: 'Aplicar cupom', exact: true }).click();
    await expect(this.page.getByRole('button', { name: 'Remover cupom', exact: true }).or(this.page.getByRole('alert'))).toBeVisible();
    await this.waitForCalculation();
  }

  value(field: 'subtotal' | 'desconto' | 'frete' | 'total'): Locator {
    // O app fornece data-valor como contrato explícito para os valores monetários.
    return this.page.locator(`[data-valor="${field}"]`);
  }

  async expectTotals(values: { subtotal: string; desconto: string; frete: string; total: string }) {
    await Promise.all(Object.entries(values).map(([field, expected]) =>
      expect.soft(this.value(field as 'subtotal' | 'desconto' | 'frete' | 'total')).toHaveText(expected),
    ));
  }

  async checkout() {
    await this.page.getByRole('link', { name: 'Finalizar compra', exact: true }).click();
    await expect(this.page.getByRole('heading', { name: 'Finalizar compra', exact: true })).toBeVisible();
  }

  async fillCustomer(customer: { nome: string; email: string; cep: string }) {
    await this.page.getByLabel('Nome completo', { exact: true }).fill(customer.nome);
    await this.page.getByLabel('E-mail', { exact: true }).fill(customer.email);
    await this.page.getByLabel('CEP', { exact: true }).fill(customer.cep);
  }
}
