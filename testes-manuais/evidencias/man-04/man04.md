# MAN-04 — Cupom inexistente e expirado

## Dados utilizados

- **Produto:** Mochila Urbana 20L (P005), R$ 100,00 por unidade
- **Quantidade:** 1 unidade
- **Cupons testados:** `NAOEXISTE` e `VERAO2026`

## Passos e evidências

| Etapa | Ação / resultado observado | Evidência |
| --- | --- | --- |
| 1 | Na vitrine, selecionar **Adicionar ao carrinho** para a Mochila Urbana 20L. | [1.png](1.png) |
| 2 | Abrir o carrinho e confirmar o estado inicial: subtotal de R$ 100,00, frete de R$ 19,90 e total de R$ 119,90. | [4.png](4.png) |
| 3 | Informar o cupom `NAOEXISTE` no campo de desconto e acionar **Aplicar cupom**. | [5.png](5.png) |
| 4 | Confirmar que a mensagem **“Cupom inválido.”** aparece e que nenhum desconto foi aplicado. | [6.png](6.png) |
| 5 | Informar o cupom `VERAO2026` e acionar **Aplicar cupom**. | [7.png](7.png) |
| 6 | Confirmar que a mensagem **“Cupom expirado.”** aparece e que o resumo mantém subtotal de R$ 100,00, desconto de R$ 0,00, frete de R$ 19,90 e total de R$ 119,90. | [8.png](8.png) |

## Resultado observado

| Cupom | Mensagem exibida | Subtotal | Desconto | Frete | Total |
| --- | --- | ---: | ---: | ---: | ---: |
| `NAOEXISTE` | Cupom inválido. | R$ 100,00 | R$ 0,00 | R$ 19,90 | R$ 119,90 |
| `VERAO2026` | Cupom expirado. | R$ 100,00 | R$ 0,00 | R$ 19,90 | R$ 119,90 |

A aplicação de cupons inexistentes ou expirados não altera o valor final e mantém a mensagem de erro relevante na interface. Em ambos os casos, o sistema evita a aplicação de desconto e preserva o valor base do pedido.

**Resultado:** aprovado para a regra de validação de cupom inválido e expirado, conforme a expectativa de comportamento do cenário manual.
