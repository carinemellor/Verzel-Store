# Sugestão de revisão — VER-EMAIL-09

**Observado:** `maria@.example.com` foi aceito pela interface e pela API. O backend respondeu 201 e o navegador exibiu a confirmação do pedido.

**Sugestão:** rejeitar domínios iniciados por ponto, com validação consistente na interface e no servidor. A definição de formato válido foi fundamentada no [padrão HTML](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address), conforme documentado no README desta pasta.

Regra verificada: O e-mail precisa ter um formato válido.

Entrada: `{"campo":"email","valor":"maria@.example.com"}`.

Esperado: Rejeitar o campo inválido e não confirmar pedido.

Reprodução: adicionar uma mochila, abrir o checkout, manter os outros campos válidos e preencher o campo indicado com a entrada acima. Na API, enviar esses dados com P005 × 1 para POST /api/pedidos.

Verificação complementar às regras da entrega VZS-142. A classificação considera o requisito e as evidências observadas. Falhas de rede ou navegador são registradas como problemas de execução.

## verification-api

Resultado: failed.

Erros observados:

```text
Error: POST /api/pedidos: {"numero":"VZ-695286","criadoEm":"2026-10-06T22:50:45.954Z","cliente":{"nome":"Maria Silva","email":"maria@.example.com","cep":"01310100"},"itens":[{"produtoId":"P005","nome":"Mochila Urbana 20L","precoUnitario":100,"quantidade":1,"total":100}],"subtotal":100,"desconto":0,"frete":19.9,"freteGratis":false,"valorFaltanteFreteGratis":100,"total":119.9,"cupom":null}

expect(received).toBe(expected) // Object.is equality

Expected: 422
Received: 201
```

Evidências:

- [HTTP POST /api/pedidos](evidencias/VER-EMAIL-09-verification-api-1.json)

## verification-chromium

Resultado: failed.

Erros observados:

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByLabel('E-mail', { exact: true })
Expected: "true"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" getByLabel('E-mail', { exact: true }) with timeout 10000ms
  - waiting for getByLabel('E-mail', { exact: true })
    2 × locator resolved to <input name="email" type="email" id="campo-email" autocomplete="email" value="maria@.example.com"/>
      - unexpected value "null"

```

Evidências:

- [pedido-enviado-pela-interface](evidencias/VER-EMAIL-09-verification-chromium-1.json)
- [dados-da-verificacao](evidencias/VER-EMAIL-09-verification-chromium-2.json)
- [screenshot](evidencias/VER-EMAIL-09-verification-chromium-3.png)
- [estado-final-da-interface](evidencias/VER-EMAIL-09-verification-chromium-4.png)
