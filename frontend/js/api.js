// ================================
// API.JS — Conexão com o Back-end
// ================================

// 🌐 Configuração base
const API_BASE_URL = "http://localhost:3000"

// -------------------------------
// Função auxiliar para requisições seguras
// -------------------------------
async function fazerRequisicao(endpoint, opcoes = {}) {
  try {
    const token = localStorage.getItem("token")

    const headers = {
      "Content-Type": "application/json",
      ...opcoes.headers,
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    // ✅ Evita duplicação de URL
    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`

    const resposta = await fetch(url, {
      ...opcoes,
      headers,
    })

    const texto = await resposta.text()
    let dados = null

    if (texto) {
      try {
        dados = JSON.parse(texto)
      } catch {
        console.warn("[API] Resposta não-JSON recebida:", texto)
      }
    }

    if (!resposta.ok) {
      const mensagem = (dados && (dados.erro || dados.mensagem)) || resposta.statusText
      throw new Error(`${resposta.status} - ${mensagem}`)
    }

    return dados
  } catch (erro) {
    console.error("[API] Erro na requisição:", erro.message)
    throw erro
  }
}

// ================================
// 👥 Usuários
// ================================
const API_USUARIOS = {
  listarInformacoes: () => fazerRequisicao("/usuarios/informacoes"),

  cadastrar: (dados) =>
    fazerRequisicao("/usuarios/cadastro", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  entrar: async (email, senha) => {
    const resposta = await fazerRequisicao("/usuarios/login", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
    })

    localStorage.setItem("token", resposta.token)
    localStorage.setItem("usuario", JSON.stringify(resposta.usuario))
    return resposta
  },

  sair: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    window.location.href = "./login.html"
  },

  obterPerfil: () => fazerRequisicao("/usuarios/perfil"),

  editarPerfil: (dados) =>
    fazerRequisicao("/usuarios/perfil", {
      method: "PUT",
      body: JSON.stringify(dados),
    }),

  deletarPerfil: () =>
    fazerRequisicao("/usuarios/perfil", {
      method: "DELETE",
    }),

  requerAutenticacao: () => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.warn("[Auth] Usuário não autenticado. Redirecionando...")
      window.location.href = "./login.html"
      return false
    }
    return true
  },

  obterUsuarioAtual: () => {
    const dadosUsuario = localStorage.getItem("usuario")
    if (!dadosUsuario) {
      console.warn("[Auth] Nenhum usuário encontrado no localStorage.")
      window.location.href = "./login.html"
      return null
    }
    try {
      return JSON.parse(dadosUsuario)
    } catch {
      console.error("[Auth] Erro ao ler dados do usuário.")
      localStorage.removeItem("usuario")
      window.location.href = "./login.html"
      return null
    }
  },
}

// ================================
// 📅 Eventos
// ================================
const API_EVENTOS = {
  listar: () => fazerRequisicao("/eventos"),
  obter: (id) => fazerRequisicao(`/eventos/${id}`),
  verificarInscricao: (id) => fazerRequisicao(`/eventos/${id}/inscricao`),
  criar: (dados) =>
    fazerRequisicao("/eventos", {
      method: "POST",
      body: JSON.stringify(dados),
    }),
  editar: (id, dados) =>
    fazerRequisicao(`/eventos/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),
  cancelar: (id) => fazerRequisicao(`/eventos/${id}`, { method: "DELETE" }),
  participar: (id) => fazerRequisicao(`/eventos/${id}/inscrever`, { method: "POST" }),
  cancelarInscricao: (id) => fazerRequisicao(`/eventos/${id}/cancelar-inscricao`, { method: "POST" }),
}

// ================================
// 🧩 Atividades
// ================================
const API_ATIVIDADES = {
  listar: () => fazerRequisicao("/atividades"),
  obterAtividadesUsuario: (id) => fazerRequisicao(`/atividades/usuario/${id}`),

  agendar: (dados) =>
    fazerRequisicao("/atividades", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  editar: (id, dados) =>
    fazerRequisicao(`/atividades/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),

  cancelar: (id) => fazerRequisicao(`/atividades/${id}`, { method: "DELETE" }),

  concluir: (id) => fazerRequisicao(`/atividades/${id}/concluir`, { method: "POST" }),

  responder: (id, resposta) =>
    fazerRequisicao(`/atividades/${id}/responder`, {
      method: "POST",
      body: JSON.stringify({ resposta }),
    }),
}

// ================================
// ⭐ Avaliações
// ================================
const API_AVALIACOES = {
  criar: (dados) =>
    fazerRequisicao("/avaliacoes", {
      method: "POST",
      body: JSON.stringify(dados),
    }),
  listar: () => fazerRequisicao("/avaliacoes"),
  editar: (id, dados) =>
    fazerRequisicao(`/avaliacoes/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),
}

// ================================
// 💬 Mensagens
// ================================
const API_MENSAGENS = {
  enviar: (dados) =>
    fazerRequisicao("/mensagens", {
      method: "POST",
      body: JSON.stringify(dados),
    }),
  listar: () => fazerRequisicao("/mensagens"),
}

// ================================
// 🔗 Conexões
// ================================
const API_CONEXOES = {
  listar: () => fazerRequisicao("/conexoes"),
  solicitar: (idUsuario) =>
    fazerRequisicao("/conexoes/solicitar", {
      method: "POST",
      body: JSON.stringify({ idUsuario }),
    }),
  responder: (idConexao, aceitar) =>
    fazerRequisicao("/conexoes/responder", {
      method: "POST",
      body: JSON.stringify({ idConexao, aceitar }),
    }),
}

// ================================
// 🏋️ Exercícios
// ================================
const API_EXERCICIOS = {
  listar: () => fazerRequisicao("/exercicios"),
  adicionar: (dados) =>
    fazerRequisicao("/exercicios", {
      method: "POST",
      body: JSON.stringify(dados),
    }),
  editar: (id, dados) =>
    fazerRequisicao(`/exercicios/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),
  deletar: (id) => fazerRequisicao(`/exercicios/${id}`, { method: "DELETE" }),
}

// ================================
// 🗓️ Calendário
// ================================
const API_CALENDARIO = {
  obter: () => fazerRequisicao("/agendamentos"),

  obterPorData: (data) => fazerRequisicao(`/agendamentos/data/${data}`),

  obterAgendamentosUsuario: (idUsuario) => fazerRequisicao(`/agendamentos/usuario/${idUsuario}`),

  adicionarAtividade: (dadosAgendamento) =>
    fazerRequisicao("/agendamentos", {
      method: "POST",
      body: JSON.stringify(dadosAgendamento),
    }),

  removerAtividade: (id) =>
    fazerRequisicao(`/agendamentos/${id}`, {
      method: "DELETE",
    }),

  atualizar: (id, dados) =>
    fazerRequisicao(`/agendamentos/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),
}

// ================================
// 🌍 Exportar API global
// ================================
const API = {
  usuarios: API_USUARIOS,
  eventos: API_EVENTOS,
  atividades: API_ATIVIDADES,
  avaliacoes: API_AVALIACOES,
  mensagens: API_MENSAGENS,
  conexoes: API_CONEXOES,
  exercicios: API_EXERCICIOS,
  calendario: API_CALENDARIO,
}

window.API = API
