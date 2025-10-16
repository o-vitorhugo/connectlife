import express from 'express';
import { sequelize as bancoDados } from '../config/database.js';
import { verificarToken, verificarPapel } from '../middlewares/autenticacao.js';
import { validarCamposObrigatorios } from '../utils/validacao.js';

const roteador = express.Router();

// GET /api/blog - Listar todos os posts do blog
roteador.get('/', (req, res) => {
  try {
    const { categoria, autor } = req.query;
    let posts = bancoDados.postsBlog;

    // Filtrar por categoria
    if (categoria) {
      posts = posts.filter((p) => p.categoria === categoria);
    }

    // Filtrar por autor
    if (autor) {
      posts = posts.filter((p) =>
        p.autor.toLowerCase().includes(autor.toLowerCase())
      );
    }

    // Ordenar por data (mais recente primeiro)
    posts = posts.sort(
      (a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao)
    );

    res.json(posts);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// GET /api/blog/:id - Obter post do blog por ID
roteador.get('/:id', (req, res) => {
  try {
    const post = bancoDados.postsBlog.find(
      (p) => p.id === Number.parseInt(req.params.id)
    );

    if (!post) {
      return res.status(404).json({ erro: 'Post não encontrado' });
    }

    res.json(post);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// POST /api/blog - Criar novo post do blog (apenas admin)
roteador.post('/', verificarToken, verificarPapel('admin'), (req, res) => {
  try {
    const { titulo, resumo, conteudo, categoria, autor, imagem, tags } = req.body;

    validarCamposObrigatorios(req.body, [
      'titulo',
      'resumo',
      'conteudo',
      'categoria',
      'autor',
    ]);

    const novoPost = {
      id: bancoDados.postsBlog.length + 1,
      titulo,
      resumo,
      conteudo,
      categoria,
      autor,
      imagem: imagem || '/placeholder.svg',
      tags: tags || [],
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    };

    bancoDados.postsBlog.push(novoPost);

    res.status(201).json({
      mensagem: 'Post criado com sucesso',
      post: novoPost,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// PUT /api/blog/:id - Atualizar post do blog (apenas admin)
roteador.put('/:id', verificarToken, verificarPapel('admin'), (req, res) => {
  try {
    const indicePost = bancoDados.postsBlog.findIndex(
      (p) => p.id === Number.parseInt(req.params.id)
    );

    if (indicePost === -1) {
      return res.status(404).json({ erro: 'Post não encontrado' });
    }

    const { titulo, resumo, conteudo, categoria, autor, imagem, tags } = req.body;

    const post = bancoDados.postsBlog[indicePost];
    if (titulo) post.titulo = titulo;
    if (resumo) post.resumo = resumo;
    if (conteudo) post.conteudo = conteudo;
    if (categoria) post.categoria = categoria;
    if (autor) post.autor = autor;
    if (imagem) post.imagem = imagem;
    if (tags) post.tags = tags;

    post.dataAtualizacao = new Date().toISOString();

    res.json({ mensagem: 'Post atualizado com sucesso', post });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// DELETE /api/blog/:id - Deletar post do blog (apenas admin)
roteador.delete('/:id', verificarToken, verificarPapel('admin'), (req, res) => {
  try {
    const indicePost = bancoDados.postsBlog.findIndex(
      (p) => p.id === Number.parseInt(req.params.id)
    );

    if (indicePost === -1) {
      return res.status(404).json({ erro: 'Post não encontrado' });
    }

    bancoDados.postsBlog.splice(indicePost, 1);
    res.json({ mensagem: 'Post deletado com sucesso' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// GET /api/blog/categorias/lista - Listar todas as categorias únicas
roteador.get('/categorias/lista', (req, res) => {
  try {
    const categorias = [...new Set(bancoDados.postsBlog.map((p) => p.categoria))];
    res.json(categorias);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// ✅ Exportar corretamente (ESM)
export default roteador;
