# Evidências dos testes manuais

Esta pasta contém os registros gerados durante a execução manual, como screenshots e descrições do comportamento observado. Os arquivos estão organizados pelo ID do caso e pela ordem numérica das capturas.

## Índice por cenário

- [MAN-01 — Desconto e frete abaixo do limite](./man-01/man01.md)
  - Evidências: [1.png](./man-01/1.png) a [7.png](./man-01/7.png)
  - Observação: validação do cupom `BEMVINDO10` com subtotal e total esperados.

- [MAN-02 — Frete grátis no limite, sem cupom](./man-02/man02.md)
  - Evidências: [1.png](./man-02/1.png) a [4.png](./man-02/4.png)
  - Observação: reprovado: frete de R$ 19,90 e total de R$ 219,90 no subtotal de R$ 200,00 (BUG-001).

- [MAN-03 — Frete grátis no limite com cupom](./man-03/man03.md)
  - Evidências: [1.png](./man-03/1.png) a [5.png](./man-03/5.png)
  - Observação: reprovado: frete de R$ 19,90 e total de R$ 199,90 com cupom no subtotal de R$ 200,00 (BUG-001).

- [MAN-04 — Cupom inválido e expirado](./man-04/man04.md)
  - Evidências: [1.png](./man-04/1.png) a [8.png](./man-04/8.png)
  - Observação: testes com `NAOEXISTE` e `VERAO2026`, confirmando que não há desconto aplicado.

- [MAN-05 — Remover e reaplicar cupom](./man-05/man-05.md)
  - Evidências: [1.png](./man-05/1.png) a [9.png](./man-05/9.png)
  - Observação: aplicação, remoção e reaplicação do cupom `BEMVINDO10` sem acúmulo de desconto.

- [MAN-06 — Limite de cinco unidades na interface](./man-06/man-06.md)
  - Evidências: [1.png](./man-06/1.png) a [5.png](./man-06/5.png)
  - Observação: teste do limite de 5 unidades por produto e reversão após redução.

- [MAN-07 — Checkout válido](./man-07/man-07.md)
  - Evidências: [1.png](./man-07/1.png) a [7.png](./man-07/7.png)
  - Observação: preenchimento com dados válidos, confirmação do pedido e carrinho vazio após a compra.

- [MAN-08 — Validação dos dados no checkout](./man-08/man-08.md)
  - Evidências: [1.png](./man-08/1.png) a [6.png](./man-08/6.png)
  - Observação: validação de nome, e-mail e CEP inválidos no checkout, com mensagens de erro e bloqueio do pedido.

## Observações gerais

- Os cenários manuais ficam organizados por pasta com nomenclatura `man-XX`.
- Cada pasta contém o arquivo de documentação do cenário e o conjunto de imagens relacionadas ao caso.
- A ordem numérica das imagens permite acompanhar as etapas de cada cenário.
