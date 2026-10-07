import { mkdirSync, writeFileSync } from 'node:fs';
import type { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';

export default class ExecutionReporter implements Reporter {
  private rows: { projeto: string; cenario: string; resultado: string; duracaoMs: number; tentativa: number }[] = [];

  onTestEnd(test: TestCase, result: TestResult) {
    this.rows.push({
      projeto: test.parent.project()?.name || '',
      cenario: test.title,
      resultado: result.status,
      duracaoMs: result.duration,
      tentativa: result.retry + 1,
    });
  }

  onEnd(result: FullResult) {
    if (this.rows.length === 0) return; // A listagem não substitui os resultados de uma execução.
    mkdirSync('test-results', { recursive: true });
    const metadata = {
      inicio: result.startTime.toISOString(),
      fuso: 'America/Sao_Paulo',
      status: result.status,
      duracaoMs: result.duration,
      node: process.version,
      baseURL: process.env.BASE_URL || 'https://verzel-store.qa-test-verzel-store.workers.dev',
      resultados: this.rows,
    };
    writeFileSync('test-results/execution.json', JSON.stringify(metadata, null, 2));
    const rows = [...this.rows].sort((a, b) => a.cenario.localeCompare(b.cenario));
    writeFileSync('test-results/execution.md', [
      '# Resultado da execução automatizada', '',
      `Início: ${result.startTime.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })} (America/Sao_Paulo).`,
      `Status: **${result.status}**. Duração: ${(result.duration / 1000).toFixed(1)} s.`, '',
      '| Projeto | Cenário | Resultado | Duração (ms) | Tentativa |',
      '| --- | --- | --- | ---: | ---: |',
      ...rows.map(row => `| ${row.projeto} | ${row.cenario.replaceAll('|', '\\|')} | ${row.resultado} | ${row.duracaoMs} | ${row.tentativa} |`), '',
      'Resultados obtidos pela suíte automatizada. A execução manual possui registro separado em testes-manuais/execucao.md.', '',
    ].join('\n'));
  }
}
