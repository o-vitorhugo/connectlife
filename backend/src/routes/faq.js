import express from 'express';
import { sequelize as bancoDados } from '../config/database.js';
import { verificarToken, verificarPapel } from '../middlewares/autenticacao.js';
import { validarCamposObrigatorios } from '../utils/validacao.js';

const roteador = express.Router();

// GET /api/faq - Listar todas as perguntas frequentes
roteador.get('/', (req, res) => {
  try {
    const { categoria } = req.query;

    let faqs = bancoDados.perguntasFrequentes;

    if (categoria) {
      faqs = faqs.filter((f) => f.categoria === categoria);
    }

    faqs = faqs.sort((a, b) => (a.ordem || a.id) - (b.ordem || b.id));

    res.json(faqs);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// GET /api/faq/:id - Obter pergunta frequente por ID
roteador.get('/:id', (req, res) => {
  try {
    const faq = bancoDados.perguntasFrequentes.find(
      (f) => f.id === Number.parseInt(req.params.id)
    );

    if (!faq) {
      return res.status(404).json({ erro: 'Pergunta não encontrada' });
    }

    res.json(faq);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// POST /api/faq - Criar nova pergunta frequente (apenas admin)
roteador.post('/', verificarToken, verificarPapel('admin'), (req, res) => {
  try {
    const { pergunta, resposta, categoria, ordem } = req.body;

    validarCamposObrigatorios(req.body, ['pergunta', 'resposta']);

    const novaFaq = {
      id: bancoDados.perguntasFrequentes.length + 1,
      pergunta,
      resposta,
      categoria: categoria || 'Geral',
      ordem: ordem || bancoDados.perguntasFrequentes.length + 1,
      dataCriacao: new Date().toISOString(),
    };

    bancoDados.perguntasFrequentes.push(novaFaq);

    res.status(201).json({
      mensagem: 'Pergunta frequente criada com sucesso',
      faq: novaFaq,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// PUT /api/faq/:id - Atualizar pergunta frequente (apenas admin)
roteador.put('/:id', verificarToken, verificarPapel('admin'), (req, res) => {
  try {
    const indiceFaq = bancoDados.perguntasFrequentes.findIndex(
      (f) => f.id === Number.parseInt(req.params.id)
    );

    if (indiceFaq === -1) {
      return res.status(404).json({ erro: 'Pergunta não encontrada' });
    }

    const { pergunta, resposta, categoria, ordem } = req.body;

    const faq = bancoDados.perguntasFrequentes[indiceFaq];

    if (pergunta) faq.pergunta = pergunta;
    if (resposta) faq.resposta = resposta;
    if (categoria) faq.categoria = categoria;
    if (ordem !== undefined) faq.ordem = ordem;

    res.json({
      mensagem: 'Pergunta frequente atualizada com sucesso',
      faq,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// DELETE /api/faq/:id - Deletar pergunta frequente (apenas admin)
roteador.delete('/:id', verificarToken, verificarPapel('admin'), (req, res) => {
  try {
    const indiceFaq = bancoDados.perguntasFrequentes.findIndex(
      (f) => f.id === Number.parseInt(req.params.id)
    );

    if (indiceFaq === -1) {
      return res.status(404).json({ erro: 'Pergunta não encontrada' });
    }

    bancoDados.perguntasFrequentes.splice(indiceFaq, 1);

    res.json({ mensagem: 'Pergunta frequente deletada com sucesso' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// GET /api/faq/categorias/lista - Listar todas as categorias únicas
roteador.get('/categorias/lista', (req, res) => {
  try {
    const categorias = [
      ...new Set(bancoDados.perguntasFrequentes.map((f) => f.categoria)),
    ];

    res.json(categorias);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// ✅ Export correto (ESM)
export default roteador;
