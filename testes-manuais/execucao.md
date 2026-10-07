# Registro da execução manual

Resultados consolidados a partir das descrições e capturas presentes nas pastas de evidências. Os oito casos estão documentados: seis aprovados e dois reprovados.

| Informação | Registro |
| --- | --- |
| Executor | Não informado nos registros |
| Data e hora | Não informadas nos registros |
| Navegador e versão | Versão não registrada |
| Sistema operacional | Não registrado |
| Ambiente | https://verzel-store.qa-test-verzel-store.workers.dev/ |

## Resultados por caso

| ID | Resultado observado | Resultado | Evidência |
| --- | --- | --- | --- |
| MAN-01 | Cupom aplica desconto de R$ 10,00; frete R$ 19,90; total R$ 109,90 no carrinho. | Aprovado | [Registro](evidencias/man-01/man01.md) |
| MAN-02 | Subtotal R$ 200,00, frete R$ 19,90 e total R$ 219,90, contrariando CA06. | Reprovado — BUG-001 | [Registro](evidencias/man-02/man02.md) |
| MAN-03 | Subtotal R$ 200,00, desconto R$ 20,00, frete R$ 19,90 e total R$ 199,90. | Reprovado — BUG-001 | [Registro](evidencias/man-03/man03.md) |
| MAN-04 | Cupons inexistente e expirado exibem as mensagens previstas; total permanece R$ 119,90. | Aprovado | [Registro](evidencias/man-04/man04.md) |
| MAN-05 | Aplicação, remoção e reaplicação alternam o total entre R$ 109,90 e R$ 119,90, sem acumular desconto. | Aprovado | [Registro](evidencias/man-05/man-05.md) |
| MAN-06 | Incremento bloqueado em cinco unidades; redução para quatro atualiza o total para R$ 139,50. | Aprovado | [Registro](evidencias/man-06/man-06.md) |
| MAN-07 | Pedido VZ-147531 confirmado por R$ 119,90; carrinho vazio após a compra. | Aprovado | [Registro](evidencias/man-07/man-07.md) |
| MAN-08 | Nome, e-mail e CEP inválidos exibem mensagens de validação e bloqueiam a confirmação do pedido. | Aprovado | [Registro](evidencias/man-08/man-08.md) |

## Ocorrências

- MAN-02 e MAN-03 reproduzem o [BUG-001](../docs/bugs.md): cobrança de R$ 19,90 de frete no limite inclusivo de R$ 200,00.
- MAN-01 valida o cálculo com cupom no carrinho; MAN-06 valida o limite de quantidade e a redução; MAN-08 valida o bloqueio de dados inválidos no checkout. As evidências são suficientes para esses objetivos.
