export const products = [
  { id: 'P001', nome: 'Camiseta Essencial', preco: 59.9 },
  { id: 'P002', nome: 'Calça Jeans Slim', preco: 139.9 },
  { id: 'P003', nome: 'Tênis Casual Urbano', preco: 189.9 },
  { id: 'P004', nome: 'Boné Aba Curva', preco: 49.9 },
  { id: 'P005', nome: 'Mochila Urbana 20L', preco: 100 },
  { id: 'P006', nome: 'Kit 3 Pares de Meias', preco: 29.9 },
  { id: 'P007', nome: 'Jaqueta Corta-Vento', preco: 229.9 },
  { id: 'P008', nome: 'Garrafa Térmica 750ml', preco: 50 },
] as const;

export const customer = { nome: 'Maria Silva', email: 'maria@example.com', cep: '01310-100' };
export const coupons = { valid: 'BEMVINDO10', expired: 'VERAO2026', invalid: 'NAOEXISTE' };
export type Item = { produtoId: string; quantidade: number };
export const item = (produtoId: string, quantidade = 1): Item => ({ produtoId, quantidade });

export type Cart = {
  itens: { produtoId: string; nome: string; precoUnitario: number; quantidade: number; total: number }[];
  subtotal: number;
  desconto: number;
  frete: number;
  freteGratis: boolean;
  valorFaltanteFreteGratis: number;
  total: number;
  cupom: null | { codigo: string; aplicado: boolean; mensagem: string };
};

export type Order = Cart & {
  numero: string;
  criadoEm: string;
  cliente: typeof customer;
};
