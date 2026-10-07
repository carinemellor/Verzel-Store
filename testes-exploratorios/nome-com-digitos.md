# Sugestão — aceitação de dígitos no nome do cliente

**Confirmado em 06/10/2026, às 19:56 (America/Sao_Paulo)**, na interface e na API da Verzel Store 2.3.0.

| Entrada no nome | Interface | POST /api/pedidos |
| --- | --- | --- |
| `123 456` | Pedido confirmado | 201; nome numérico preservado |
| `Maria Silva123` | Pedido confirmado | 201; dígitos preservados |

## Reprodução

1. Adicionar uma mochila e abrir o checkout.
2. Informar um dos nomes acima, e-mail `maria@example.com` e CEP `01310-100`.
3. Confirmar o pedido.

Na API, enviar os mesmos dados em `cliente`, junto de `itens: [{ "produtoId": "P005", "quantidade": 1 }]`, para `/api/pedidos`.

## Observação e proposta

A loja confirma o pedido sem mensagem de validação para o nome. A regra documentada exige nome e sobrenome, mas não define os caracteres permitidos. Por isso, a aceitação de dígitos está registrada como **sugestão de melhoria e esclarecimento do requisito**, sem tratá-la como violação de uma proibição explícita.

Recomenda-se definir se dígitos devem ser rejeitados e aplicar a política na interface e na API. A validação deve preservar nomes compostos, acentos, apóstrofos e hífens; não deve restringir nomes a letras ASCII.

## Evidências e automação

- [Nome somente numérico: interface e API](2026-10-06T22-56-59.258Z/OBS-NOME-01.md).
- [Nome com letras e dígitos: interface e API](2026-10-06T22-56-59.258Z/OBS-NOME-02.md).
- Testes em `verifications/api/numeric-names.spec.ts` e `verifications/ui/numeric-names.spec.ts`.

Esses testes registram aceitação/rejeição e validam o contrato observado. A aceitação gera automaticamente sugestões com JSON e screenshot. As quatro observações passaram, pois o registro foi concluído; isso não significa aprovação de negócio para nomes com dígitos.
