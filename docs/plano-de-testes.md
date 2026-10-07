# Plano de testes — VZS-142

## Objetivo e fontes

Validar cupons e frete grátis da Verzel Store 2.3.0, publicada em 30/09/2026, conforme a [documentação da entrega](https://verzel-store.qa-test-verzel-store.workers.dev/documentacao) e as condições do desafio técnico.

## Escopo

Cupom BEMVINDO10, normalização do código, cupom inexistente e expirado, remoção de cupom, frete abaixo/no/acima do limite, desconto independente do frete, quantidades de 1 a 5 e rejeição acima de 5, precisão de centavos e confirmação do pedido. Validação funcional e de contrato dos quatro endpoints documentados, incluindo status HTTP, JSON, tipos, valores, códigos e detalhes de erro.

Login, cadastro, pagamento online, consulta de pedidos, estoque, envio de e-mail, persistência de pedidos e testes de carga, estresse e segurança ficam fora do escopo. O ambiente compartilhado foi usado com dois workers, sem gerar tráfego de carga.

## Estratégia

- API: cenários parametrizados de cálculo, equivalência de entradas, limites de quantidade, contratos positivos e erros documentados. O projeto `api` usa somente `APIRequestContext`, sem iniciar navegador.
- Interface: Chromium desktop, interações reais da vitrine até a confirmação, contexto limpo por teste, seletores por papel/nome/rótulo e asserções com espera automática.
- Dados: catálogo e cupons fixos da documentação; cliente fictício Maria Silva, `maria@example.com`, CEP `01310-100`.
- Evidências: intercâmbio HTTP anexado antes das asserções; screenshot ao final de cada teste de interface; screenshots, vídeos e traces de falhas; relatórios HTML, JSON, JUnit e Markdown.
- Manutenção: Page Object para ações reutilizadas, fixtures para o ciclo de vida, expectativas explícitas derivadas da especificação e nenhum mock da loja ou da API.

## Priorização

| Prioridade | Risco | Cenários |
| --- | --- | --- |
| P1 | Cobrança indevida no pedido | CA01, CA06, CA08, CA09, CA11 e confirmação |
| P1 | API permite violar regra de quantidade | CA10, quantidade 5 e 6 em cálculo e pedido |
| P2 | Promoção aplicada incorretamente | CA02, CA03, CA04 e CA05 |
| P2 | Falhas de validação | JSON, itens, produto, nome, e-mail e CEP |
| P3 | Comportamento da sessão e mensagens | Atualização, nova aba, esvaziar/remover itens e aviso de frete |

## Partições e limites

Frete: R$ 100,00 e R$ 199,80 abaixo; R$ 200,00 no limite; R$ 209,50, R$ 209,90, R$ 229,90 e R$ 239,70 acima. Os preços são fixos: não é possível construir livremente subtotais de R$ 199,99 ou R$ 200,01. Usam-se combinações válidas do catálogo, com a limitação registrada em vez de alterar preços.

Quantidade: 1 e 5 válidas; 0, -1, 1,5, texto e 6 inválidas. Cupons: válido exato, minúsculo, misto, espaços, inexistente e expirado. JSON: objeto válido, sintaxe incompleta, `null`, array e texto.

## Critérios de entrada e saída

Entrada: ambiente acessível, documentação disponível, Node.js e Chromium instalados. Saída: cenários executados com resultados e evidências, defeitos reproduzíveis reportados e lacunas explicitadas. Testes que encontram defeitos devem continuar falhando até a correção da aplicação; não se usa `skip`, `fixme` ou resultado esperado incorreto para obter uma suíte verde.

## Interpretações e limitações

1. CA06 usa comparação inclusiva: subtotal **maior ou igual a R$ 200,00**, antes do desconto. Um pedido de R$ 200,00 com desconto de R$ 20,00 deve ter frete zero e total de R$ 180,00.
2. CA05 dispõe de apenas um cupom válido nos dados. Testa-se esconder o formulário quando ele está aplicado, removê-lo e reaplicá-lo. Não se inventa um segundo cupom válido.
3. A documentação não determina se remover o último item deve apagar o cupom. UI-F06 registra o desconto observado sem classificar sua persistência como bug. `Esvaziar carrinho` é testado separadamente.
4. Arredondamento validado com os centavos alcançáveis do catálogo; não há API para alterar preços ou criar frações menores que um centavo.
5. Chromium desktop é o navegador efetivamente executado. Firefox, WebKit e mobile não estão incluídos nesta evidência.
6. Os resultados automatizados e manuais têm registros separados. Os oito casos manuais possuem evidências suficientes para os objetivos descritos em [`testes-manuais/`](../testes-manuais/README.md), com seis aprovações e duas reprovações relacionadas ao BUG-001.
