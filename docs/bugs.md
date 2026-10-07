# Relatório de bugs — Verzel Store 2.3.0

Ambiente: https://verzel-store.qa-test-verzel-store.workers.dev. Data: 06/10/2026 (America/Sao_Paulo). Evidências de testes reais de API e Chromium desktop, sem mocks. Severidade descreve impacto funcional; prioridade é uma proposta de triagem.

| ID | Resumo | Severidade | Prioridade proposta | Estado |
| --- | --- | --- | --- | --- |
| BUG-001 | Frete indevido no subtotal exatamente R$ 200,00 | Alta | P1 | Aberto / reproduzido |
| BUG-002 | API aceita mais de cinco unidades por produto | Média | P2 | Aberto / reproduzido |

## BUG-001 — Frete cobrado no limite inclusivo de R$ 200,00

**Requisito:** CA06, com cobertura adicional de CA08 e cálculo do pedido. Frete grátis com subtotal a partir de R$ 200,00, inclusive, antes do desconto.

**Pré-condição:** carrinho novo. P005 (Mochila Urbana 20L), preço R$ 100,00.

**Passos pela interface:**

1. Abrir a vitrine e adicionar duas mochilas.
2. Abrir o carrinho e observar subtotal, frete, total e aviso de valor faltante.
3. Aplicar BEMVINDO10 e observar o resumo novamente.

**Esperado:** sem cupom, subtotal 200, frete zero e total 200. Com cupom, desconto 20, frete zero e total 180. Nenhum aviso pedindo valor adicional para obter frete grátis.

**Observado:** sem cupom, frete 19,90 e total 219,90. Com cupom, frete 19,90 e total 199,90. A API retorna `freteGratis: false` e `valorFaltanteFreteGratis: 0`; a interface exibe “Faltam R$ 0,00 para o frete grátis.” A criação de pedido também confirma o valor com frete indevido.

**Reprodução direta:**

```bash
curl 'https://verzel-store.qa-test-verzel-store.workers.dev/api/carrinho/calcular' \
  -H 'Content-Type: application/json' \
  -d '{"itens":[{"produtoId":"P005","quantidade":2}],"cupom":"BEMVINDO10"}'
```

**Trecho observado:**

```json
{
  "subtotal": 200,
  "desconto": 20,
  "frete": 19.9,
  "freteGratis": false,
  "valorFaltanteFreteGratis": 0,
  "total": 199.9
}
```

**Impacto:** cobrança R$ 19,90 acima do valor prometido pela promoção, inclusive no pedido confirmado, e orientação contraditória no carrinho.

**Abrangência confirmada:** cálculo e pedido, interface com e sem cupom e alteração de quantidade de 1 para 2. Subtotal de 209,90 com valor descontado abaixo de 200 recebe frete grátis corretamente (API-C07). A evidência demonstra erro no limite inclusivo; não demonstra falha geral de usar subtotal após desconto.

**Evidências:** [API sem cupom](evidencias/API-C04-01.json), [API com cupom](evidencias/API-C05-01.json), [pedido](evidencias/API-O02-01.json), [interface sem cupom](evidencias/UI-F02-01.png) e [interface com cupom](evidencias/UI-F03-01.png). API-C04, API-C05, API-O02 e UI-F02…04 reproduzem o mesmo defeito.

**Sugestão de investigação:** verificar a comparação do limite de frete e sua consistência com o valor faltante. É uma hipótese para o desenvolvedor; o código do backend não foi inspecionado.

## BUG-002 — Limite de cinco unidades não é aplicado pela API

**Requisito:** CA10 e código documentado `QUANTIDADE_MAXIMA_EXCEDIDA` (422).

**Pré-condição:** P005 válido; para criação de pedido, cliente fictício válido.

**Passos:**

1. Enviar P005 com `quantidade: 6` para `/api/carrinho/calcular`.
2. Repetir em `/api/pedidos`, incluindo cliente válido.

**Esperado:** ambos respondem 422 com `erro.codigo: QUANTIDADE_MAXIMA_EXCEDIDA`. O pedido não deve ser confirmado.

**Observado:** cálculo responde 200 com seis mochilas e subtotal/total 600. Pedido responde 201 com número fictício e seis mochilas. A interface bloqueia a sexta unidade; a regra não é imposta nos dois endpoints.

**Reprodução do pedido:**

```bash
curl 'https://verzel-store.qa-test-verzel-store.workers.dev/api/pedidos' \
  -H 'Content-Type: application/json' \
  -d '{"cliente":{"nome":"Maria Silva","email":"maria@example.com","cep":"01310-100"},"itens":[{"produtoId":"P005","quantidade":6}]}'
```

**Impacto:** consumidores da API conseguem calcular e confirmar pedidos incompatíveis com a regra de negócio. Trata-se de validação funcional de quantidade, dentro do escopo.

**Evidências:** [cálculo 200](evidencias/API-VC10-01.json) e [pedido 201](evidencias/API-VO10-01.json). API-VC10 e API-VO10 reprovam; UI-F05 aprova e confirma o limite na interface.

**Sugestão de investigação:** aplicar a mesma validação de quantidade máxima em cálculo e pedido, antes de calcular ou confirmar.

## Observação não classificada como bug

Remover individualmente o último item preservou o cupom ao adicionar um produto novamente. A especificação não define se essa ação deve remover o cupom; registra-se como ambiguidade. `Esvaziar carrinho` removeu o cupom. As simplificações de sessão, estoque, e-mail e persistência não foram reportadas como defeitos.
