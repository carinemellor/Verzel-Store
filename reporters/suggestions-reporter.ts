import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import type { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';

type Entry = { test: TestCase; result: TestResult };

export default class SuggestionsReporter implements Reporter {
  private entries = new Map<string, Entry>();

  onTestEnd(test: TestCase, result: TestResult) {
    this.entries.set(test.id, { test, result });
  }

  onEnd(fullResult: FullResult) {
    const entries = [...this.entries.values()].sort((a, b) => a.test.title.localeCompare(b.test.title));
    if (entries.length === 0) return; // --list não substitui uma execução real.
    const failures = entries.filter(({ result }) => ['failed', 'timedOut', 'interrupted'].includes(result.status));
    const infrastructure = failures.filter(({ result }) => result.errors.some(error =>
      /ENOTFOUND|EHOSTUNREACH|ECONNREFUSED|ETIMEDOUT|ERR_NAME_NOT_RESOLVED|browserType\.launch|Executable doesn't exist/.test(error.message || ''),
    ));
    const run = fullResult.startTime.toISOString().replaceAll(':', '-');
    const suggestionsRoot = 'testes-exploratorios';
    const folder = path.join(suggestionsRoot, run);
    const suggestions = new Map<string, Entry[]>();
    const observations = entries.filter(({ result }) => result.status === 'passed' && result.attachments.some(attachment =>
      attachment.name === 'observacao-nome-digitos' && attachment.body && JSON.parse(attachment.body.toString()).aceitou === true,
    ));
    for (const entry of [...failures, ...observations]) {
      // Falhas do ambiente não são sugestões sobre regras de negócio da loja.
      if (infrastructure.includes(entry)) continue;
      const id = entry.test.annotations.find(a => a.type === 'verificacao')?.description || entry.test.id;
      suggestions.set(id, [...(suggestions.get(id) || []), entry]);
    }

    for (const [id, items] of suggestions) {
      mkdirSync(path.join(folder, 'evidencias'), { recursive: true });
      const annotation = (type: string) => items[0].test.annotations.find(a => a.type === type)?.description || '';
      const lines = [
        `# Sugestão de revisão — ${id}`, '',
        ...(annotation('classificacao') ? [`Classificação: ${annotation('classificacao')}`, ''] : []),
        `Regra verificada: ${annotation('regra')}`, '',
        `Entrada: \`${annotation('entrada')}\`.`, '',
        `Esperado: ${annotation('esperado')}`, '',
        `Sugestão: ${annotation('sugestao')}`, '',
        'Reprodução: adicionar uma mochila, abrir o checkout, manter os outros campos válidos e preencher o campo indicado com a entrada acima. Na API, enviar esses dados com P005 × 1 para POST /api/pedidos.', '',
        'Verificação complementar às regras da entrega VZS-142. A classificação considera o requisito e as evidências observadas. Falhas de rede ou navegador são registradas como problemas de execução.', '',
      ];
      for (const { test, result } of items) {
        const project = test.parent.project()?.name || '';
        lines.push(`## ${project}`, '', `Resultado: ${result.status}.`, '',
          ...(result.errors.length ? ['Erros observados:', '', '```text',
            ...result.errors.map(error => (error.message || '').replace(/\u001b\[[0-9;]*m/g, '')), '```', ''] : [
            'Observado: o nome com dígitos foi aceito e o pedido foi confirmado. A observação passou porque registra o comportamento, sem impor uma restrição ausente da especificação.', '',
          ]), 'Evidências:', '');
        let counter = 0;
        for (const attachment of result.attachments) {
          if (!['application/json', 'image/png'].includes(attachment.contentType)) continue;
          const ext = attachment.contentType === 'image/png' ? 'png' : 'json';
          const filename = `${id}-${project}-${++counter}.${ext}`;
          const destination = path.join(folder, 'evidencias', filename);
          if (attachment.path) copyFileSync(attachment.path, destination);
          else if (attachment.body) writeFileSync(destination, attachment.body);
          else continue;
          lines.push(`- [${attachment.name}](evidencias/${filename})`);
        }
        lines.push('');
      }
      writeFileSync(path.join(folder, `${id}.md`), lines.join('\n'));
    }

    mkdirSync(suggestionsRoot, { recursive: true });
    const passed = entries.filter(({ result }) => result.status === 'passed').length;
    writeFileSync(path.join(suggestionsRoot, 'testes-complementares.md'), [
      '# Verificação complementar — última execução', '',
      `Início: ${fullResult.startTime.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })} (America/Sao_Paulo).`, '',
      `**${entries.length} verificações: ${passed} aprovadas, ${failures.length} com erro.** Status da execução: ${fullResult.status}.`, '',
      'Estas verificações estão separadas dos cenários e resultados da entrega VZS-142.', '',
      '## Sugestões desta execução', '',
      ...(suggestions.size ? [...suggestions.keys()].map(id => `- [${id}](${run}/${id}.md)`) : [
        failures.length ? 'Execução com erros; não há sugestões funcionais confirmadas.' : 'Nenhuma divergência foi encontrada nas verificações executadas.',
      ]), '',
      ...(infrastructure.length ? [`${infrastructure.length} verificações tiveram erro de infraestrutura e precisam ser executadas novamente.`, ''] : []),
      '## Resultado de cada verificação', '',
      '| Verificação | Resultado |', '| --- | --- |',
      ...entries.map(({ test, result }) => `| ${test.title} | ${result.status} |`), '',
    ].join('\n'));
  }
}
