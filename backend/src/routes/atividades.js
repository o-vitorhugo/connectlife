import express from "express";
import { verificarToken, verificarPapel } from "../middlewares/autenticacao.js";
import { validarCamposObrigatorios } from "../utils/validacao.js";
import Atividade from "../models/Atividade.js"
import Agendamento from "../models/Agendamento.js";
import { Op } from "sequelize";


const roteador = express.Router();

// GET /api/atividades - Listar todas as atividades
roteador.get("/", async (req, res) => {
  try {
    const { categoria, dificuldade } = req.query;

    const filtro = {};
    if (categoria) filtro.categoria = categoria;
    if (dificuldade) filtro.dificuldade = dificuldade;

    const atividades = await Atividade.findAll({ where: filtro });
    res.json(atividades);
  } catch (erro) {
    console.error("Erro ao listar atividades:", erro);
    res.status(500).json({ erro: "Erro ao listar atividades" });
  }
});

// ⚙️ Buscar atividades associadas ao usuário (idoso ou voluntário)
roteador.get("/usuario/:id", verificarToken, async (req, res) => {
  try {
    const idUsuario = Number(req.params.id);

    // O idoso sempre existe. Voluntário pode ser nulo (atividade pendente)
    const agendamentos = await Agendamento.findAll({
      where: {
        [Op.or]: [
          { id_idoso: idUsuario }, 
          { id_voluntario: { [Op.is]: null } },      
          { id_voluntario: idUsuario } 
        ],
      },
      include: [{ model: Atividade, as: "atividade" }],
    });

    if (!agendamentos || agendamentos.length === 0) {
      return res.json([]);
    }

    // Extrai apenas as atividades válidas
    const atividades = agendamentos
      .map(a => a.atividade)
      .filter(a => !!a);

    res.json(atividades);
  } catch (erro) {
    console.error("Erro ao buscar atividades do usuário:", erro);
    res.status(500).json({ erro: "Erro ao buscar atividades do usuário" });
  }
});


// GET /api/atividades/:id - Obter atividade por ID
roteador.get("/:id", async (req, res) => {
  try {
    const atividade = await Atividade.findByPk(req.params.id);

    if (!atividade) {
      return res.status(404).json({ erro: "Atividade não encontrada" });
    }

    res.json(atividade);
  } catch (erro) {
    console.error("Erro ao buscar atividade:", erro);
    res.status(500).json({ erro: "Erro ao buscar atividade" });
  }
});

// POST /api/atividades - Criar nova atividade (apenas admin)
roteador.post("/", verificarToken, verificarPapel("admin"), async (req, res) => {
  try {
    validarCamposObrigatorios(req.body, ["titulo", "descricao", "categoria"]);

    const novaAtividade = await Atividade.create({
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      categoria: req.body.categoria,
      duracao: req.body.duracao || "60 minutos",
      dificuldade: req.body.dificuldade || "Iniciante",
      imagem: req.body.imagem || "/placeholder.svg",
      beneficios: req.body.beneficios || [],
      materiaisNecessarios: req.body.materiaisNecessarios || [],
    });

    res.status(201).json({
      mensagem: "Atividade criada com sucesso",
      atividade: novaAtividade,
    });
  } catch (erro) {
    console.error("Erro ao criar atividade:", erro);
    res.status(500).json({ erro: "Erro ao criar atividade" });
  }
});

// PUT /api/atividades/:id - Atualizar atividade (apenas admin)
roteador.put("/:id", verificarToken, verificarPapel("admin"), async (req, res) => {
  try {
    const atividade = await Atividade.findByPk(req.params.id);

    if (!atividade) {
      return res.status(404).json({ erro: "Atividade não encontrada" });
    }

    await atividade.update(req.body);

    res.json({
      mensagem: "Atividade atualizada com sucesso",
      atividade,
    });
  } catch (erro) {
    console.error("Erro ao atualizar atividade:", erro);
    res.status(500).json({ erro: "Erro ao atualizar atividade" });
  }
});

// DELETE /api/atividades/:id - Deletar atividade (apenas admin)
roteador.delete("/:id", verificarToken, verificarPapel("admin"), async (req, res) => {
  try {
    const atividade = await Atividade.findByPk(req.params.id);

    if (!atividade) {
      return res.status(404).json({ erro: "Atividade não encontrada" });
    }

    await atividade.destroy();
    res.json({ mensagem: "Atividade deletada com sucesso" });
  } catch (erro) {
    console.error("Erro ao deletar atividade:", erro);
    res.status(500).json({ erro: "Erro ao deletar atividade" });
  }
});


export default roteador;
