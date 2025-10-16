import express from "express"
import { verificarToken, verificarPapel } from "../middlewares/autenticacao.js"
import { validarCamposObrigatorios } from "../utils/validacao.js"
import { Avaliacao, Agendamento, Atividade, Usuario } from "../models/index.js"

const roteador = express.Router()

// ============================================================================
// GET /api/avaliacoes — Listar avaliações (com filtros opcionais)
// ============================================================================
roteador.get("/", verificarToken, async (req, res) => {
  try {
    const { idAgendamento, idIdoso } = req.query

    const filtro = {}
    if (idAgendamento) filtro.id_agendamento = idAgendamento
    if (idIdoso) filtro.id_idoso = idIdoso

    console.log("Filtro recebido:", filtro)

    const avaliacoes = await Avaliacao.findAll({
      where: filtro,
      include: [
        {
          model: Agendamento,
          as: "agendamento",
          include: [
            { model: Atividade, as: "atividade" },
            { model: Usuario, as: "idoso", attributes: ["id", "nome"] },
            { model: Usuario, as: "voluntario", attributes: ["id", "nome"] },
          ],
        },
        {
          model: Usuario,
          as: "avaliador",
          attributes: ["id", "nome", "papel"],
        },
      ],
      order: [["id", "DESC"]],
    })

    return res.json(avaliacoes)
  } catch (erro) {
    console.error("Erro ao listar avaliações:", erro)
    console.error("Stack:", erro.stack)
    return res.status(500).json({
      erro: "Erro ao listar avaliações.",
      detalhe: erro.message,
    })
  }
})

// ============================================================================
// GET /api/avaliacoes/:id — Buscar avaliação por ID
// ============================================================================
roteador.get("/:id", verificarToken, async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido." })
    }

    const avaliacao = await Avaliacao.findByPk(id, {
      include: [
        {
          model: Agendamento,
          as: "agendamento",
          include: [
            { model: Atividade, as: "atividade" },
            { model: Usuario, as: "idoso", attributes: ["id", "nome"] },
            { model: Usuario, as: "voluntario", attributes: ["id", "nome"] },
          ],
        },
        {
          model: Usuario,
          as: "avaliador",
          attributes: ["id", "nome", "papel"],
        },
      ],
    })

    if (!avaliacao) {
      return res.status(404).json({ erro: "Avaliação não encontrada." })
    }

    return res.json(avaliacao)
  } catch (erro) {
    console.error("Erro ao buscar avaliação:", erro)
    return res.status(500).json({ erro: "Erro ao buscar avaliação." })
  }
})

// ============================================================================
// POST /api/avaliacoes — Criar nova avaliação
// ============================================================================
roteador.post("/", verificarToken, verificarPapel(["IDOSO"]), async (req, res) => {
  try {
    validarCamposObrigatorios(req.body, ["idAgendamento", "nota"])
    const { idAgendamento, nota, comentario } = req.body

    if (isNaN(idAgendamento)) {
      return res.status(400).json({ erro: "ID do agendamento inválido." })
    }

    if (nota < 1 || nota > 5) {
      return res.status(400).json({ erro: "A nota deve ser entre 1 e 5." })
    }

    const agendamento = await Agendamento.findByPk(idAgendamento)
    if (!agendamento) {
      return res.status(404).json({ erro: "Agendamento não encontrado." })
    }

    if (agendamento.status !== "concluido") {
      return res.status(400).json({ erro: "Apenas agendamentos concluídos podem ser avaliados." })
    }

    const usuarioId = req.usuario.id
    if (agendamento.id_idoso !== usuarioId) {
      return res.status(403).json({ erro: "Apenas o idoso pode avaliar este agendamento." })
    }

    const existente = await Avaliacao.findOne({
      where: { id_agendamento: idAgendamento },
    })
    if (existente) {
      return res.status(400).json({ erro: "Este agendamento já foi avaliado." })
    }

    const novaAvaliacao = await Avaliacao.create({
      id_agendamento: idAgendamento,
      id_idoso: usuarioId,
      nota,
      comentario: comentario?.trim() || "",
    })

    return res.status(201).json({
      mensagem: "Avaliação criada com sucesso!",
      avaliacao: novaAvaliacao,
    })
  } catch (erro) {
    console.error("Erro ao criar avaliação:", erro)
    return res.status(500).json({ erro: "Erro ao criar avaliação.", detalhes: erro.message })
  }
})

// ============================================================================
// PUT /api/avaliacoes/:id — Atualizar uma avaliação existente
// ============================================================================
roteador.put("/:id", verificarToken, verificarPapel(["IDOSO"]), async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido." })
    }

    const avaliacao = await Avaliacao.findByPk(id)
    if (!avaliacao) {
      return res.status(404).json({ erro: "Avaliação não encontrada." })
    }

    if (avaliacao.id_idoso !== req.usuario.id) {
      return res.status(403).json({ erro: "Apenas o autor pode editar esta avaliação." })
    }

    const { nota, comentario } = req.body

    if (nota && (nota < 1 || nota > 5)) {
      return res.status(400).json({ erro: "A nota deve ser um valor entre 1 e 5." })
    }

    avaliacao.nota = nota ?? avaliacao.nota
    avaliacao.comentario = comentario ?? avaliacao.comentario

    await avaliacao.save()

    return res.json({
      mensagem: "Avaliação atualizada com sucesso!",
      avaliacao,
    })
  } catch (erro) {
    console.error("Erro ao atualizar avaliação:", erro)
    return res.status(500).json({ erro: "Erro ao atualizar avaliação." })
  }
})

// ============================================================================
// DELETE /api/avaliacoes/:id — Excluir uma avaliação
// ============================================================================
roteador.delete("/:id", verificarToken, verificarPapel(["IDOSO"]), async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido." })
    }

    const avaliacao = await Avaliacao.findByPk(id)
    if (!avaliacao) {
      return res.status(404).json({ erro: "Avaliação não encontrada." })
    }

    if (avaliacao.id_idoso !== req.usuario.id) {
      return res.status(403).json({ erro: "Apenas o autor pode excluir esta avaliação." })
    }

    await avaliacao.destroy()
    return res.json({ mensagem: "Avaliação excluída com sucesso!" })
  } catch (erro) {
    console.error("Erro ao deletar avaliação:", erro)
    return res.status(500).json({ erro: "Erro ao deletar avaliação." })
  }
})

export default roteador
