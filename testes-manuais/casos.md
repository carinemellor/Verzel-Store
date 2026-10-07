# Casos de teste manual

Os casos cobrem cupons, frete, quantidade e checkout. Os resultados observados estão em [`execucao.md`](execucao.md), com imagens em [`evidencias/`](evidencias/README.md).

## MAN-01 — Desconto e frete abaixo do limite

**Dados:** uma Mochila Urbana 20L (P005, R$ 100,00); cupom `BEMVINDO10`.

1. Adicione uma mochila ao carrinho pela vitrine e abra o carrinho.
2. Confirme subtotal de R$ 100,00, frete de R$ 19,90 e total de R$ 119,90.
3. Aplique `BEMVINDO10`.

**Esperado:** no carrinho, desconto de R$ 10,00 sobre os produtos, frete de R$ 19,90 e total de R$ 109,90.

## MAN-02 — Frete grátis sem cupom no limite

**Dados:** duas mochilas P005; sem cupom.

1. Adicione duas mochilas e abra o carrinho.
2. Confira subtotal e resumo do pedido.

**Esperado:** subtotal de R$ 200,00, frete grátis e total de R$ 200,00.

## MAN-03 — Frete grátis com cupom no limite

**Dados:** duas mochilas P005; cupom `BEMVINDO10`.

1. Adicione duas mochilas, abra o carrinho e aplique `BEMVINDO10`.
2. Confira desconto, frete, total e aviso de valor faltante.

**Esperado:** subtotal R$ 200,00, desconto R$ 20,00, frete grátis, total R$ 180,00 e nenhum valor faltante. Este caso ajuda a reproduzir o BUG-001.

## MAN-04 — Cupom inexistente e expirado

**Dados:** uma mochila P005.

1. No carrinho, tente aplicar `NAOEXISTE`.
2. Registre mensagem e total. Remova a mensagem ou recarregue o carrinho, se necessário.
3. Tente aplicar `VERAO2026` e registre novamente.

**Esperado:** `Cupom inválido.` e `Cupom expirado.`, respectivamente. Nenhum deles aplica desconto; com subtotal de R$ 100,00 o total permanece R$ 119,90.

## MAN-05 — Remover e reaplicar cupom

**Dados:** uma mochila P005; cupom `BEMVINDO10`.

1. Aplique o cupom e registre o total.
2. Remova-o e confirme que o formulário de cupom volta a aparecer.
3. Reaplique-o e confira os valores.

**Esperado:** aplicado: desconto R$ 10,00 e total R$ 109,90; removido: desconto zero e total R$ 119,90; reaplicado: volta aos valores com desconto. Não há soma de descontos.

## MAN-06 — Limite de cinco unidades na interface

**Dados:** Kit 3 Pares de Meias (P006), R$ 29,90.

1. Adicione um kit na vitrine, abra o carrinho e aumente a quantidade até cinco.
2. Observe o botão de aumentar a quantidade e o aviso de limite.
3. Diminua a quantidade para quatro.

**Esperado:** o botão de aumentar fica bloqueado em cinco unidades e a interface informa o limite. Ao diminuir para quatro, o subtotal passa a R$ 119,60 e o total a R$ 139,50.

## MAN-07 — Checkout válido

**Dados:** uma mochila P005, sem cupom; nome `Maria Silva`, e-mail `maria@example.com`, CEP `01310-100`.

1. Adicione o produto, prossiga ao checkout e informe os dados.
2. Confirme o pedido.
3. Observe a página de confirmação e volte ao carrinho.

**Esperado:** pedido confirmado, resumo com subtotal de R$ 100,00, frete R$ 19,90, total R$ 119,90 e carrinho vazio. A compra é fictícia, sem cobrança ou e-mail.

## MAN-08 — Validação dos dados no checkout

**Dados:** uma mochila; nome `Maria`, e-mail `email-invalido` e CEP `1234567`.

1. Abra o checkout e preencha os três campos com esses valores.
2. Tente confirmar o pedido.

**Esperado:** erros indicam nome/sobrenome, formato de e-mail e oito dígitos do CEP. O pedido não é confirmado e o checkout permanece aberto.
