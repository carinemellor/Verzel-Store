export const numericNames = [
  { id: 'OBS-NOME-01', name: 'nome formado apenas por dígitos', value: '123 456' },
  { id: 'OBS-NOME-02', name: 'dígitos misturados com letras', value: 'Maria Silva123' },
];

export function numericNameAnnotations(check: typeof numericNames[number]) {
  return [
    { type: 'verificacao', description: check.id },
    { type: 'classificacao', description: 'Sugestão de melhoria: a documentação não define os caracteres permitidos no nome.' },
    { type: 'regra', description: 'O nome do cliente precisa ter nome e sobrenome.' },
    { type: 'entrada', description: JSON.stringify({ campo: 'nome', valor: check.value }) },
    { type: 'esperado', description: 'Registrar se a loja aceita dígitos; a restrição deve ser definida pelo produto antes de exigir rejeição como critério de aceite.' },
    { type: 'sugestao', description: 'Definir e documentar a política para dígitos no nome. Se forem proibidos, aplicar a mesma validação na interface e na API, preservando nomes compostos, acentos, apóstrofos e hífens.' },
  ];
}
