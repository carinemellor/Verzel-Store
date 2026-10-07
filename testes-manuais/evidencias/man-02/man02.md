# MAN-02 — Frete grátis no limite, sem cupom

## Dados utilizados

- **Produto:** Mochila Urbana 20L (P005), R$ 100,00 por unidade
- **Quantidade:** 2 unidades
- **Cupom:** nenhum

## Passos e evidências

| Etapa | Ação / resultado observado | Evidência |
| --- | --- | --- |
| 1 | Na vitrine, selecionar **Adicionar ao carrinho** para a Mochila Urbana 20L. | [1.png](1.png) |
| 2 | Adicionar a segunda unidade e confirmar que o indicador do carrinho mostra duas unidades. | [2.png](2.png) |
| 3 | Conferir novamente o indicador do carrinho antes de abri-lo. | [3.png](3.png) |
| 4 | Abrir o carrinho e conferir subtotal, frete, total e aviso de frete grátis. | [4.png](4.png) |

## Resultado

| Valor | Esperado | Observado |
| --- | ---: | ---: |
| Subtotal | R$ 200,00 | R$ 200,00 |
| Desconto | R$ 0,00 | R$ 0,00 |
| Frete | R$ 0,00 | R$ 19,90 |
| Total | R$ 200,00 | R$ 219,90 |

O carrinho informa **“Faltam R$ 0,00 para o frete grátis”**, mas ainda cobra R$ 19,90 de frete.

**Resultado:** reprovado. A cobrança no subtotal exato de R$ 200,00 diverge do esperado e reproduz o **BUG-001** documentado em [`docs/bugs.md`](../../../docs/bugs.md).
