export type Field = 'nome' | 'email' | 'cep';
export type CustomerCheck = {
  id: string;
  field: Field;
  name: string;
  value: string;
  valid: boolean;
};

export const customerChecks: CustomerCheck[] = [
  { id: 'VER-NOME-01', field: 'nome', name: 'nome e sobrenome', value: 'Maria Silva', valid: true },
  { id: 'VER-NOME-02', field: 'nome', name: 'nome composto', value: 'Ana Maria Santos', valid: true },
  { id: 'VER-NOME-03', field: 'nome', name: 'acentos e apóstrofo', value: "João D'Ávila", valid: true },
  { id: 'VER-NOME-04', field: 'nome', name: 'nome vazio', value: '', valid: false },
  { id: 'VER-NOME-05', field: 'nome', name: 'apenas primeiro nome', value: 'Maria', valid: false },
  { id: 'VER-NOME-06', field: 'nome', name: 'espaços não substituem sobrenome', value: '  Maria  ', valid: false },
  { id: 'VER-EMAIL-01', field: 'email', name: 'e-mail simples', value: 'maria@example.com', valid: true },
  { id: 'VER-EMAIL-02', field: 'email', name: 'e-mail com ponto e tag', value: 'maria.silva+qa@example.com', valid: true },
  { id: 'VER-EMAIL-03', field: 'email', name: 'e-mail com subdomínio', value: 'maria@sub.example.com', valid: true },
  { id: 'VER-EMAIL-04', field: 'email', name: 'e-mail vazio', value: '', valid: false },
  { id: 'VER-EMAIL-05', field: 'email', name: 'ausência de arroba', value: 'maria.example.com', valid: false },
  { id: 'VER-EMAIL-06', field: 'email', name: 'domínio ausente', value: 'maria@', valid: false },
  { id: 'VER-EMAIL-07', field: 'email', name: 'parte local ausente', value: '@example.com', valid: false },
  { id: 'VER-EMAIL-08', field: 'email', name: 'arroba duplicada', value: 'maria@@example.com', valid: false },
  { id: 'VER-EMAIL-09', field: 'email', name: 'domínio iniciado por ponto', value: 'maria@.example.com', valid: false },
  { id: 'VER-EMAIL-10', field: 'email', name: 'pontos consecutivos no domínio', value: 'maria@example..com', valid: false },
  { id: 'VER-CEP-01', field: 'cep', name: 'oito dígitos sem hífen', value: '01310100', valid: true },
  { id: 'VER-CEP-02', field: 'cep', name: 'oito dígitos com hífen', value: '01310-100', valid: true },
  { id: 'VER-CEP-03', field: 'cep', name: 'CEP vazio', value: '', valid: false },
  { id: 'VER-CEP-04', field: 'cep', name: 'sete dígitos', value: '0131010', valid: false },
  { id: 'VER-CEP-05', field: 'cep', name: 'nove dígitos', value: '013101000', valid: false },
  { id: 'VER-CEP-06', field: 'cep', name: 'letra entre os dígitos', value: '0131A100', valid: false },
  { id: 'VER-CEP-07', field: 'cep', name: 'hífen em posição incorreta', value: '0131-0100', valid: false },
  { id: 'VER-CEP-08', field: 'cep', name: 'hífen duplicado', value: '01310--100', valid: false },
];

export const fieldLabels = { nome: 'Nome completo', email: 'E-mail', cep: 'CEP' };
export const rules = {
  nome: 'O nome do cliente precisa ter nome e sobrenome.',
  email: 'O e-mail precisa ter um formato válido.',
  cep: 'O CEP precisa ter 8 dígitos, com ou sem hífen.',
};

export function annotations(check: CustomerCheck) {
  return [
    { type: 'verificacao', description: check.id },
    { type: 'regra', description: rules[check.field] },
    { type: 'entrada', description: JSON.stringify({ campo: check.field, valor: check.value }) },
    { type: 'esperado', description: check.valid ? 'Aceitar dados válidos e confirmar pedido.' : 'Rejeitar o campo inválido e não confirmar pedido.' },
    { type: 'sugestao', description: {
      nome: 'Revisar a validação de nome e sobrenome na interface e na API, respeitando nomes compostos, acentos e apóstrofos.',
      email: 'Alinhar as validações da interface e da API para rejeitar componentes vazios no domínio do e-mail antes de confirmar o pedido.',
      cep: 'Alinhar as validações da interface e da API para exigir oito dígitos e aceitar apenas o hífen opcional na posição correta.',
    }[check.field] },
  ];
}
