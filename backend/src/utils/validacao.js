// Funções utilitárias de validação

export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarSenha(senha) {
  return senha && senha.length >= 6;
}

export function validarCamposObrigatorios(objeto, campos) {
  const camposFaltando = campos.filter((campo) => !objeto[campo]);

  if (camposFaltando.length > 0) {
    throw new Error(`Campos obrigatórios faltando: ${camposFaltando.join(", ")}`);
  }
}
