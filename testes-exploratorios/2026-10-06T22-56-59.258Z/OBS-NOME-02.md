# Sugestão de revisão — OBS-NOME-02

Classificação: Sugestão de melhoria: a documentação não define os caracteres permitidos no nome.

Regra verificada: O nome do cliente precisa ter nome e sobrenome.

Entrada: `{"campo":"nome","valor":"Maria Silva123"}`.

Esperado: Registrar se a loja aceita dígitos; a restrição deve ser definida pelo produto antes de exigir rejeição como critério de aceite.

Sugestão: Definir e documentar a política para dígitos no nome. Se forem proibidos, aplicar a mesma validação na interface e na API, preservando nomes compostos, acentos, apóstrofos e hífens.

Reprodução: adicionar uma mochila, abrir o checkout, manter os outros campos válidos e preencher o campo indicado com a entrada acima. Na API, enviar esses dados com P005 × 1 para POST /api/pedidos.

Verificação complementar às regras da entrega VZS-142. A classificação considera o requisito e as evidências observadas. Falhas de rede ou navegador são registradas como problemas de execução.

## verification-api

Resultado: passed.

Observado: o nome com dígitos foi aceito e o pedido foi confirmado. A observação passou porque registra o comportamento, sem impor uma restrição ausente da especificação.

Evidências:

- [observacao-nome-digitos](evidencias/OBS-NOME-02-verification-api-1.json)

## verification-chromium

Resultado: passed.

Observado: o nome com dígitos foi aceito e o pedido foi confirmado. A observação passou porque registra o comportamento, sem impor uma restrição ausente da especificação.

Evidências:

- [observacao-nome-digitos](evidencias/OBS-NOME-02-verification-chromium-1.json)
- [estado-final-da-interface](evidencias/OBS-NOME-02-verification-chromium-2.png)
