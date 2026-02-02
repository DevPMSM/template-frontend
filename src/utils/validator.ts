// Formata o número de telefone no padrão 999.999.999-99
export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, "");

  // Verifica se tem 11 dígitos e não é uma sequência repetida
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let remainder = 11 - (sum % 11);

  let digit = remainder >= 10 ? 0 : remainder;

  if (digit !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Validação do segundo dígito verificador
  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  remainder = 11 - (sum % 11);
  digit = remainder >= 10 ? 0 : remainder;

  if (digit !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
};

export const checkPasswordStrength = (
  password: string
): {
  strength: "weak" | "medium" | "strong";
  message: string;
} => {
  // Verifica o comprimento mínimo
  if (password.length < 6) {
    return {
      strength: "weak",
      message: "Muito curta",
    };
  }

  // Verifica a complexidade
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(
    password
  );

  const strengthScore =
    (hasLetters ? 1 : 0) +
    (hasNumbers ? 1 : 0) +
    (hasSpecialChars ? 1 : 0);

  if (strengthScore === 1) {
    return {
      strength: "weak",
      message: "Fraca",
    };
  } else if (strengthScore === 2) {
    return {
      strength: "medium",
      message: "Media",
    };
  } else {
    return {
      strength: "strong",
      message: "Forte",
    };
  }
};
