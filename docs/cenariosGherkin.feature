# language: pt
Funcionalidade: Cupom de desconto e frete grátis — VZS-142
  Como cliente da Verzel Store
  Quero aplicar um cupom e receber frete grátis em compras maiores
  Para pagar os valores definidos na promoção

  @CA01 @CA09 @UI-C01 @API-C02
  Cenário: Aplicar desconto apenas sobre os produtos
    Dado que o carrinho contém 1 Mochila Urbana 20L de R$ 100,00
    Quando aplico o cupom "BEMVINDO10"
    Então o desconto deve ser R$ 10,00
    E o frete deve ser R$ 19,90
    E o total deve ser R$ 109,90

  @CA02 @API-C12 @UI-C02
  Esquema do Cenário: Normalizar o código de cupom
    Dado que o carrinho tem subtotal de R$ 100,00
    Quando aplico o cupom "<codigo>"
    Então o código aplicado deve ser "BEMVINDO10"
    E o desconto deve ser R$ 10,00
    Exemplos:
      | codigo           |
      | bemvindo10       |
      | BeMvInDo10       |
      |   BEMVINDO10     |

  @CA03 @CA04 @UI-C03 @UI-C04 @API-C13 @API-C14
  Esquema do Cenário: Informar cupom rejeitado sem desconto no cálculo
    Dado que o carrinho tem subtotal de R$ 100,00
    Quando aplico o cupom "<codigo>"
    Então deve aparecer "<mensagem>"
    E o desconto deve ser R$ 0,00
    E a API de cálculo deve responder 200
    Exemplos:
      | codigo    | mensagem        |
      | NAOEXISTE | Cupom inválido. |
      | VERAO2026 | Cupom expirado. |

  @CA05 @UI-C05
  Cenário: Remover cupom antes de reaplicar
    Dado que BEMVINDO10 está aplicado em subtotal de R$ 100,00
    Então o formulário de aplicação de cupom deve estar oculto
    Quando removo o cupom
    Então o desconto deve ser R$ 0,00
    E o formulário de cupom deve estar disponível
    Quando reaplico BEMVINDO10
    Então o desconto deve ser R$ 10,00

  @CA06 @CA07 @API-C03 @API-C04 @API-C06
  Esquema do Cenário: Calcular frete pelos limites do subtotal
    Dado que o carrinho tem subtotal de R$ <subtotal> sem cupom
    Quando o carrinho é calculado
    Então o frete deve ser R$ <frete>
    E deve faltar R$ <faltante> para frete grátis
    Exemplos:
      | subtotal | frete | faltante |
      | 199,80   | 19,90 | 0,20     |
      | 200,00   | 0,00  | 0,00     |
      | 209,50   | 0,00  | 0,00     |

  @CA08 @API-C05 @API-O02 @UI-F03
  Cenário: Manter frete grátis após desconto no limite
    Dado que o carrinho tem subtotal de R$ 200,00
    Quando aplico BEMVINDO10
    Então o desconto deve ser R$ 20,00
    E o frete deve ser R$ 0,00
    E o total do carrinho e do pedido deve ser R$ 180,00

  @CA10 @UI-F05 @API-C10 @API-VC10 @API-VO10
  Cenário: Limitar unidades por produto na interface e API
    Dado que um produto tem 5 unidades no carrinho
    Então a interface deve impedir aumentar sua quantidade
    Quando envio 6 unidades do mesmo produto à API de cálculo ou de pedidos
    Então a resposta deve ser 422 com QUANTIDADE_MAXIMA_EXCEDIDA

  @CA11 @API-C09
  Cenário: Calcular valores com precisão de centavos
    Dado que o carrinho contém 1 Calça Jeans Slim e 2 Bonés Aba Curva
    Quando aplico BEMVINDO10
    Então o subtotal deve ser R$ 239,70
    E o desconto deve ser R$ 23,97
    E o total deve ser R$ 215,73

  @UI-O01 @API-O01
  Cenário: Confirmar pedido válido com desconto
    Dado que o carrinho tem 1 mochila e BEMVINDO10 aplicado
    Quando finalizo com nome "Maria Silva", e-mail "maria@example.com" e CEP "01310-100"
    Então a API deve responder 201 com número no formato VZ-000000
    E a confirmação deve apresentar total de R$ 109,90
    E o carrinho deve ficar vazio

  @UI-O02 @API-O05
  Cenário: Rejeitar dados inválidos do cliente
    Dado que existe um produto no carrinho
    Quando informo nome "Maria", e-mail "email-invalido" e CEP "1234567"
    Então o pedido não deve ser confirmado
    E os campos devem exibir mensagens de validação

  @UI-F07
  Cenário: Isolar o carrinho entre abas
    Dado que tenho uma mochila e cupom na aba atual
    Quando atualizo a página
    Então os itens e o cupom devem continuar disponíveis
    Quando abro uma nova aba independente
    Então o carrinho dessa aba deve estar vazio
