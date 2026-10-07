# MAN-08 — Validação dos dados no checkout

## Dados utilizados

- **Produto:** Mochila Urbana 20L (P005)
- **Quantidade:** 1 unidade
- **Dados do cliente com erro:** nome `Maria`, e-mail `email-invalido`, CEP `1234567`

## Passos e evidências

| Etapa | Ação / resultado observado | Evidência |
| --- | --- | --- |
| 1 | Na vitrine, localizar a Mochila Urbana 20L e selecionar **Adicionar ao carrinho**. | [1.png](1.png) |
| 2 | Confirmar que o carrinho indica 1 unidade e abrir o carrinho. | [2.png](2.png) |
| 3 | No carrinho, verificar o resumo inicial: subtotal R$ 100,00, desconto R$ 0,00, frete R$ 19,90 e total R$ 119,90. | [3.png](3.png) |
| 4 | Selecionar **Finalizar compra** e preencher os campos com valores inválidos: nome incompleto, e-mail no formato inválido e CEP com menos de 8 dígitos. | [4.png](4.png) |
| 5 | Tentar confirmar o pedido com os dados inválidos. | [5.png](5.png) |
| 6 | Observar as mensagens de validação exibidas na tela: nome incompleto, e-mail inválido e CEP com 8 dígitos obrigatórios. | [6.png](6.png) |

## Resultado observado

| Campo | Valor informado | Mensagem exibida |
| --- | --- | --- |
| Nome | `Maria` | Informe nome e sobrenome. |
| E-mail | `email-invalido` | Informe um e-mail válido. |
| CEP | `1234567` | Informe um CEP com 8 dígitos. |

O pedido não foi confirmado e a tela de checkout permaneceu aberta com os erros destacados, conforme o resultado esperado para os dados inválidos.

**Resultado:** aprovado para a regra de validação de dados no checkout. O comportamento observado está alinhado com a expectativa do cenário manual.
