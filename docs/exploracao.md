## EX-01 — Limites de frete

Objetivo: comparar subtotal abaixo, exatamente no limite e acima, com e sem desconto, verificando API, carrinho e pedido.

Dados: P001 + P002 (199,80); P005 × 2 (200); P004 × 3 + P006 × 2 (209,50); P005 + P001 + P008 (209,90). BEMVINDO10 nos casos com cupom.

Observado: abaixo do limite, frete fixo e valor faltante corretos. Acima, frete zero, inclusive quando o desconto reduz o valor para menos de 200. Exatamente em 200, cobrança de frete e aviso de faltante zero. Aumentar uma mochila para duas reproduziu o erro; confirmação via API manteve o frete incorreto.

Resultado: BUG-001; regressão API-C04, API-C05, API-O02 e UI-F02…04. A investigação restringiu o problema confirmado ao limite inclusivo.

## EX-02 — Quantidade na interface e API

Objetivo: verificar se o limite da interface é aplicado no contrato HTTP.

Dados: cinco unidades de P006 na interface; seis de P005 nas APIs. Quantidades 0, -1, 1,5 e texto como partições inválidas.

Observado: interface bloqueia incremento em cinco e o habilita após diminuir. API rejeita zero, negativo, fração e texto, mas aceita seis e confirma pedido.

Resultado: BUG-002, API-VC10 e API-VO10. UI-F05 confirma o limite no navegador.

## EX-03 — Cupom e sessão

Objetivo: verificar remoção, esvaziamento, atualização e nova aba, respeitando as simplificações intencionais.

Observado: atualizar preserva itens/cupom; nova aba começa vazia. Remover o último item individualmente preserva o cupom ao adicionar novamente. Esvaziar remove itens e cupom. Remover e reaplicar o cupom não soma descontos.

Resultado: sessão conforme; persistência do cupom após remover o último item é ambiguidade, sem divergência explícita de requisito. A [observação JSON](evidencias/UI-F06-01.json) registra o desconto encontrado. O [vídeo da exploração manual](../testes-exploratorios/permanencia-cupom.md) complementa esse registro, sem conclusão documentada sobre a regra esperada.
