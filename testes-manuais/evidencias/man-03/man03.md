# MAN-03 — Frete grátis no limite com cupom

## Dados utilizados

- **Produto:** Mochila Urbana 20L (P005), R$ 100,00 por unidade
- **Quantidade:** 2 unidades
- **Cupom:** `BEMVINDO10`

## Passos e evidências

| Etapa | Ação / resultado observado | Evidência |
| --- | --- | --- |
| 1 | Na vitrine, selecionar **Adicionar ao carrinho** para a Mochila Urbana 20L. | [1.png](1.png) |
| 2 | Adicionar a segunda unidade e confirmar que o indicador do carrinho mostra duas unidades. | [2.png](2.png) |
| 3 | Selecionar o indicador do carrinho, que mostra duas unidades. | [3.png](3.png) |
| 4 | No carrinho, conferir os valores antes de aplicar o cupom: subtotal de R$ 200,00, desconto de R$ 0,00, frete de R$ 19,90 e total de R$ 219,90. | [4.png](4.png) |
| 5 | Aplicar `BEMVINDO10` e conferir o resumo atualizado. | [5.png](5.png) |

## Resultado após aplicar o cupom

| Valor | Esperado | Observado |
| --- | ---: | ---: |
| Subtotal | R$ 200,00 | R$ 200,00 |
| Desconto | R$ 20,00 | R$ 20,00 |
| Frete | R$ 0,00 | R$ 19,90 |
| Total | R$ 180,00 | R$ 199,90 |

O carrinho informa **“Faltam R$ 0,00 para o frete grátis”**, embora ainda cobre R$ 19,90 de frete.

**Resultado:** reprovado. O frete cobrado no subtotal exato de R$ 200,00 reproduz o **BUG-001**, documentado em [`docs/bugs.md`](../../../docs/bugs.md).
