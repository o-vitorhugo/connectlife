// Armazenamento de Dados Mock
const DADOS_MOCK = {
  usuarios: [
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria@email.com",
      senha: "123456",
      papel: "idoso",
      idade: 72,
      telefone: "(11) 98765-4321",
      endereco: "São Paulo, SP",
    },
    {
      id: 2,
      nome: "João Santos",
      email: "joao@email.com",
      senha: "123456",
      papel: "voluntario",
      idade: 28,
      telefone: "(11) 91234-5678",
      habilidades: ["Caminhada", "Leitura", "Música"],
    },
    {
      id: 3,
      nome: "Ana Costa",
      email: "ana@email.com",
      senha: "123456",
      papel: "idoso",
      idade: 68,
      telefone: "(11) 99876-5432",
      endereco: "Rio de Janeiro, RJ",
    },
    {
      id: 4,
      nome: "Pedro Oliveira",
      email: "pedro@email.com",
      senha: "123456",
      papel: "voluntario",
      idade: 35,
      telefone: "(11) 93456-7890",
      habilidades: ["Artesanato", "Jogos", "Tecnologia"],
    },
  ],
  atividades: [
    {
      id: 1,
      titulo: "Caminhada no Parque",
      descricao: "Caminhada leve ao ar livre para exercício e socialização",
      categoria: "Exercício Físico",
      duracao: "60 minutos",
      dificuldade: "Fácil",
      imagem: "/elderly-walking-in-park.jpg",
    },
    {
      id: 2,
      titulo: "Clube do Livro",
      descricao: "Discussão de livros e compartilhamento de histórias",
      categoria: "Cultural",
      duracao: "90 minutos",
      dificuldade: "Fácil",
      imagem: "/book-club-elderly.jpg",
    },
    {
      id: 3,
      titulo: "Artesanato e Tricô",
      descricao: "Criação de peças artesanais e trabalhos manuais",
      categoria: "Artesanato",
      duracao: "120 minutos",
      dificuldade: "Médio",
      imagem: "/elderly-crafts-knitting.jpg",
    },
    {
      id: 4,
      titulo: "Jogos de Tabuleiro",
      descricao: "Xadrez, damas e outros jogos estratégicos",
      categoria: "Lazer",
      duracao: "90 minutos",
      dificuldade: "Fácil",
      imagem: "/elderly-playing-chess.jpg",
    },
    {
      id: 5,
      titulo: "Sessão Musical",
      descricao: "Apreciação musical e canto em grupo",
      categoria: "Cultural",
      duracao: "60 minutos",
      dificuldade: "Fácil",
      imagem: "/elderly-music-session.jpg",
    },
  ],
  agendamentos: [
    {
      id: 1,
      idAtividade: 1,
      idIdoso: 1,
      idVoluntario: 2,
      data: "2025-03-15",
      hora: "09:00",
      status: "confirmado",
      observacoes: "Encontro no portão principal do parque",
    },
    {
      id: 2,
      idAtividade: 2,
      idIdoso: 1,
      idVoluntario: 2,
      data: "2025-03-18",
      hora: "14:00",
      status: "pendente",
      observacoes: 'Trazer o livro "Memórias Póstumas"',
    },
    {
      id: 3,
      idAtividade: 3,
      idIdoso: 3,
      idVoluntario: 4,
      data: "2025-03-12",
      hora: "10:00",
      status: "concluido",
      observacoes: "Materiais fornecidos",
    },
    {
      id: 4,
      idAtividade: 4,
      idIdoso: 1,
      idVoluntario: 4,
      data: "2025-03-10",
      hora: "15:00",
      status: "concluido",
      observacoes: "Partida de xadrez",
    },
    {
      id: 5,
      idAtividade: 5,
      idIdoso: 3,
      idVoluntario: 2,
      data: "2025-03-20",
      hora: "16:00",
      status: "confirmado",
      observacoes: "Repertório de MPB",
    },
  ],
  eventos: [
    {
      id: 1,
      titulo: "Festa Junina Comunitária",
      descricao: "Grande festa junina com comidas típicas, quadrilha e música ao vivo",
      data: "2025-06-15",
      hora: "14:00",
      local: "Centro Comunitário Central",
      capacidade: 100,
      inscritos: 45,
      imagem: "/festa-junina-community.jpg",
      organizador: "Prefeitura Municipal",
    },
    {
      id: 2,
      titulo: "Palestra sobre Saúde",
      descricao: "Palestra com nutricionista sobre alimentação saudável na terceira idade",
      data: "2025-03-25",
      hora: "10:00",
      local: "Auditório da Biblioteca",
      capacidade: 50,
      inscritos: 32,
      imagem: "/health-lecture-elderly.jpg",
      organizador: "Secretaria de Saúde",
    },
    {
      id: 3,
      titulo: "Piquenique no Parque",
      descricao: "Encontro ao ar livre com jogos, música e confraternização",
      data: "2025-04-10",
      hora: "11:00",
      local: "Parque Municipal",
      capacidade: 80,
      inscritos: 28,
      imagem: "/picnic-park-elderly.jpg",
      organizador: "Associação de Idosos",
    },
  ],
  avaliacoes: [
    {
      id: 1,
      idAgendamento: 3,
      nota: 5,
      comentario: "Experiência maravilhosa! A voluntária foi muito atenciosa e paciente.",
      data: "2025-03-12",
    },
    {
      id: 2,
      idAgendamento: 4,
      nota: 5,
      comentario: "Adorei jogar xadrez! O Pedro é muito educado e divertido.",
      data: "2025-03-10",
    },
  ],
  postsBlog: [
    {
      id: 1,
      titulo: "Benefícios da Atividade Física na Terceira Idade",
      resumo: "Descubra como exercícios regulares podem melhorar sua qualidade de vida",
      conteudo: "A prática regular de atividades físicas traz inúmeros benefícios...",
      autor: "Dr. Carlos Mendes",
      data: "2025-03-01",
      imagem: "/elderly-exercise.jpg",
    },
    {
      id: 2,
      titulo: "Como Ser um Voluntário Eficaz",
      resumo: "Dicas práticas para criar conexões significativas com idosos",
      conteudo: "Ser voluntário é uma experiência transformadora...",
      autor: "Ana Paula Lima",
      data: "2025-02-28",
      imagem: "/volunteer-elderly-friendship.jpg",
    },
  ],
  perguntasFrequentes: [
    {
      id: 1,
      pergunta: "Como faço para me cadastrar?",
      resposta:
        'Clique no botão "Cadastre-se" no topo da página e preencha o formulário com seus dados. Você pode se cadastrar como idoso ou voluntário.',
    },
    {
      id: 2,
      pergunta: "As atividades são gratuitas?",
      resposta: "Sim! Todas as atividades oferecidas pela plataforma são completamente gratuitas.",
    },
    {
      id: 3,
      pergunta: "Posso cancelar um agendamento?",
      resposta:
        "Sim, você pode cancelar um agendamento até 24 horas antes da data marcada através do seu painel de controle.",
    },
    {
      id: 4,
      pergunta: "Como funciona o sistema de avaliação?",
      resposta:
        "Após cada atividade concluída, você pode avaliar a experiência com estrelas (1-5) e deixar um comentário opcional.",
    },
  ],
}

// Inicializar localStorage com dados mock se estiver vazio
function inicializarDadosMock() {
  if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify(DADOS_MOCK.usuarios))
  }
  if (!localStorage.getItem("atividades")) {
    localStorage.setItem("atividades", JSON.stringify(DADOS_MOCK.atividades))
  }
  if (!localStorage.getItem("agendamentos")) {
    localStorage.setItem("agendamentos", JSON.stringify(DADOS_MOCK.agendamentos))
  }
  if (!localStorage.getItem("eventos")) {
    localStorage.setItem("eventos", JSON.stringify(DADOS_MOCK.eventos))
  }
  if (!localStorage.getItem("avaliacoes")) {
    localStorage.setItem("avaliacoes", JSON.stringify(DADOS_MOCK.avaliacoes))
  }
  if (!localStorage.getItem("postsBlog")) {
    localStorage.setItem("postsBlog", JSON.stringify(DADOS_MOCK.postsBlog))
  }
  if (!localStorage.getItem("perguntasFrequentes")) {
    localStorage.setItem("perguntasFrequentes", JSON.stringify(DADOS_MOCK.perguntasFrequentes))
  }
}

// Funções de Autenticação
function obterUsuarioAtual() {
  const usuarioStr = localStorage.getItem("usuarioAtual")
  return usuarioStr ? JSON.parse(usuarioStr) : null
}

function entrar(email, senha) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
  const usuario = usuarios.find((u) => u.email === email && u.senha === senha)

  if (usuario) {
    localStorage.setItem("usuarioAtual", JSON.stringify(usuario))
    return { sucesso: true, usuario }
  }
  return { sucesso: false, mensagem: "Email ou senha incorretos" }
}

function cadastrar(dadosUsuario) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")

  // Verificar se o email já existe
  if (usuarios.find((u) => u.email === dadosUsuario.email)) {
    return { sucesso: false, mensagem: "Email já cadastrado" }
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    ...dadosUsuario,
  }

  usuarios.push(novoUsuario)
  localStorage.setItem("usuarios", JSON.stringify(usuarios))
  localStorage.setItem("usuarioAtual", JSON.stringify(novoUsuario))

  return { sucesso: true, usuario: novoUsuario }
}

function sair() {
  localStorage.removeItem("usuarioAtual")
  window.location.href = "/index.html"
}

// Funções de Acesso a Dados
function obterAtividades() {
  return JSON.parse(localStorage.getItem("atividades") || "[]")
}

function obterAtividade(id) {
  const atividades = obterAtividades()
  return atividades.find((a) => a.id === Number.parseInt(id))
}

function obterAgendamentos() {
  return JSON.parse(localStorage.getItem("agendamentos") || "[]")
}

function obterAgendamento(id) {
  const agendamentos = obterAgendamentos()
  return agendamentos.find((s) => s.id === Number.parseInt(id))
}

function obterAgendamentosUsuario(idUsuario) {
  const agendamentos = obterAgendamentos()
  const usuario = obterUsuarioAtual()

  if (usuario.papel === "idoso") {
    return agendamentos.filter((s) => s.idIdoso === idUsuario)
  } else {
    return agendamentos.filter((s) => s.idVoluntario === idUsuario)
  }
}

function criarAgendamento(dadosAgendamento) {
  const agendamentos = obterAgendamentos()
  const novoAgendamento = {
    id: agendamentos.length + 1,
    ...dadosAgendamento,
    status: "pendente",
  }
  agendamentos.push(novoAgendamento)
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos))
  return novoAgendamento
}

function atualizarAgendamento(id, atualizacoes) {
  const agendamentos = obterAgendamentos()
  const indice = agendamentos.findIndex((s) => s.id === Number.parseInt(id))
  if (indice !== -1) {
    agendamentos[indice] = { ...agendamentos[indice], ...atualizacoes }
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos))
    return agendamentos[indice]
  }
  return null
}

function excluirAgendamento(id) {
  let agendamentos = obterAgendamentos()
  agendamentos = agendamentos.filter((s) => s.id !== Number.parseInt(id))
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos))
}

function obterEventos() {
  return JSON.parse(localStorage.getItem("eventos") || "[]")
}

function obterEvento(id) {
  const eventos = obterEventos()
  return eventos.find((e) => e.id === Number.parseInt(id))
}

function criarEvento(dadosEvento) {
  const eventos = obterEventos()
  const novoEvento = {
    id: eventos.length + 1,
    ...dadosEvento,
    inscritos: 0,
  }
  eventos.push(novoEvento)
  localStorage.setItem("eventos", JSON.stringify(eventos))
  return novoEvento
}

function atualizarEvento(id, atualizacoes) {
  const eventos = obterEventos()
  const indice = eventos.findIndex((e) => e.id === Number.parseInt(id))
  if (indice !== -1) {
    eventos[indice] = { ...eventos[indice], ...atualizacoes }
    localStorage.setItem("eventos", JSON.stringify(eventos))
    return eventos[indice]
  }
  return null
}

function excluirEvento(id) {
  let eventos = obterEventos()
  eventos = eventos.filter((e) => e.id !== Number.parseInt(id))
  localStorage.setItem("eventos", JSON.stringify(eventos))
}

function obterAvaliacoes() {
  return JSON.parse(localStorage.getItem("avaliacoes") || "[]")
}

function criarAvaliacao(dadosAvaliacao) {
  const avaliacoes = obterAvaliacoes()
  const novaAvaliacao = {
    id: avaliacoes.length + 1,
    ...dadosAvaliacao,
    data: new Date().toISOString().split("T")[0],
  }
  avaliacoes.push(novaAvaliacao)
  localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes))
  return novaAvaliacao
}

function obterPostsBlog() {
  return JSON.parse(localStorage.getItem("postsBlog") || "[]")
}

function obterPostBlog(id) {
  const posts = obterPostsBlog()
  return posts.find((p) => p.id === Number.parseInt(id))
}

function obterPerguntasFrequentes() {
  return JSON.parse(localStorage.getItem("perguntasFrequentes") || "[]")
}

// Funções Auxiliares de UI
function mostrarAlerta(mensagem, tipo = "sucesso") {
  const divAlerta = document.createElement("div")
  divAlerta.className = `alerta alerta-${tipo}`
  divAlerta.textContent = mensagem

  const conteiner = document.querySelector(".conteiner")
  if (conteiner) {
    conteiner.insertBefore(divAlerta, conteiner.firstChild)
    setTimeout(() => divAlerta.remove(), 3000)
  }
}

function formatarData(stringData) {
  const data = new Date(stringData)
  return data.toLocaleDateString("pt-BR")
}

function formatarHora(stringHora) {
  return stringHora
}

// Verificar autenticação
function requerAutenticacao() {
  const usuario = obterUsuarioAtual()
  if (!usuario) {
    window.location.href = "/login.html"
    return false
  }
  return true
}

// Atualizar cabeçalho baseado no estado de autenticação
function atualizarCabecalho() {
  const usuario = obterUsuarioAtual()
  const linksAuth = document.getElementById("auth-links")
  const menuUsuario = document.getElementById("user-menu")

  if (usuario && linksAuth && menuUsuario) {
    linksAuth.style.display = "none"
    menuUsuario.style.display = "flex"

    const nomeUsuario = document.getElementById("user-name")
    const papelUsuario = document.getElementById("user-role")

    if (nomeUsuario) nomeUsuario.textContent = usuario.nome
    if (papelUsuario) {
      papelUsuario.textContent = usuario.papel === "idoso" ? "Idoso" : "Voluntário"
      papelUsuario.className = `distintivo-papel ${usuario.papel}`
    }
  } else if (linksAuth && menuUsuario) {
    linksAuth.style.display = "flex"
    menuUsuario.style.display = "none"
  }
}

// Inicializar aplicação
document.addEventListener("DOMContentLoaded", () => {
  inicializarDadosMock()
  atualizarCabecalho()

  // Botão de sair
  const botaoSair = document.getElementById("logout-btn")
  if (botaoSair) {
    botaoSair.addEventListener("click", (e) => {
      e.preventDefault()
      sair()
    })
  }
})
