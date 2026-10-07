# Testes exploratórios e verificações complementares

Esta pasta reúne os resultados da suíte automatizada de verificações complementares das regras preexistentes de nome, e-mail e CEP, além de observações e sugestões geradas por essas verificações. Ela está separada dos cenários CA01–CA11 e do relatório de bugs da entrega VZS-142.

Também está registrada a [sugestão sobre mensagens de validação que permanecem durante a edição](feedback-validacao-checkout.md), com a captura enviada e passos para confirmar o comportamento.

A aceitação de nomes numéricos ou com dígitos está descrita em [nome com dígitos](nome-com-digitos.md), como sugestão de esclarecimento e melhoria do requisito.

O [resultado das 52 verificações complementares](testes-complementares.md) registra 48 aprovações e quatro reprovações. A [exploração da permanência do cupom](permanencia-cupom.md) possui vídeo, sem conclusão documentada sobre o resultado.

```bash
npm run test:verification
npm run report:verification
```

As verificações ficam em `verifications/`, com configuração em `playwright.verification.config.ts`. São 24 entradas verificadas na API e na interface (48 verificações) e duas entradas adicionais para observar nomes com dígitos nas duas camadas (4 observações): 52 testes ao todo. Em cada caso, somente o campo em análise varia; os outros dados permanecem válidos.

- Nome: nome/sobrenome, nome composto, acentos/apóstrofo; vazio e ausência de sobrenome.
- Observações de nome: `123 456` e `Maria Silva123`. A aceitação gera uma sugestão de melhoria com evidências, sem reprovar por uma restrição não definida na documentação.
- E-mail: endereço simples, tag e subdomínio; partes ausentes, arroba duplicada e domínio malformado.
- CEP: oito dígitos com/sem hífen; vazio, sete/nove dígitos, letras e hífen incorreto/duplicado.

O termo “formato válido” foi interpretado como formato usual de endereço de e-mail. Domínio começando com ponto ou com pontos consecutivos tem um componente vazio; esses casos foram incluídos com base na [definição de e-mail do padrão HTML](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address). Não há consulta DNS, envio de e-mail ou validação da existência do CEP.
