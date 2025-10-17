import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { verificarToken, verificarPapel } from "../middlewares/autenticacao.js"
import { validarEmail, validarSenha, validarCamposObrigatorios } from "../utils/validacao.js"
import { Usuario } from "../models/Usuario.js"
import "dotenv/config"

const roteador = express.Router()
const CHAVE_SECRETA = process.env.JWT_SECRET || "chave-secreta-desenvolvimento"

// ==========================================================
// CADASTRO DE USUÁRIO
// ==========================================================
roteador.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha, papel, data_nascimento, telefone, endereco, habilidades, interesses } = req.body

    validarCamposObrigatorios(req.body, ["nome", "email", "senha", "papel"])

    if (!validarEmail(email)) {
      return res.status(400).json({ erro: "Email inválido" })
    }

    if (!validarSenha(senha)) {
      return res.status(400).json({ erro: "Senha deve ter no mínimo 6 caracteres" })
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } })
    if (usuarioExistente) {
      return res.status(400).json({ erro: "Email já cadastrado" })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      papel,
      data_nascimento,
      telefone,
      endereco,
      habilidades,
      interesses,
    })

    const token = jwt.sign({ id: novoUsuario.id, email: novoUsuario.email, papel: novoUsuario.papel }, CHAVE_SECRETA, {
      expiresIn: "7d",
    })

    const usuarioSemSenha = novoUsuario.toJSON()
    delete usuarioSemSenha.senha

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      usuario: usuarioSemSenha,
      token,
    })
  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: erro.message })
  }
})

// ==========================================================
// LOGIN
// ==========================================================
roteador.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body

    validarCamposObrigatorios(req.body, ["email", "senha"])

    const usuario = await Usuario.findOne({ where: { email } })
    if (!usuario) {
      return res.status(401).json({ erro: "Email ou senha incorretos" })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    if (!senhaValida) {
      return res.status(401).json({ erro: "Email ou senha incorretos" })
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email, papel: usuario.papel }, CHAVE_SECRETA, {
      expiresIn: "7d",
    })

    const usuarioSemSenha = usuario.toJSON()
    delete usuarioSemSenha.senha

    res.json({
      mensagem: "Login realizado com sucesso",
      usuario: usuarioSemSenha,
      token,
    })
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
})

// ==========================================================
// PERFIL DO USUÁRIO
// ==========================================================
roteador.get("/perfil", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: { exclude: ["senha"] },
    })

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" })
    }

    res.json(usuario)
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
})

roteador.put("/perfil", verificarToken, async (req, res) => {
  try {
    const { nome, telefone, endereco, habilidades, interesses, data_nascimento } = req.body

    const usuario = await Usuario.findByPk(req.usuario.id)
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" })
    }

    await usuario.update({
      nome: nome || usuario.nome,
      telefone: telefone || usuario.telefone,
      endereco: endereco || usuario.endereco,
      habilidades: habilidades || usuario.habilidades,
      interesses: interesses || usuario.interesses,
      data_nascimento: data_nascimento || usuario.data_nascimento,
    })

    const usuarioSemSenha = usuario.toJSON()
    delete usuarioSemSenha.senha

    res.json({
      mensagem: "Perfil atualizado com sucesso",
      usuario: usuarioSemSenha,
    })
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
})

// ==========================================================
// INFORMAÇÕES (evita conflito com rota dinâmica)
// ==========================================================
roteador.get("/informacoes", verificarToken, verificarPapel(["VOLUNTARIO", "IDOSO"]), async (req, res) => {
  console.log("Usuário autenticado:", req.usuario)
  console.log("Acesso permitido — papel:", req.usuario.papel)

  try {
    const usuarios = await Usuario.findAll({
      attributes: ["id", "nome", "papel", "data_nascimento", "telefone", "habilidades", "interesses"],
      order: [["nome", "ASC"]],
    })

    if (!usuarios.length) {
      return res.status(404).json({ erro: "Nenhum usuário encontrado" })
    }

    res.json(usuarios)
  } catch (erro) {
    console.error("Erro ao buscar informações dos usuários:", erro)
    res.status(500).json({ erro: "Erro interno ao buscar informações" })
  }
})

// ==========================================================
// ADMIN — GERENCIAMENTO DE USUÁRIOS
// ==========================================================
roteador.get("/usuario/:id", verificarToken, verificarPapel(["ADMIN"]), async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ["senha"] },
    })

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" })
    }

    res.json(usuario)
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
})

roteador.delete("/usuario/:id", verificarToken, verificarPapel(["ADMIN"]), async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" })
    }

    await usuario.destroy()
    res.json({ mensagem: "Usuário deletado com sucesso" })
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
})

export default roteador
