# MAN-05 — Remover e reaplicar cupom

## Dados utilizados

- **Produto:** Mochila Urbana 20L (P005)
- **Quantidade:** 1 unidade
- **Cupom:** `BEMVINDO10`

## Passos e evidências

| Etapa | Ação / resultado observado | Evidência |
| --- | --- | --- |
| 1 | Na vitrine, localizar a Mochila Urbana 20L e selecionar **Adicionar ao carrinho**. | [1.png](1.png) |
| 2 | Confirmar que o indicador do carrinho mostra uma unidade e que o produto foi adicionado ao carrinho. | [2.png](2.png) |
| 3 | Acessar o carrinho e confirmar o estado inicial: subtotal de R$ 100,00, desconto de R$ 0,00, frete de R$ 19,90 e total de R$ 119,90. | [4.png](4.png) |
| 4 | Informar o cupom `BEMVINDO10` no campo de desconto. | [5.png](5.png) |
| 5 | Selecionar **Aplicar cupom** e observar que o sistema exibe o cupom aplicado com desconto de R$ 10,00. | [6.png](6.png) |
| 6 | Confirmar o resumo atualizado após a aplicação: subtotal R$ 100,00, desconto R$ 10,00, frete R$ 19,90 e total R$ 109,90. | [7.png](7.png) |
| 7 | Selecionar **Remover cupom** e verificar que o campo de cupom volta a aparecer, com desconto zerado e total revertido para R$ 119,90. | [8.png](8.png) |
| 8 | Reaplicar o cupom `BEMVINDO10` e confirmar que o desconto volta a R$ 10,00 e o total retorna a R$ 109,90. | [9.png](9.png) |

## Resultado observado

| Situação | Subtotal | Desconto | Frete | Total |
| --- | ---: | ---: | ---: | ---: |
| Sem cupom | R$ 100,00 | R$ 0,00 | R$ 19,90 | R$ 119,90 |
| Cupom aplicado | R$ 100,00 | R$ 10,00 | R$ 19,90 | R$ 109,90 |
| Cupom removido | R$ 100,00 | R$ 0,00 | R$ 19,90 | R$ 119,90 |
| Cupom reaplicado | R$ 100,00 | R$ 10,00 | R$ 19,90 | R$ 109,90 |

A interface permite aplicar, remover e reaplicar o cupom sem acumular desconto. O valor do desconto volta ao esperado em cada etapa e a tela de carrinho se mantém consistente.

**Resultado:** aprovado. O comportamento observado está alinhado com a regra de aplicação e remoção do cupom.