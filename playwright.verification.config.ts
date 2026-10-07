import { defineConfig, devices } from '@playwright/test';
import config from './playwright.config';

export default defineConfig({
  ...config,
  testDir: './verifications',
  outputDir: 'verification-results/artifacts',
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'verification-report', open: 'never' }],
    ['json', { outputFile: 'verification-results/results.json' }],
    ['./reporters/suggestions-reporter.ts'],
  ],
  projects: [
    { name: 'verification-api', testDir: './verifications/api', use: { extraHTTPHeaders: { Accept: 'application/json' } } },
    { name: 'verification-chromium', testDir: './verifications/ui', use: { ...devices['Desktop Chrome'], locale: 'pt-BR' } },
  ],
});
