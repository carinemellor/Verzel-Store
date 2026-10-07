# Verzel Store — Teste técnico QA Júnior

Automação de interface e API com **Playwright e TypeScript** para a entrega **VZS-142 — Cupom de desconto e frete grátis**, versão 2.3.0.

## Resultado da execução

**86 testes executados: 78 aprovados e 8 reprovados**, sem ignorados. São **68 testes de API e 18 de interface** no Chromium. As oito reprovações reproduzem dois defeitos da aplicação:

- **BUG-001:** frete de R$ 19,90 cobrado quando o subtotal é exatamente R$ 200,00, com ou sem cupom; o problema também aparece na confirmação via API.
- **BUG-002:** cálculo e criação de pedido aceitam seis unidades do mesmo produto, apesar do limite de cinco.

Detalhes em [bugs](docs/bugs.md), [resultados individuais](docs/execucao.md) e [evidências](docs/evidencias.md). `npm test` retorna código 1 enquanto esses defeitos persistirem. As expectativas seguem os critérios de aceite e não foram alteradas para aprovar comportamentos incorretos.

## Entregas

| Entrega | Local |
| --- | --- |
| Escopo, riscos, estratégia e interpretações | [docs/plano-de-testes.md](docs/plano-de-testes.md) |
| Cenários e rastreabilidade CA01–CA11 | [docs/cenarios.md](docs/cenarios.md) |
| Cenários em Gherkin | [docs/cenariosGherkin.feature](docs/cenariosGherkin.feature) |
| Resultado de cada teste automatizado | [docs/execucao.md](docs/execucao.md) |
| Defeitos com reprodução, esperado e observado | [docs/bugs.md](docs/bugs.md) |
| Screenshots e requisições/respostas reais | [docs/evidencias.md](docs/evidencias.md) |
| Exploração e testes manuais | [docs/exploracao.md](docs/exploracao.md) e [testes-manuais/execucao.md](testes-manuais/execucao.md) |
| Testes de interface | [tests/e2e](tests/e2e) |
| Testes de API | [tests/api](tests/api) |
| Integração contínua | [.github/workflows/playwright.yml](.github/workflows/playwright.yml) |

## Instalação

Pré-requisitos: Node.js **22 ou superior** (24 indicado em `.nvmrc`), npm e acesso à internet. O projeto não precisa iniciar servidor local.

```bash
npm ci
npx playwright install chromium
```

Em Linux, se faltarem bibliotecas do navegador:

```bash
npx playwright install --with-deps chromium
```

A suíte de API pode ser executada logo após `npm ci`, sem instalar navegador.

## Execução

```bash
npm test                  # Interface e API
npm run test:api          # Somente API
npm run test:e2e          # Somente Chromium
npm run test:smoke        # Dez verificações rápidas de fluxos básicos
npm run typecheck         # Verificação estática de TypeScript
npm run test:list         # Lista os cenários sem executá-los
```

O smoke não substitui a regressão completa nem a verificação dos limites de frete e quantidade. Os dez cenários dessa seleção passaram na execução completa registrada.

Para depurar:

```bash
npm run test:ui
npm run test:headed
npm run test:debug
```

Para executar um cenário específico:

```bash
npm test -- --project=api --grep 'API-C04 '
npm test -- --project=chromium --grep 'UI-F02 '
```

Por padrão, o alvo é [Verzel Store](https://verzel-store.qa-test-verzel-store.workers.dev/). Para configurar outro ambiente compatível:

```bash
BASE_URL=https://seu-ambiente.example npm test
```

No PowerShell: `$env:BASE_URL="https://seu-ambiente.example"; npm test`. `.env.example` documenta a variável; o projeto lê o ambiente do processo e não carrega `.env` automaticamente.

## Relatórios e evidências

```bash
npm run report
```

Após cada execução, o HTML fica em `playwright-report/`; resultados JSON/JUnit, tabela Markdown e anexos ficam em `test-results/`. Falhas de interface preservam screenshot, vídeo e trace. Trocas HTTP de API são anexadas antes das asserções, inclusive nas reprovações.

O trace pode ser aberto pelo caminho informado no terminal:

```bash
npx playwright show-trace test-results/artifacts/PASTA-DO-CENARIO/trace.zip
```

### Vídeos com execução mais lenta

```bash
npm run test:video
```

Esse modo executa somente a interface, um teste por vez, com `slowMo: 1000` (1 segundo de atraso nas operações do navegador), timeout ampliado e gravação de **todos** os cenários, inclusive aprovados, em 1280 × 720. Os vídeos ficam em `test-results/artifacts/` e podem ser abertos pelo relatório HTML. O atraso não se aplica às requisições de API nem a cada asserção.

Para ajustar o atraso ou gravar apenas um cenário:

```bash
SLOW_MO_MS=1500 npm run test:video
npm run test:video -- --grep 'UI-C01 '
```

No PowerShell: `$env:SLOW_MO_MS="1500"; npm run test:video`. O comando `npm test` continua usando a velocidade normal. Este modo substitui os relatórios temporários da execução anterior; o snapshot não é atualizado por esse modo, pois exige a suíte completa de interface e API.

O snapshot real da execução está em `docs/evidencias/`. Para atualizá-lo após uma **execução completa**:

```bash
npm test
npm run evidence
```

Os comandos são executados separadamente: o código 1 da suíte corresponde às reprovações e não impede a geração do snapshot. A documentação descreve a execução registrada; mudanças no comportamento exigem uma nova análise dos resultados. Relatórios temporários, navegador e `node_modules` não são versionados.

## Organização

```text
.github/workflows/playwright.yml  Execução automática e artefatos
docs/                            Requisitos, plano, cenários, bugs e evidências
testes-manuais/                  Casos, resultados e capturas da execução manual
testes-exploratorios/            Verificações complementares e observações exploratórias
verifications/                   Testes automatizados complementares de dados do cliente
reporters/execution-reporter.ts   Resultado legível por cenário
reporters/suggestions-reporter.ts Relatório de sugestões das verificações complementares
scripts/snapshot-evidence.mjs     Snapshot dos resultados e anexos para o Git
tests/
  api/                           Catálogo, cálculo, pedidos e validações HTTP
  data/                          Dados fixos e tipos de domínio
  e2e/                           Cupons, carrinho e checkout
  pages/                         Ações reutilizadas da interface
  support/                       Fixtures e registro de trocas HTTP
playwright.config.ts             Projetos api e chromium, esperas e relatórios
```

Cada teste de interface começa em contexto limpo. A API recebe todos os dados a cada chamada, conforme seu contrato sem estado. São usados dois workers, sem dependência de ordem, autenticação compartilhada, mock da loja ou espera fixa. `data-valor` identifica os valores monetários expostos com esse atributo pela aplicação.

## GitHub Actions

O workflow executa `npm ci`, valida TypeScript, instala Chromium e roda a suíte em pushes para `main`/`master`, pull requests ou execução manual. As Actions estão fixadas por commit. Mesmo com falhas, os relatórios ficam no artefato `playwright-results-N` por 14 dias. O workflow foi preparado localmente; a execução no GitHub depende de publicar os arquivos no repositório.

## Testes manuais

A entrega inclui **oito casos manuais** cobrindo cupons, frete, limite de quantidade e checkout. O registro consolidado apresenta **seis aprovados e dois reprovados**; MAN-02 e MAN-03 reproduzem o BUG-001, a cobrança de frete no subtotal de R$ 200,00. Os passos, resultados observados e capturas estão disponíveis em:

- [Visão geral dos testes manuais](testes-manuais/README.md)
- [Casos de teste e passos](testes-manuais/casos.md)
- [Resultados da execução](testes-manuais/execucao.md)
- [Índice das evidências e capturas](testes-manuais/evidencias/README.md)

## Exploração e verificações complementares

Além dos cenários da entrega, há uma suíte separada para as regras preexistentes de nome, e-mail e CEP. São **52 verificações automatizadas** em API e interface: 48 aprovadas e quatro reprovadas. Elas ficam em `verifications/`, usam uma configuração Playwright própria e podem ser executadas e consultadas separadamente:

```bash
npm run test:verification
npm run report:verification
```

As [verificações complementares e observações](testes-exploratorios/README.md) registram os resultados e o escopo. As observações exploratórias incluem [mensagens de validação durante a edição](testes-exploratorios/feedback-validacao-checkout.md), [nomes com dígitos](testes-exploratorios/nome-com-digitos.md) e [permanência do cupom](testes-exploratorios/permanencia-cupom.md). A exploração do cupom tem um vídeo, mas não possui conclusão documentada. Essas observações são sugestões ou pontos a confirmar; não são defeitos confirmados da entrega VZS-142.
