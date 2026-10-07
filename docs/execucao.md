# Resultado da execução automatizada

Início: 06/10/2026, 19:19:52 (America/Sao_Paulo).
Status: **failed**. Duração: 235.5 s.

| Projeto | Cenário | Resultado | Duração (ms) | Tentativa |
| --- | --- | --- | ---: | ---: |
| api | API-C01 CA07 abaixo do limite sem cupom @smoke | passed | 127 | 1 |
| api | API-C02 CA01 CA09 desconto somente nos produtos @smoke | passed | 108 | 1 |
| api | API-C03 CA06 abaixo do limite (199,80) | passed | 108 | 1 |
| api | API-C04 CA06 exatamente no limite sem cupom | failed | 128 | 1 |
| api | API-C05 CA06 CA08 exatamente no limite com cupom | failed | 140 | 1 |
| api | API-C06 CA06 acima do limite (209,50) | passed | 120 | 1 |
| api | API-C07 CA08 subtotal acima do limite e valor com desconto abaixo dele | passed | 100 | 1 |
| api | API-C08 CA06 subtotal acima do limite @smoke | passed | 102 | 1 |
| api | API-C09 CA01 CA11 exemplo documentado com múltiplos produtos | passed | 104 | 1 |
| api | API-C10 CA10 aceita exatamente cinco unidades | passed | 102 | 1 |
| api | API-C11 CA11 precisão decimal de subtotal, desconto e total | passed | 99 | 1 |
| api | API-C12-1 CA02 normaliza "bemvindo10" | passed | 100 | 1 |
| api | API-C12-2 CA02 normaliza "BeMvInDo10" | passed | 97 | 1 |
| api | API-C12-3 CA02 normaliza "  BEMVINDO10  " | passed | 114 | 1 |
| api | API-C12-4 CA02 normaliza "  bemvindo10  " | passed | 102 | 1 |
| api | API-C13 CA03 calcula sem desconto e informa Cupom inválido. | passed | 92 | 1 |
| api | API-C14 CA04 calcula sem desconto e informa Cupom expirado. | passed | 94 | 1 |
| api | API-C15 cálculo não mantém o cupom entre requisições | passed | 125 | 1 |
| api | API-JC1 corpo JSON inválido { em /api/carrinho/calcular | passed | 119 | 1 |
| api | API-JC2 corpo JSON inválido null em /api/carrinho/calcular | passed | 106 | 1 |
| api | API-JC3 corpo JSON inválido [] em /api/carrinho/calcular | passed | 95 | 1 |
| api | API-JC4 corpo JSON inválido "texto" em /api/carrinho/calcular | passed | 108 | 1 |
| api | API-JO1 corpo JSON inválido { em /api/pedidos | passed | 121 | 1 |
| api | API-JO2 corpo JSON inválido null em /api/pedidos | passed | 116 | 1 |
| api | API-JO3 corpo JSON inválido [] em /api/pedidos | passed | 104 | 1 |
| api | API-JO4 corpo JSON inválido "texto" em /api/pedidos | passed | 103 | 1 |
| api | API-MC método GET não permitido em /api/carrinho/calcular | passed | 95 | 1 |
| api | API-MO método GET não permitido em /api/pedidos | passed | 100 | 1 |
| api | API-O01-1 @smoke confirma pedido e normaliza CEP 01310-100 | passed | 107 | 1 |
| api | API-O01-2 @smoke confirma pedido e normaliza CEP 01310100 | passed | 102 | 1 |
| api | API-O02 CA06 CA08 pedido preserva frete grátis com subtotal 200 e cupom | failed | 107 | 1 |
| api | API-O03 bloqueia pedido com NAOEXISTE | passed | 121 | 1 |
| api | API-O04 bloqueia pedido com VERAO2026 | passed | 135 | 1 |
| api | API-O05-1 rejeita nome inválido com detalhes de campo | passed | 108 | 1 |
| api | API-O05-2 rejeita email inválido com detalhes de campo | passed | 117 | 1 |
| api | API-O05-3 rejeita cep inválido com detalhes de campo | passed | 97 | 1 |
| api | API-P01 @smoke lista o catálogo fixo com tipos, preços e IDs únicos | passed | 104 | 1 |
| api | API-P02-P001 consulta P001 e valida seu contrato | passed | 107 | 1 |
| api | API-P02-P002 consulta P002 e valida seu contrato | passed | 94 | 1 |
| api | API-P02-P003 consulta P003 e valida seu contrato | passed | 102 | 1 |
| api | API-P02-P004 consulta P004 e valida seu contrato | passed | 97 | 1 |
| api | API-P02-P005 consulta P005 e valida seu contrato | passed | 97 | 1 |
| api | API-P02-P006 consulta P006 e valida seu contrato | passed | 103 | 1 |
| api | API-P02-P007 consulta P007 e valida seu contrato | passed | 103 | 1 |
| api | API-P02-P008 consulta P008 e valida seu contrato | passed | 107 | 1 |
| api | API-P03 produto inexistente responde 404 | passed | 103 | 1 |
| api | API-P04 rota inexistente responde 404 | passed | 98 | 1 |
| api | API-P05 método não permitido responde 405 | passed | 98 | 1 |
| api | API-VC01 rejeita itens ausentes em /api/carrinho/calcular | passed | 105 | 1 |
| api | API-VC02 rejeita itens vazios em /api/carrinho/calcular | passed | 88 | 1 |
| api | API-VC03 rejeita item nulo em /api/carrinho/calcular | passed | 98 | 1 |
| api | API-VC04 rejeita produto inexistente em /api/carrinho/calcular | passed | 101 | 1 |
| api | API-VC05 rejeita produto duplicado em /api/carrinho/calcular | passed | 91 | 1 |
| api | API-VC06 rejeita quantidade zero em /api/carrinho/calcular | passed | 105 | 1 |
| api | API-VC07 rejeita quantidade negativa em /api/carrinho/calcular | passed | 94 | 1 |
| api | API-VC08 rejeita quantidade fracionária em /api/carrinho/calcular | passed | 98 | 1 |
| api | API-VC09 rejeita quantidade como texto em /api/carrinho/calcular | passed | 88 | 1 |
| api | API-VC10 rejeita CA10 seis unidades em /api/carrinho/calcular | failed | 95 | 1 |
| api | API-VO01 rejeita itens ausentes em /api/pedidos | passed | 99 | 1 |
| api | API-VO02 rejeita itens vazios em /api/pedidos | passed | 107 | 1 |
| api | API-VO03 rejeita item nulo em /api/pedidos | passed | 109 | 1 |
| api | API-VO04 rejeita produto inexistente em /api/pedidos | passed | 119 | 1 |
| api | API-VO05 rejeita produto duplicado em /api/pedidos | passed | 101 | 1 |
| api | API-VO06 rejeita quantidade zero em /api/pedidos | passed | 106 | 1 |
| api | API-VO07 rejeita quantidade negativa em /api/pedidos | passed | 99 | 1 |
| api | API-VO08 rejeita quantidade fracionária em /api/pedidos | passed | 110 | 1 |
| api | API-VO09 rejeita quantidade como texto em /api/pedidos | passed | 106 | 1 |
| api | API-VO10 rejeita CA10 seis unidades em /api/pedidos | failed | 114 | 1 |
| chromium | UI-C01 @smoke CA01 CA09 aplica 10% somente sobre os produtos | passed | 8275 | 1 |
| chromium | UI-C02-1 CA02 normaliza "bemvindo10" na interface | passed | 8284 | 1 |
| chromium | UI-C02-2 CA02 normaliza "  BeMvInDo10  " na interface | passed | 8270 | 1 |
| chromium | UI-C03 CA03 exibe Cupom inválido. sem aplicar desconto | passed | 8286 | 1 |
| chromium | UI-C04 CA04 exibe Cupom expirado. sem aplicar desconto | passed | 8273 | 1 |
| chromium | UI-C05 CA05 remove o cupom antes de aplicar novamente | passed | 12813 | 1 |
| chromium | UI-C06 impede aplicação de cupom em branco | passed | 8223 | 1 |
| chromium | UI-F01 @smoke CA07 cobra frete fixo e informa valor faltante | passed | 5364 | 1 |
| chromium | UI-F02 CA06 oferece frete grátis exatamente em R$ 200,00 | failed | 28491 | 1 |
| chromium | UI-F03 CA08 mantém frete grátis ao aplicar cupom no subtotal 200 | failed | 20681 | 1 |
| chromium | UI-F04 CA08 recalcula frete e cupom ao aumentar a quantidade | failed | 20729 | 1 |
| chromium | UI-F05 @smoke CA10 limita cinco unidades na vitrine e no carrinho | passed | 12847 | 1 |
| chromium | UI-F06 remove o último produto e permite adicionar um novo item | passed | 14371 | 1 |
| chromium | UI-F07 ambiente preserva a mesma aba e isola uma nova aba | passed | 11936 | 1 |
| chromium | UI-F08 esvazia o carrinho e remove o cupom aplicado | passed | 14260 | 1 |
| chromium | UI-O01 @smoke finaliza pedido com cupom e confere confirmação e carrinho vazio | passed | 17422 | 1 |
| chromium | UI-O02 valida nome, e-mail e CEP inválidos antes de confirmar pedido | passed | 12809 | 1 |
| chromium | UI-O03 redireciona checkout com carrinho vazio para o carrinho | passed | 2183 | 1 |

Resultados obtidos pela suíte automatizada. A execução manual possui registro separado em testes-manuais/execucao.md.
