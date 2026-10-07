import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import path from 'node:path';

// Rodar apenas após uma execução completa: publica uma amostra revisável dentro de docs.
const report = JSON.parse(readFileSync('test-results/results.json', 'utf8'));
const execution = JSON.parse(readFileSync('test-results/execution.json', 'utf8'));
const tests = [];
function visit(suites) {
  for (const suite of suites) {
    for (const spec of suite.specs || []) {
      for (const test of spec.tests) tests.push({ title: spec.title, ...test });
    }
    visit(suite.suites || []);
  }
}
visit(report.suites);
if (new Set(tests.map(test => test.projectName)).size !== 2 || tests.length < 86) {
  throw new Error('Execute npm test completo antes de gerar o snapshot: são esperados os projetos api e chromium.');
}

const destination = 'docs/evidencias';
mkdirSync(destination, { recursive: true });
const evidenceRows = [];
const failedRows = [];
for (const test of tests) {
  const id = test.title.split(' ')[0];
  const result = test.results.at(-1);
  const links = [];
  let counter = 0;
  for (const attachment of result.attachments || []) {
    // Traces e vídeos permanecem no HTML/CI; o Git recebe PNGs e trocas JSON menores.
    if (!['image/png', 'application/json'].includes(attachment.contentType)) continue;
    counter++;
    const extension = attachment.contentType === 'image/png' ? 'png' : 'json';
    const filename = `${id}-${String(counter).padStart(2, '0')}.${extension}`;
    const target = path.join(destination, filename);
    if (attachment.path) copyFileSync(attachment.path, target);
    else if (attachment.body) {
      const content = Buffer.from(attachment.body, 'base64');
      if (extension === 'json') {
        const data = JSON.parse(content.toString('utf8'));
        if (data.response?.body) {
          try { data.response.body = JSON.parse(data.response.body); } catch { /* Preserva texto inválido. */ }
        }
        writeFileSync(target, JSON.stringify(data, null, 2) + '\n');
      } else writeFileSync(target, content);
    } else continue;
    links.push(`[${attachment.name}](evidencias/${filename})`);
  }
  evidenceRows.push(`| ${id} | ${test.projectName} | ${result.status} | ${links.join('<br>')} |`);
  if (result.status === 'failed') {
    const bug = ['API-C04', 'API-C05', 'API-O02', 'UI-F02', 'UI-F03', 'UI-F04'].includes(id)
      ? 'BUG-001'
      : ['API-VC10', 'API-VO10'].includes(id) ? 'BUG-002' : 'Revisar';
    failedRows.push(`| ${bug} | ${id} | ${test.projectName} | ${links.join('<br>')} |`);
  }
}

writeFileSync(path.join(destination, 'execution.json'), JSON.stringify(execution, null, 2) + '\n');
copyFileSync('test-results/execution.md', 'docs/execucao.md');
const started = new Date(report.stats.startTime).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
writeFileSync('docs/evidencias.md', [
  '# Evidências de execução', '',
  `Execução real em **${started} (America/Sao_Paulo)**. Playwright ${report.config.version}; ${execution.node}; Chromium desktop e API HTTP.`, '',
  `Resultado: **${report.stats.expected} aprovados, ${report.stats.unexpected} reprovados, ${report.stats.skipped} ignorados e ${report.stats.flaky} instáveis**.`, '',
  'As reprovações da aplicação estão relacionadas no [relatório de bugs](bugs.md). As expectativas seguem a especificação.', '',
  'Este snapshot registra a execução completa acima. Novas execuções escrevem em `test-results/` e `playwright-report/`, sem alterar automaticamente esta entrega. Para atualizar conscientemente: `npm run evidence` após `npm test`.', '',
  'O relatório HTML local (`npm run report`) e o artefato do GitHub Actions contêm traces, vídeos e contexto das falhas. Os arquivos menores abaixo ficam versionados para consulta direta pelo avaliador.', '',
  'Os JSONs HTTP incluem método, caminho, payload, status e resposta. Os screenshots mostram o estado final dos testes; UI-O01 possui também uma imagem da confirmação antes de consultar o carrinho vazio.', '',
  '| Cenário | Camada | Resultado | Evidências |',
  '| --- | --- | --- | --- |',
  ...evidenceRows.sort(), '',
  '## Testes reprovados', '',
  `Abaixo estão os ${failedRows.length} cenários reprovados, agrupados pelos defeitos registrados em [bugs](bugs.md).`, '',
  '| Defeito | Cenário | Camada | Evidências |',
  '| --- | --- | --- | --- |',
  ...failedRows.sort().map(row => row.replace(/^\| (BUG-\d+|Revisar) \| ([^|]+) \|/, '| $1 | $2 |')),
  '',
].join('\n'));
console.log(`Snapshot gerado: ${tests.length} cenários em docs/execucao.md e docs/evidencias.md.`);
