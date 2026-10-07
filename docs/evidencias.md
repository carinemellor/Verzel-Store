# Evidências de execução

Execução real em **06/10/2026, 19:19:52 (America/Sao_Paulo)**. Playwright 1.63.0; v24.21.0; Chromium desktop e API HTTP.

Resultado: **78 aprovados, 8 reprovados, 0 ignorados e 0 instáveis**.

As reprovações da aplicação estão relacionadas no [relatório de bugs](bugs.md). As expectativas seguem a especificação.

Este snapshot registra a execução completa acima. Novas execuções escrevem em `test-results/` e `playwright-report/`, sem alterar automaticamente esta entrega. Para atualizar conscientemente: `npm run evidence` após `npm test`.

O relatório HTML local (`npm run report`) e o artefato do GitHub Actions contêm traces, vídeos e contexto das falhas. Os arquivos menores abaixo ficam versionados para consulta direta pelo avaliador.

Os JSONs HTTP incluem método, caminho, payload, status e resposta. Os screenshots mostram o estado final dos testes; UI-O01 possui também uma imagem da confirmação antes de consultar o carrinho vazio.

| Cenário | Camada | Resultado | Evidências |
| --- | --- | --- | --- |
| API-C01 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C01-01.json) |
| API-C02 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C02-01.json) |
| API-C03 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C03-01.json) |
| API-C04 | api | failed | [HTTP POST /api/carrinho/calcular](evidencias/API-C04-01.json) |
| API-C05 | api | failed | [HTTP POST /api/carrinho/calcular](evidencias/API-C05-01.json) |
| API-C06 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C06-01.json) |
| API-C07 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C07-01.json) |
| API-C08 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C08-01.json) |
| API-C09 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C09-01.json) |
| API-C10 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C10-01.json) |
| API-C11 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C11-01.json) |
| API-C12-1 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C12-1-01.json) |
| API-C12-2 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C12-2-01.json) |
| API-C12-3 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C12-3-01.json) |
| API-C12-4 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C12-4-01.json) |
| API-C13 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C13-01.json) |
| API-C14 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C14-01.json) |
| API-C15 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-C15-01.json)<br>[HTTP POST /api/carrinho/calcular](evidencias/API-C15-02.json) |
| API-JC1 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-JC1-01.json) |
| API-JC2 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-JC2-01.json) |
| API-JC3 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-JC3-01.json) |
| API-JC4 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-JC4-01.json) |
| API-JO1 | api | passed | [HTTP POST /api/pedidos](evidencias/API-JO1-01.json) |
| API-JO2 | api | passed | [HTTP POST /api/pedidos](evidencias/API-JO2-01.json) |
| API-JO3 | api | passed | [HTTP POST /api/pedidos](evidencias/API-JO3-01.json) |
| API-JO4 | api | passed | [HTTP POST /api/pedidos](evidencias/API-JO4-01.json) |
| API-MC | api | passed | [HTTP GET /api/carrinho/calcular](evidencias/API-MC-01.json) |
| API-MO | api | passed | [HTTP GET /api/pedidos](evidencias/API-MO-01.json) |
| API-O01-1 | api | passed | [HTTP POST /api/pedidos](evidencias/API-O01-1-01.json) |
| API-O01-2 | api | passed | [HTTP POST /api/pedidos](evidencias/API-O01-2-01.json) |
| API-O02 | api | failed | [HTTP POST /api/pedidos](evidencias/API-O02-01.json) |
| API-O03 | api | passed | [HTTP POST /api/pedidos](evidencias/API-O03-01.json) |
| API-O04 | api | passed | [HTTP POST /api/pedidos](evidencias/API-O04-01.json) |
| API-O05-1 | api | passed | [HTTP POST /api/pedidos](evidencias/API-O05-1-01.json) |
| API-O05-2 | api | passed | [HTTP POST /api/pedidos](evidencias/API-O05-2-01.json) |
| API-O05-3 | api | passed | [HTTP POST /api/pedidos](evidencias/API-O05-3-01.json) |
| API-P01 | api | passed | [HTTP GET /api/produtos](evidencias/API-P01-01.json) |
| API-P02-P001 | api | passed | [HTTP GET /api/produtos/P001](evidencias/API-P02-P001-01.json) |
| API-P02-P002 | api | passed | [HTTP GET /api/produtos/P002](evidencias/API-P02-P002-01.json) |
| API-P02-P003 | api | passed | [HTTP GET /api/produtos/P003](evidencias/API-P02-P003-01.json) |
| API-P02-P004 | api | passed | [HTTP GET /api/produtos/P004](evidencias/API-P02-P004-01.json) |
| API-P02-P005 | api | passed | [HTTP GET /api/produtos/P005](evidencias/API-P02-P005-01.json) |
| API-P02-P006 | api | passed | [HTTP GET /api/produtos/P006](evidencias/API-P02-P006-01.json) |
| API-P02-P007 | api | passed | [HTTP GET /api/produtos/P007](evidencias/API-P02-P007-01.json) |
| API-P02-P008 | api | passed | [HTTP GET /api/produtos/P008](evidencias/API-P02-P008-01.json) |
| API-P03 | api | passed | [HTTP GET /api/produtos/INEXISTENTE](evidencias/API-P03-01.json) |
| API-P04 | api | passed | [HTTP GET /api/rota-inexistente](evidencias/API-P04-01.json) |
| API-P05 | api | passed | [HTTP POST /api/produtos](evidencias/API-P05-01.json) |
| API-VC01 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-VC01-01.json) |
| API-VC02 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-VC02-01.json) |
| API-VC03 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-VC03-01.json) |
| API-VC04 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-VC04-01.json) |
| API-VC05 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-VC05-01.json) |
| API-VC06 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-VC06-01.json) |
| API-VC07 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-VC07-01.json) |
| API-VC08 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-VC08-01.json) |
| API-VC09 | api | passed | [HTTP POST /api/carrinho/calcular](evidencias/API-VC09-01.json) |
| API-VC10 | api | failed | [HTTP POST /api/carrinho/calcular](evidencias/API-VC10-01.json) |
| API-VO01 | api | passed | [HTTP POST /api/pedidos](evidencias/API-VO01-01.json) |
| API-VO02 | api | passed | [HTTP POST /api/pedidos](evidencias/API-VO02-01.json) |
| API-VO03 | api | passed | [HTTP POST /api/pedidos](evidencias/API-VO03-01.json) |
| API-VO04 | api | passed | [HTTP POST /api/pedidos](evidencias/API-VO04-01.json) |
| API-VO05 | api | passed | [HTTP POST /api/pedidos](evidencias/API-VO05-01.json) |
| API-VO06 | api | passed | [HTTP POST /api/pedidos](evidencias/API-VO06-01.json) |
| API-VO07 | api | passed | [HTTP POST /api/pedidos](evidencias/API-VO07-01.json) |
| API-VO08 | api | passed | [HTTP POST /api/pedidos](evidencias/API-VO08-01.json) |
| API-VO09 | api | passed | [HTTP POST /api/pedidos](evidencias/API-VO09-01.json) |
| API-VO10 | api | failed | [HTTP POST /api/pedidos](evidencias/API-VO10-01.json) |
| UI-C01 | chromium | passed | [estado-final-da-interface](evidencias/UI-C01-01.png) |
| UI-C02-1 | chromium | passed | [estado-final-da-interface](evidencias/UI-C02-1-01.png) |
| UI-C02-2 | chromium | passed | [estado-final-da-interface](evidencias/UI-C02-2-01.png) |
| UI-C03 | chromium | passed | [estado-final-da-interface](evidencias/UI-C03-01.png) |
| UI-C04 | chromium | passed | [estado-final-da-interface](evidencias/UI-C04-01.png) |
| UI-C05 | chromium | passed | [estado-final-da-interface](evidencias/UI-C05-01.png) |
| UI-C06 | chromium | passed | [estado-final-da-interface](evidencias/UI-C06-01.png) |
| UI-F01 | chromium | passed | [estado-final-da-interface](evidencias/UI-F01-01.png) |
| UI-F02 | chromium | failed | [screenshot](evidencias/UI-F02-01.png)<br>[estado-final-da-interface](evidencias/UI-F02-02.png) |
| UI-F03 | chromium | failed | [screenshot](evidencias/UI-F03-01.png)<br>[estado-final-da-interface](evidencias/UI-F03-02.png) |
| UI-F04 | chromium | failed | [screenshot](evidencias/UI-F04-01.png)<br>[estado-final-da-interface](evidencias/UI-F04-02.png) |
| UI-F05 | chromium | passed | [estado-final-da-interface](evidencias/UI-F05-01.png) |
| UI-F06 | chromium | passed | [observacao-cupom-apos-remover-ultimo-item](evidencias/UI-F06-01.json)<br>[estado-final-da-interface](evidencias/UI-F06-02.png) |
| UI-F07 | chromium | passed | [estado-final-da-interface](evidencias/UI-F07-01.png) |
| UI-F08 | chromium | passed | [estado-final-da-interface](evidencias/UI-F08-01.png) |
| UI-O01 | chromium | passed | [pedido-confirmado](evidencias/UI-O01-01.png)<br>[estado-final-da-interface](evidencias/UI-O01-02.png) |
| UI-O02 | chromium | passed | [estado-final-da-interface](evidencias/UI-O02-01.png) |
| UI-O03 | chromium | passed | [estado-final-da-interface](evidencias/UI-O03-01.png) |




## Testes reprovados

Abaixo estão os 8 cenários reprovados, agrupados pelos defeitos registrados em [bugs](bugs.md).

| Defeito | Cenário | Camada | Evidências |
| --- | --- | --- | --- |
| BUG-001 | API-C04 | api | [HTTP POST /api/carrinho/calcular](evidencias/API-C04-01.json) |
| BUG-001 | API-C05 | api | [HTTP POST /api/carrinho/calcular](evidencias/API-C05-01.json) |
| BUG-001 | API-O02 | api | [HTTP POST /api/pedidos](evidencias/API-O02-01.json) |
| BUG-001 | UI-F02 | chromium | [screenshot](evidencias/UI-F02-01.png)<br>[estado-final-da-interface](evidencias/UI-F02-02.png) |
| BUG-001 | UI-F03 | chromium | [screenshot](evidencias/UI-F03-01.png)<br>[estado-final-da-interface](evidencias/UI-F03-02.png) |
| BUG-001 | UI-F04 | chromium | [screenshot](evidencias/UI-F04-01.png)<br>[estado-final-da-interface](evidencias/UI-F04-02.png) |
| BUG-002 | API-VC10 | api | [HTTP POST /api/carrinho/calcular](evidencias/API-VC10-01.json) |
| BUG-002 | API-VO10 | api | [HTTP POST /api/pedidos](evidencias/API-VO10-01.json) |
