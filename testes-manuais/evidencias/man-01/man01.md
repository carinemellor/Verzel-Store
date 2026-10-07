# MAN-01 — Desconto e frete abaixo do limite

## Dados utilizados

- **Produto:** Mochila Urbana 20L (P005)
- **Quantidade:** 1 unidade
- **Cupom:** `BEMVINDO10`

## Passos e evidências

| Etapa | Ação / resultado observado | Evidência |
| --- | --- | --- |
| 1 | Na vitrine, localizar a Mochila Urbana 20L e selecionar **Adicionar ao carrinho**. | [1.png](1.png) |
| 2 | Confirmar que uma unidade foi adicionada ao carrinho. | [2.png](2.png) |
| 3 | Recarregar a página e observar que o indicador do carrinho continua mostrando uma unidade. | [3.png](3.png) |
| 4 | No carrinho, conferir os valores antes do cupom: subtotal de R$ 100,00, desconto de R$ 0,00, frete de R$ 19,90 e total de R$ 119,90. | [4.png](4.png) |
| 5 | Preencher o campo de cupom com `BEMVINDO10`. | [5.png](5.png) |
| 6 | Selecionar **Aplicar cupom**. | [6.png](6.png) |
| 7 | Conferir o cupom aplicado e o resumo atualizado. | [7.png](7.png) |

## Resultado

| Valor | Esperado | Observado |
| --- | ---: | ---: |
| Subtotal | R$ 100,00 | R$ 100,00 |
| Desconto | R$ 10,00 | R$ 10,00 |
| Frete | R$ 19,90 | R$ 19,90 |
| Total | R$ 109,90 | R$ 109,90 |

**Resultado observado:** aprovado para o cálculo e a aplicação do cupom no carrinho.

O cenário valida o desconto e os valores no carrinho. A confirmação do pedido é coberta pelo MAN-07 e pelo teste automatizado UI-O01, que inclui cupom.
