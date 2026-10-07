# MAN-07 — Checkout válido

## Dados utilizados

- **Produto:** Mochila Urbana 20L (P005)
- **Quantidade:** 1 unidade
- **Dados do cliente:** nome `Maria Silva`, e-mail `maria@example.com`, CEP `01310-100`

## Passos e evidências

| Etapa | Ação / resultado observado | Evidência |
| --- | --- | --- |
| 1 | Na vitrine, localizar a Mochila Urbana 20L e selecionar **Adicionar ao carrinho**. | [1.png](1.png) |
| 2 | Confirmar que o carrinho indica 1 unidade e abrir o carrinho. | [2.png](2.png) |
| 3 | No carrinho, verificar o resumo inicial: subtotal R$ 100,00, desconto R$ 0,00, frete R$ 19,90 e total R$ 119,90. | [3.png](3.png) |
| 4 | Selecionar **Finalizar compra** e preencher os dados de entrega com nome, e-mail e CEP válidos. | [4.png](4.png) |
| 5 | Confirmar o preenchimento dos campos e acionar **Confirmar pedido**. | [5.png](5.png) |
| 6 | Observar a página de confirmação com o pedido gerado e os valores finais. | [6.png](6.png) |
| 7 | Voltar ao carrinho e confirmar que ele fica vazio após a confirmação. | [7.png](7.png) |

## Resultado observado

| Valor | Observado |
| --- | ---: |
| Subtotal | R$ 100,00 |
| Desconto | R$ 0,00 |
| Frete | R$ 19,90 |
| Total | R$ 119,90 |
| Número do pedido | VZ-147531 |
| Carrinho após confirmação | vazio |

O fluxo de checkout foi concluído com sucesso usando dados válidos. O pedido foi gerado e os valores exibidos no resumo coincidiram com os calculados no carrinho antes da confirmação.

**Resultado:** aprovado. O comportamento observado está alinhado com o cenário de checkout válido.