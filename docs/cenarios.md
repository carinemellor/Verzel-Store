# Cenários e rastreabilidade

Os nomes dos testes possuem IDs estáveis. As variantes parametrizadas aparecem individualmente no [resultado da execução](execucao.md). Os cenários em [Gherkin](cenariosGherkin.feature) documentam comportamento; Playwright executa os arquivos TypeScript, sem dependência de Cucumber.

| Requisito | Pré-condição / ação | Resultado esperado | Automação |
| --- | --- | --- | --- |
| CA01 | P005 × 1; BEMVINDO10 | Subtotal 100; desconto 10; frete 19,90; total 109,90 | API-C02, UI-C01 |
| CA02 | Código minúsculo, misto e com espaços | Código normalizado; desconto de 10% | API-C12-1…4, UI-C02-1…2 |
| CA03 | Cupom NAOEXISTE em P005 | Cálculo 200, sem desconto, “Cupom inválido.”; pedido 422 | API-C13, API-O03, UI-C03 |
| CA04 | Cupom VERAO2026 em P005 | Cálculo 200, sem desconto, “Cupom expirado.”; pedido 422 | API-C14, API-O04, UI-C04 |
| CA05 | Aplicar; remover; reaplicar cupom | Um cupom por vez; remoção zera desconto; reaplicação restabelece desconto | UI-C05 |
| CA06 | Subtotais 199,80 / 200 / 209,50 / 229,90 | Frete 19,90 / 0 / 0 / 0 | API-C03…06, API-C08, UI-F02 |
| CA07 | Subtotal 100 sem cupom | Frete 19,90; faltante 100; aviso no carrinho | API-C01, UI-F01 |
| CA08 | Subtotal 200 ou 209,90 com cupom | Frete zero apesar de valor descontado abaixo de 200 | API-C05, API-C07, API-O02, UI-F03, UI-F04 |
| CA09 | P005 e cupom válido | Desconto 10 sobre produtos; frete permanece 19,90 | API-C02, UI-C01 |
| CA10 | Quantidade 5 e tentativa de 6 | 5 aceita; incremento bloqueado na UI; 6 rejeitada nas APIs com 422 | API-C10, API-VC10, API-VO10, UI-F05 |
| CA11 | P002 + P004 × 2; ou P001 + P006; cupom | Totais 215,73 e 100,72; valores com precisão de centavos | API-C09, API-C11 |
| Catálogo | Listar e consultar P001…P008 | 200, catálogo fixo, preços corretos, campos tipados e IDs únicos | API-P01, API-P02-P001…P008 |
| Erros HTTP | Produto/rota inexistente, método incorreto | 404/405 e código documentado | API-P03…05, API-MC, API-MO |
| JSON | Corpo malformado, nulo, array, texto | 400 JSON_INVALIDO nos dois endpoints POST | API-JC1…4, API-JO1…4 |
| Itens | Ausentes, vazios, nulo, produto inexistente/duplicado | 422 e código específico | API-VC01…05, API-VO01…05 |
| Quantidades | Zero, negativo, fração, texto | 422 QUANTIDADE_INVALIDA | API-VC06…09, API-VO06…09 |
| Cliente | Nome incompleto, e-mail inválido, CEP de 7 dígitos | 422 DADOS_INVALIDOS com campos; mensagens e aria-invalid na UI | API-O05-1…3, UI-O02 |
| Pedido | Dados válidos, P005 e cupom; CEP com/sem hífen | 201, número VZ de seis dígitos, data ISO, CEP normalizado e totais corretos | API-O01-1…2, UI-O01 |
| API sem estado | Calcular com cupom; nova chamada sem cupom | Nova resposta não herda desconto | API-C15 |
| Sessão | Atualizar mesma aba; abrir outra aba | Mesma aba preserva carrinho/cupom; nova aba começa vazia | UI-F07 |
| Carrinho | Remover último item; adicionar item novamente | Estado vazio e novo item disponível; cupom observado sem oráculo inventado | UI-F06 |
| Carrinho | Esvaziar com cupom | Carrinho vazio; novo carrinho sem cupom | UI-F08 |
| Checkout | Acessar sem itens | Redirecionar para carrinho vazio | UI-O03 |
| Campo cupom | Enviar apenas espaços | “Informe um cupom.” sem desconto | UI-C06 |

## Execução manual e exploratória

Os oito casos manuais e seus resultados estão em [`testes-manuais/`](../testes-manuais/README.md). As evidências de MAN-02 e MAN-03 reproduzem o BUG-001. As sessões exploratórias estão registradas em [exploração](exploracao.md) e nas [verificações complementares](../testes-exploratorios/README.md).
