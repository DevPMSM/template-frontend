export const formatCep = (value: string): string => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{5})(\d)/, "$1-$2");

  return value.substring(0, 9);
};

// Formata o número de telefone no padrão (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
export const formatPhoneNumber = (
  value: string
): string => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "($1) $2");

  if (value.length < 14)
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
  else value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value.substring(0, 15);
};

export const passwordsMatch = (
  password: string,
  confirmation: string
): boolean => {
  return password === confirmation;
};
