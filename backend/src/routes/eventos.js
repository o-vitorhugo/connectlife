import express from "express"
import { Evento, InscricaoEvento } from "../models/index.js"
import { verificarToken, verificarPapel } from "../middlewares/autenticacao.js"
import { validarCamposObrigatorios } from "../utils/validacao.js"
import { Op } from "sequelize"
import { sequelize as bancoDados } from "../config/database.js"

const roteador = express.Router()

// ======================================================
// ✅ GET /api/eventos — Listar todos os eventos (com filtros)
// ======================================================
roteador.get("/", async (req, res) => {
  try {
    const { categoria, dataInicio, dataFim } = req.query
    const condicoes = {}

    if (categoria) condicoes.categoria = categoria

    if (dataInicio || dataFim) {
      condicoes.data = {}
      if (dataInicio) condicoes.data[Op.gte] = dataInicio
      if (dataFim) condicoes.data[Op.lte] = dataFim
    }

    const eventos = await Evento.findAll({
      where: condicoes,
      order: [["data", "ASC"]],
    })

    res.json(eventos)
  } catch (erro) {
    console.error("❌ Erro ao listar eventos:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

// ======================================================
// ✅ GET /api/eventos/:id — Detalhar um evento
// ======================================================
roteador.get("/:id", async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id)
    if (!evento) return res.status(404).json({ erro: "Evento não encontrado" })
    res.json(evento)
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
})

// ======================================================
// ✅ GET /api/eventos/:id/inscricao — Verificar inscrição do usuário
// ======================================================
roteador.get("/:id/inscricao", verificarToken, async (req, res) => {
  try {
    const idEvento = Number.parseInt(req.params.id)
    const idUsuario = req.usuario?.id

    if (!idUsuario) {
      return res.status(401).json({ erro: "Usuário não autenticado" })
    }

    const inscricao = await InscricaoEvento.findOne({
      where: { id_evento: idEvento, id_usuario: idUsuario },
    })

    res.json({ inscrito: !!inscricao, inscricao })
  } catch (erro) {
    console.error("❌ Erro ao verificar inscrição:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

// ======================================================
// ✅ POST /api/eventos — Criar evento (somente VOLUNTARIO)
// ======================================================
roteador.post("/", verificarToken, verificarPapel("VOLUNTARIO"), async (req, res) => {
  try {
    validarCamposObrigatorios(req.body, ["titulo", "descricao", "data", "hora", "local"])

    const novoEvento = await Evento.create({
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      data: req.body.data,
      hora: req.body.hora,
      local: req.body.local,
      categoria: req.body.categoria || "Geral",
      capacidade: req.body.capacidade || 50,
      imagem: req.body.imagem || "/placeholder.svg",
      organizador: req.body.organizador || "Administração",
      usuarioId: req.body.usuarioId,
      inscritos: 0,
      ativo: true,
    })

    res.status(201).json({
      mensagem: "✅ Evento criado com sucesso",
      evento: novoEvento,
    })
  } catch (erro) {
    console.error("❌ Erro ao criar evento:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

// ======================================================
// ✅ PUT /api/eventos/:id — Atualizar evento (somente VOLUNTARIO)
// ======================================================
roteador.put("/:id", verificarToken, verificarPapel("VOLUNTARIO"), async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id)
    if (!evento) return res.status(404).json({ erro: "Evento não encontrado" })

    await evento.update(req.body)

    res.json({
      mensagem: "✅ Evento atualizado com sucesso",
      evento,
    })
  } catch (erro) {
    console.error("❌ Erro ao atualizar evento:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

// ======================================================
// ✅ DELETE /api/eventos/:id — Deletar evento (somente VOLUNTARIO)
// ======================================================
roteador.delete("/:id", verificarToken, verificarPapel("VOLUNTARIO"), async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id)
    if (!evento) return res.status(404).json({ erro: "Evento não encontrado" })

    await evento.destroy()

    res.json({ mensagem: "🗑️ Evento deletado com sucesso" })
  } catch (erro) {
    console.error("❌ Erro ao deletar evento:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

// ======================================================
// ✅ POST /api/eventos/:id/inscrever — Inscrever usuário logado (somente IDOSO)
// ======================================================
roteador.post("/:id/inscrever", verificarToken, verificarPapel("IDOSO"), async (req, res) => {
  const transacao = await bancoDados.transaction()
  try {
    const idEvento = Number.parseInt(req.params.id)
    const idUsuario = req.usuario?.id

    if (!idUsuario) {
      await transacao.rollback()
      return res.status(401).json({ erro: "Usuário não autenticado" })
    }

    const evento = await Evento.findByPk(idEvento, { transaction: transacao })
    if (!evento) {
      await transacao.rollback()
      return res.status(404).json({ erro: "Evento não encontrado" })
    }

    const inscricaoExistente = await InscricaoEvento.findOne({
      where: { id_evento: idEvento, id_usuario: idUsuario },
      transaction: transacao,
    })

    if (inscricaoExistente) {
      await transacao.rollback()
      return res.status(400).json({ erro: "Usuário já inscrito neste evento" })
    }

    if (evento.inscritos >= evento.capacidade) {
      await transacao.rollback()
      return res.status(400).json({ erro: "Evento lotado" })
    }

    const novaInscricao = await InscricaoEvento.create(
      { id_evento: idEvento, id_usuario: idUsuario, status: "confirmado" },
      { transaction: transacao },
    )

    evento.inscritos += 1
    await evento.save({ transaction: transacao })

    await transacao.commit()

    res.status(201).json({
      mensagem: "🎉 Inscrição realizada com sucesso!",
      inscricao: novaInscricao,
      evento,
    })
  } catch (erro) {
    await transacao.rollback()
    console.error("❌ Erro ao inscrever no evento:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

// ======================================================
// ✅ POST /api/eventos/:id/cancelar-inscricao — Cancelar inscrição (somente IDOSO)
// ======================================================
roteador.post("/:id/cancelar-inscricao", verificarToken, verificarPapel("IDOSO"), async (req, res) => {
  const transacao = await bancoDados.transaction()
  try {
    const idEvento = Number.parseInt(req.params.id)
    const idUsuario = req.usuario?.id

    const evento = await Evento.findByPk(idEvento, { transaction: transacao })
    if (!evento) {
      await transacao.rollback()
      return res.status(404).json({ erro: "Evento não encontrado" })
    }

    const inscricao = await InscricaoEvento.findOne({
      where: { id_evento: idEvento, id_usuario: idUsuario },
      transaction: transacao,
    })

    if (!inscricao) {
      await transacao.rollback()
      return res.status(400).json({ erro: "Você não está inscrito neste evento" })
    }

    await inscricao.destroy({ transaction: transacao })
    evento.inscritos = Math.max(0, evento.inscritos - 1)
    await evento.save({ transaction: transacao })

    await transacao.commit()

    res.json({
      mensagem: "❎ Inscrição cancelada com sucesso",
      evento,
    })
  } catch (erro) {
    await transacao.rollback()
    console.error("❌ Erro ao cancelar inscrição:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

export default roteador
