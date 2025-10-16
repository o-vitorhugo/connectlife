import express from "express"
import { Op } from "sequelize"
import { verificarToken, verificarPapel } from "../middlewares/autenticacao.js"
import { validarCamposObrigatorios } from "../utils/validacao.js"
import { Agendamento, Atividade, Usuario } from "../models/index.js"

const roteador = express.Router()

// ===============================
// ===============================
async function atualizarAgendamentosExpirados(agendamentos) {
  const agora = new Date()
  console.log(" Verificando agendamentos expirados. Data/hora atual:", agora)

  for (const agendamento of agendamentos) {
    if (agendamento.status === "confirmado") {
      // Converter data e hora para objeto Date
      const dataAgendamento = new Date(agendamento.data)
      const [hora, minuto, segundo] = agendamento.hora.split(":")

      // Criar data/hora completa do agendamento
      const dataHoraAgendamento = new Date(
        dataAgendamento.getFullYear(),
        dataAgendamento.getMonth(),
        dataAgendamento.getDate(),
        Number.parseInt(hora),
        Number.parseInt(minuto),
        Number.parseInt(segundo || 0),
      )

      console.log(
        "[v0] Agendamento ID:",
        agendamento.id,
        "Data/Hora:",
        dataHoraAgendamento,
        "Status:",
        agendamento.status,
      )

      // Se já passou, atualizar para concluído
      if (dataHoraAgendamento < agora) {
        console.log("[v0] Atualizando agendamento", agendamento.id, "para concluído")
        await agendamento.update({ status: "concluido" })
      }
    }
  }
}

// ===============================
// GET /api/agendamentos
// ===============================
roteador.get("/", verificarToken, async (req, res) => {
  try {
    const { status } = req.query
    const usuarioId = req.usuario.id

    const where = {
      [Op.or]: [{ id_idoso: usuarioId }, { id_voluntario: usuarioId }],
      ...(status && { status }),
    }

    const agendamentos = await Agendamento.findAll({
      where,
      include: [
        { model: Atividade, as: "atividade" },
        { model: Usuario, as: "idoso", attributes: ["id", "nome", "email"] },
        { model: Usuario, as: "voluntario", attributes: ["id", "nome", "email"] },
      ],
    })

    await atualizarAgendamentosExpirados(agendamentos)

    const agendamentosAtualizados = await Agendamento.findAll({
      where,
      include: [
        { model: Atividade, as: "atividade" },
        { model: Usuario, as: "idoso", attributes: ["id", "nome", "email"] },
        { model: Usuario, as: "voluntario", attributes: ["id", "nome", "email"] },
      ],
    })

    res.json(agendamentosAtualizados)
  } catch (erro) {
    console.error("Erro ao listar agendamentos:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

// ===============================
// GET /api/agendamentos/:id
// ===============================
roteador.get("/:id", verificarToken, async (req, res) => {
  try {
    const agendamento = await Agendamento.findByPk(req.params.id, {
      include: [
        { model: Atividade, as: "atividade" },
        { model: Usuario, as: "idoso", attributes: ["id", "nome", "email"] },
        { model: Usuario, as: "voluntario", attributes: ["id", "nome", "email"] },
      ],
    })

    if (!agendamento) return res.status(404).json({ erro: "Agendamento não encontrado" })

    const usuario = req.usuario
    if (agendamento.id_idoso !== usuario.id && agendamento.id_voluntario !== usuario.id) {
      return res.status(403).json({ erro: "Sem permissão para acessar este agendamento" })
    }

    await atualizarAgendamentosExpirados([agendamento])
    await agendamento.reload()

    res.json(agendamento)
  } catch (erro) {
    console.error("Erro ao buscar agendamento:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

// ===============================
// POST /api/agendamentos
// ===============================
roteador.post("/", verificarToken, verificarPapel(["IDOSO"]), async (req, res) => {
  try {
    const { id_atividade, id_voluntario, data, hora, observacoes } = req.body

    validarCamposObrigatorios(req.body, ["id_atividade", "data", "hora"])

    const atividade = await Atividade.findByPk(id_atividade)
    if (!atividade) return res.status(404).json({ erro: "Atividade não encontrada." })

    const novoAgendamento = await Agendamento.create({
      id_atividade,
      id_idoso: req.usuario.id,
      id_voluntario: id_voluntario || null,
      data,
      hora,
      status: "pendente",
      observacoes: observacoes || "",
    })

    res.status(201).json({
      mensagem: "Agendamento criado com sucesso!",
      agendamento: novoAgendamento,
    })
  } catch (erro) {
    console.error("Erro ao criar agendamento:", erro)
    res.status(500).json({ erro: "Erro ao criar agendamento.", detalhes: erro.message })
  }
})

// ===============================
// PUT /api/agendamentos/:id
// ===============================
roteador.put("/:id", verificarToken, async (req, res) => {
  try {
    const agendamento = await Agendamento.findByPk(req.params.id)
    if (!agendamento) return res.status(404).json({ erro: "Agendamento não encontrado" })

    const usuario = req.usuario
    const papelUsuario = usuario.papel.toUpperCase()

    if (papelUsuario === "IDOSO" && agendamento.id_idoso !== usuario.id) {
      return res.status(403).json({ erro: "Sem permissão para atualizar este agendamento" })
    }

    if (papelUsuario === "VOLUNTARIO" && agendamento.id_voluntario !== usuario.id) {
      return res.status(403).json({ erro: "Sem permissão para atualizar este agendamento" })
    }

    await agendamento.update(req.body)
    res.json({ mensagem: "Agendamento atualizado com sucesso", agendamento })
  } catch (erro) {
    console.error("Erro ao atualizar agendamento:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

// ===============================
// DELETE /api/agendamentos/:id
// ===============================
roteador.delete("/:id", verificarToken, async (req, res) => {
  try {
    const agendamento = await Agendamento.findByPk(req.params.id)
    if (!agendamento) return res.status(404).json({ erro: "Agendamento não encontrado" })

    const usuario = req.usuario
    if (agendamento.id_idoso !== usuario.id && agendamento.id_voluntario !== usuario.id) {
      return res.status(403).json({ erro: "Sem permissão para cancelar este agendamento" })
    }

    await agendamento.destroy()
    res.json({ mensagem: "Agendamento cancelado com sucesso" })
  } catch (erro) {
    console.error("Erro ao deletar agendamento:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

// ===============================
// GET /api/agendamentos/usuario/:id
// ===============================
roteador.get("/usuario/:id", verificarToken, async (req, res) => {
  try {
    const { id } = req.params

    const agendamentos = await Agendamento.findAll({
      where: {
        [Op.or]: [{ id_idoso: id }, { id_voluntario: id }],
      },
      include: [
        { model: Atividade, as: "atividade" },
        { model: Usuario, as: "idoso", attributes: ["id", "nome", "email"] },
        { model: Usuario, as: "voluntario", attributes: ["id", "nome", "email"] },
      ],
      order: [["data", "ASC"]],
    })

    if (agendamentos.length > 0) {
      await atualizarAgendamentosExpirados(agendamentos)

      const agendamentosAtualizados = await Agendamento.findAll({
        where: {
          [Op.or]: [{ id_idoso: id }, { id_voluntario: id }],
        },
        include: [
          { model: Atividade, as: "atividade" },
          { model: Usuario, as: "idoso", attributes: ["id", "nome", "email"] },
          { model: Usuario, as: "voluntario", attributes: ["id", "nome", "email"] },
        ],
        order: [["data", "ASC"]],
      })

      res.json(agendamentosAtualizados)
    } else {
      res.json([])
    }
  } catch (erro) {
    console.error("Erro ao buscar agendamentos do usuário:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

// ===============================
// POST /api/agendamentos/:id/inscrever
// ===============================
roteador.post("/:id/inscrever", verificarToken, verificarPapel(["VOLUNTARIO"]), async (req, res) => {
  try {
    const agendamento = await Agendamento.findByPk(req.params.id)
    if (!agendamento) return res.status(404).json({ erro: "Agendamento não encontrado" })

    if (agendamento.id_voluntario) {
      return res.status(400).json({ erro: "Este agendamento já possui um voluntário inscrito" })
    }

    await agendamento.update({
      id_voluntario: req.usuario.id,
      status: "confirmado",
    })

    res.json({
      mensagem: "Inscrição realizada com sucesso!",
      agendamento,
    })
  } catch (erro) {
    console.error("Erro ao inscrever voluntário:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

// ===============================
// POST /api/agendamentos/:id/cancelar-inscricao
// ===============================
roteador.post("/:id/cancelar-inscricao", verificarToken, verificarPapel(["VOLUNTARIO"]), async (req, res) => {
  try {
    const agendamento = await Agendamento.findByPk(req.params.id)
    if (!agendamento) return res.status(404).json({ erro: "Agendamento não encontrado" })

    if (agendamento.id_voluntario !== req.usuario.id) {
      return res.status(403).json({ erro: "Você não está inscrito neste agendamento" })
    }

    await agendamento.update({
      id_voluntario: null,
      status: "pendente",
    })

    res.json({
      mensagem: "Inscrição cancelada com sucesso!",
      agendamento,
    })
  } catch (erro) {
    console.error("Erro ao cancelar inscrição:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

export default roteador
