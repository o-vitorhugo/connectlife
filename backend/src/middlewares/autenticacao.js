import jwt from "jsonwebtoken"

export const CHAVE_SECRETA = process.env.JWT_SECRET || "chave-secreta-desenvolvimento"

// ========================== //
// 🔒 Verifica o token JWT //
// ========================== //
export function verificarToken(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "")

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" })
  }

  try {
    const decodificado = jwt.verify(token, CHAVE_SECRETA)
    req.usuario = decodificado
    next()
  } catch (erro) {
    console.error("❌ Erro ao verificar token:", erro.message)
    return res.status(401).json({ erro: "Token inválido" })
  }
}

// ========================== //
// 🧾 Verifica se o papel do usuário tem permissão //
// Aceita maiúsculas e minúsculas //
// ========================== //
export function verificarPapel(papeisPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ erro: "Não autenticado" })
    }

    const papeis = Array.isArray(papeisPermitidos)
      ? papeisPermitidos.map((p) => p.toUpperCase())
      : [String(papeisPermitidos).toUpperCase()]

    const papelUsuario = String(req.usuario.papel).toUpperCase()

    console.log("Papeis permitidos:", papeis)
    console.log("Papel do usuário autenticado:", papelUsuario)

    if (!papeis.includes(papelUsuario)) {
      console.log(`Acesso negado — papel do usuário: ${req.usuario.papel}`)
      return res.status(403).json({ erro: "Sem permissão" })
    }

    console.log(`Acesso permitido — papel do usuário: ${req.usuario.papel}`)
    next()
  }
}
