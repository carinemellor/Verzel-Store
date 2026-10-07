# MAN-06 — Limite de cinco unidades na interface

## Dados utilizados

- **Produto:** Kit 3 Pares de Meias (P006)
- **Preço:** R$ 29,90 por unidade
- **Limite:** 5 unidades por produto

## Passos e evidências

| Etapa | Ação / resultado observado | Evidência |
| --- | --- | --- |
| 1 | Na vitrine, localizar o **Kit 3 Pares de Meias** e selecionar **Adicionar ao carrinho**. | [1.png](1.png) |
| 2 | Acessar o carrinho e confirmar a primeira unidade adicionada, com quantidade 1. | [2.png](2.png) |
| 3 | Aumentar a quantidade até o limite, observando que o sistema bloqueia a sexta unidade e exibe a mensagem **“Limite de 5 unidades por produto.”** | [3.png](3.png) |
| 4 | Confirmar a mensagem de limite e o resumo do pedido com 5 unidades: subtotal de R$ 149,50, desconto de R$ 0,00, frete de R$ 19,90 e total de R$ 169,40. | [4.png](4.png) |
| 5 | Diminuir a quantidade de 5 para 4 e verificar que o carrinho aceita a redução sem bloqueios, com subtotal de R$ 119,60 e total de R$ 139,50. | [5.png](5.png) |

## Resultado observado

| Situação | Quantidade | Subtotal | Desconto | Frete | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Limite atingido | 5 | R$ 149,50 | R$ 0,00 | R$ 19,90 | R$ 169,40 |
| Após reduzir | 4 | R$ 119,60 | R$ 0,00 | R$ 19,90 | R$ 139,50 |

A interface respeita o limite máximo de 5 unidades por produto. Ao alcançar esse valor, o botão de aumento fica bloqueado e o sistema informa o limite. Quando a quantidade é reduzida, o carrinho continua funcionando normalmente.

**Resultado:** aprovado. O comportamento observado está alinhado com a regra de limite de quantidade por produto.