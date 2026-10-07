import { test as base, expect } from '@playwright/test';
import { StorePage } from '../pages/store.page';

export const test = base.extend<{ store: StorePage; captureEvidence: void }>({
  store: async ({ page }, use) => {
    await use(new StorePage(page));
  },
  captureEvidence: [async ({ page }, use, testInfo) => {
    await use();
    // Uma evidência final também é útil nos cenários aprovados.
    if (!page.isClosed() && page.url() !== 'about:blank') {
      await testInfo.attach('estado-final-da-interface', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png',
      });
    }
  }, { auto: true }],
});

export { expect };
