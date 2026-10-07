import { defineConfig } from '@playwright/test';
import config from './playwright.config';

const slowMo = Number(process.env.SLOW_MO_MS ?? 1000);
if (!Number.isFinite(slowMo) || slowMo < 0) {
  throw new Error('SLOW_MO_MS deve ser um número maior ou igual a zero.');
}

export default defineConfig({
  ...config,
  workers: 1,
  timeout: 120_000 + slowMo * 60,
  projects: config.projects
    ?.filter(project => project.name === 'chromium')
    .map(project => ({
      ...project,
      use: {
        ...project.use,
        launchOptions: { slowMo },
        // Preserva também vídeos dos cenários aprovados para revisão dos passos.
        video: { mode: 'on', size: { width: 1280, height: 720 } },
      },
    })),
});
