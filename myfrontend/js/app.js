// Mock Data Storage
const MOCK_DATA = {
  users: [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria@email.com",
      password: "123456",
      role: "elderly",
      age: 72,
      phone: "(11) 98765-4321",
      address: "São Paulo, SP",
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao@email.com",
      password: "123456",
      role: "volunteer",
      age: 28,
      phone: "(11) 91234-5678",
      skills: ["Caminhada", "Leitura", "Música"],
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana@email.com",
      password: "123456",
      role: "elderly",
      age: 68,
      phone: "(11) 99876-5432",
      address: "Rio de Janeiro, RJ",
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      email: "pedro@email.com",
      password: "123456",
      role: "volunteer",
      age: 35,
      phone: "(11) 93456-7890",
      skills: ["Artesanato", "Jogos", "Tecnologia"],
    },
  ],
  activities: [
    {
      id: 1,
      name: "Caminhada no Parque",
      description: "Caminhada leve ao ar livre para exercício e socialização",
      category: "Exercício Físico",
      duration: "60 minutos",
      difficulty: "Fácil",
      image: "/elderly-walking-in-park.jpg",
    },
    {
      id: 2,
      name: "Clube do Livro",
      description: "Discussão de livros e compartilhamento de histórias",
      category: "Cultural",
      duration: "90 minutos",
      difficulty: "Fácil",
      image: "/book-club-elderly.jpg",
    },
    {
      id: 3,
      name: "Artesanato e Tricô",
      description: "Criação de peças artesanais e trabalhos manuais",
      category: "Artesanato",
      duration: "120 minutos",
      difficulty: "Médio",
      image: "/elderly-crafts-knitting.jpg",
    },
    {
      id: 4,
      name: "Jogos de Tabuleiro",
      description: "Xadrez, damas e outros jogos estratégicos",
      category: "Lazer",
      duration: "90 minutos",
      difficulty: "Fácil",
      image: "/elderly-playing-chess.jpg",
    },
    {
      id: 5,
      name: "Sessão Musical",
      description: "Apreciação musical e canto em grupo",
      category: "Cultural",
      duration: "60 minutos",
      difficulty: "Fácil",
      image: "/elderly-music-session.jpg",
    },
  ],
  schedules: [
    {
      id: 1,
      activityId: 1,
      elderlyId: 1,
      volunteerId: 2,
      date: "2025-03-15",
      time: "09:00",
      status: "confirmed",
      notes: "Encontro no portão principal do parque",
    },
    {
      id: 2,
      activityId: 2,
      elderlyId: 1,
      volunteerId: 2,
      date: "2025-03-18",
      time: "14:00",
      status: "pending",
      notes: 'Trazer o livro "Memórias Póstumas"',
    },
    {
      id: 3,
      activityId: 3,
      elderlyId: 3,
      volunteerId: 4,
      date: "2025-03-12",
      time: "10:00",
      status: "completed",
      notes: "Materiais fornecidos",
    },
    {
      id: 4,
      activityId: 4,
      elderlyId: 1,
      volunteerId: 4,
      date: "2025-03-10",
      time: "15:00",
      status: "completed",
      notes: "Partida de xadrez",
    },
    {
      id: 5,
      activityId: 5,
      elderlyId: 3,
      volunteerId: 2,
      date: "2025-03-20",
      time: "16:00",
      status: "confirmed",
      notes: "Repertório de MPB",
    },
  ],
  events: [
    {
      id: 1,
      title: "Festa Junina Comunitária",
      description: "Grande festa junina com comidas típicas, quadrilha e música ao vivo",
      date: "2025-06-15",
      time: "14:00",
      location: "Centro Comunitário Central",
      capacity: 100,
      registered: 45,
      image: "/festa-junina-community.jpg",
      organizer: "Prefeitura Municipal",
    },
    {
      id: 2,
      title: "Palestra sobre Saúde",
      description: "Palestra com nutricionista sobre alimentação saudável na terceira idade",
      date: "2025-03-25",
      time: "10:00",
      location: "Auditório da Biblioteca",
      capacity: 50,
      registered: 32,
      image: "/health-lecture-elderly.jpg",
      organizer: "Secretaria de Saúde",
    },
    {
      id: 3,
      title: "Piquenique no Parque",
      description: "Encontro ao ar livre com jogos, música e confraternização",
      date: "2025-04-10",
      time: "11:00",
      location: "Parque Municipal",
      capacity: 80,
      registered: 28,
      image: "/picnic-park-elderly.jpg",
      organizer: "Associação de Idosos",
    },
  ],
  ratings: [
    {
      id: 1,
      scheduleId: 3,
      rating: 5,
      comment: "Experiência maravilhosa! A voluntária foi muito atenciosa e paciente.",
      date: "2025-03-12",
    },
    {
      id: 2,
      scheduleId: 4,
      rating: 5,
      comment: "Adorei jogar xadrez! O Pedro é muito educado e divertido.",
      date: "2025-03-10",
    },
  ],
  blogPosts: [
    {
      id: 1,
      title: "Benefícios da Atividade Física na Terceira Idade",
      excerpt: "Descubra como exercícios regulares podem melhorar sua qualidade de vida",
      content: "A prática regular de atividades físicas traz inúmeros benefícios...",
      author: "Dr. Carlos Mendes",
      date: "2025-03-01",
      image: "/elderly-exercise.jpg",
    },
    {
      id: 2,
      title: "Como Ser um Voluntário Eficaz",
      excerpt: "Dicas práticas para criar conexões significativas com idosos",
      content: "Ser voluntário é uma experiência transformadora...",
      author: "Ana Paula Lima",
      date: "2025-02-28",
      image: "/volunteer-elderly-friendship.jpg",
    },
  ],
  faqs: [
    {
      id: 1,
      question: "Como faço para me cadastrar?",
      answer:
        'Clique no botão "Cadastre-se" no topo da página e preencha o formulário com seus dados. Você pode se cadastrar como idoso ou voluntário.',
    },
    {
      id: 2,
      question: "As atividades são gratuitas?",
      answer: "Sim! Todas as atividades oferecidas pela plataforma são completamente gratuitas.",
    },
    {
      id: 3,
      question: "Posso cancelar um agendamento?",
      answer:
        "Sim, você pode cancelar um agendamento até 24 horas antes da data marcada através do seu painel de controle.",
    },
    {
      id: 4,
      question: "Como funciona o sistema de avaliação?",
      answer:
        "Após cada atividade concluída, você pode avaliar a experiência com estrelas (1-5) e deixar um comentário opcional.",
    },
  ],
}

// Initialize localStorage with mock data if empty
function initializeMockData() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(MOCK_DATA.users))
  }
  if (!localStorage.getItem("activities")) {
    localStorage.setItem("activities", JSON.stringify(MOCK_DATA.activities))
  }
  if (!localStorage.getItem("schedules")) {
    localStorage.setItem("schedules", JSON.stringify(MOCK_DATA.schedules))
  }
  if (!localStorage.getItem("events")) {
    localStorage.setItem("events", JSON.stringify(MOCK_DATA.events))
  }
  if (!localStorage.getItem("ratings")) {
    localStorage.setItem("ratings", JSON.stringify(MOCK_DATA.ratings))
  }
  if (!localStorage.getItem("blogPosts")) {
    localStorage.setItem("blogPosts", JSON.stringify(MOCK_DATA.blogPosts))
  }
  if (!localStorage.getItem("faqs")) {
    localStorage.setItem("faqs", JSON.stringify(MOCK_DATA.faqs))
  }
}

// Auth Functions
function getCurrentUser() {
  const userStr = localStorage.getItem("currentUser")
  return userStr ? JSON.parse(userStr) : null
}

function login(email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]")
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
    return { success: true, user }
  }
  return { success: false, message: "Email ou senha incorretos" }
}

function register(userData) {
  const users = JSON.parse(localStorage.getItem("users") || "[]")

  // Check if email already exists
  if (users.find((u) => u.email === userData.email)) {
    return { success: false, message: "Email já cadastrado" }
  }

  const newUser = {
    id: users.length + 1,
    ...userData,
  }

  users.push(newUser)
  localStorage.setItem("users", JSON.stringify(users))
  localStorage.setItem("currentUser", JSON.stringify(newUser))

  return { success: true, user: newUser }
}

function logout() {
  localStorage.removeItem("currentUser")
  window.location.href = "/index.html"
}

// Data Access Functions
function getActivities() {
  return JSON.parse(localStorage.getItem("activities") || "[]")
}

function getActivity(id) {
  const activities = getActivities()
  return activities.find((a) => a.id === Number.parseInt(id))
}

function getSchedules() {
  return JSON.parse(localStorage.getItem("schedules") || "[]")
}

function getSchedule(id) {
  const schedules = getSchedules()
  return schedules.find((s) => s.id === Number.parseInt(id))
}

function getUserSchedules(userId) {
  const schedules = getSchedules()
  const user = getCurrentUser()

  if (user.role === "elderly") {
    return schedules.filter((s) => s.elderlyId === userId)
  } else {
    return schedules.filter((s) => s.volunteerId === userId)
  }
}

function createSchedule(scheduleData) {
  const schedules = getSchedules()
  const newSchedule = {
    id: schedules.length + 1,
    ...scheduleData,
    status: "pending",
  }
  schedules.push(newSchedule)
  localStorage.setItem("schedules", JSON.stringify(schedules))
  return newSchedule
}

function updateSchedule(id, updates) {
  const schedules = getSchedules()
  const index = schedules.findIndex((s) => s.id === Number.parseInt(id))
  if (index !== -1) {
    schedules[index] = { ...schedules[index], ...updates }
    localStorage.setItem("schedules", JSON.stringify(schedules))
    return schedules[index]
  }
  return null
}

function deleteSchedule(id) {
  let schedules = getSchedules()
  schedules = schedules.filter((s) => s.id !== Number.parseInt(id))
  localStorage.setItem("schedules", JSON.stringify(schedules))
}

function getEvents() {
  return JSON.parse(localStorage.getItem("events") || "[]")
}

function getEvent(id) {
  const events = getEvents()
  return events.find((e) => e.id === Number.parseInt(id))
}

function createEvent(eventData) {
  const events = getEvents()
  const newEvent = {
    id: events.length + 1,
    ...eventData,
    registered: 0,
  }
  events.push(newEvent)
  localStorage.setItem("events", JSON.stringify(events))
  return newEvent
}

function updateEvent(id, updates) {
  const events = getEvents()
  const index = events.findIndex((e) => e.id === Number.parseInt(id))
  if (index !== -1) {
    events[index] = { ...events[index], ...updates }
    localStorage.setItem("events", JSON.stringify(events))
    return events[index]
  }
  return null
}

function deleteEvent(id) {
  let events = getEvents()
  events = events.filter((e) => e.id !== Number.parseInt(id))
  localStorage.setItem("events", JSON.stringify(events))
}

function getRatings() {
  return JSON.parse(localStorage.getItem("ratings") || "[]")
}

function createRating(ratingData) {
  const ratings = getRatings()
  const newRating = {
    id: ratings.length + 1,
    ...ratingData,
    date: new Date().toISOString().split("T")[0],
  }
  ratings.push(newRating)
  localStorage.setItem("ratings", JSON.stringify(ratings))
  return newRating
}

function getBlogPosts() {
  return JSON.parse(localStorage.getItem("blogPosts") || "[]")
}

function getBlogPost(id) {
  const posts = getBlogPosts()
  return posts.find((p) => p.id === Number.parseInt(id))
}

function getFAQs() {
  return JSON.parse(localStorage.getItem("faqs") || "[]")
}

// UI Helper Functions
function showAlert(message, type = "success") {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type}`
  alertDiv.textContent = message

  const container = document.querySelector(".container")
  if (container) {
    container.insertBefore(alertDiv, container.firstChild)
    setTimeout(() => alertDiv.remove(), 3000)
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR")
}

function formatTime(timeString) {
  return timeString
}

// Check authentication
function requireAuth() {
  const user = getCurrentUser()
  if (!user) {
    window.location.href = "/login.html"
    return false
  }
  return true
}

// Update header based on auth state
function updateHeader() {
  const user = getCurrentUser()
  const authLinks = document.getElementById("auth-links")
  const userMenu = document.getElementById("user-menu")

  if (user && authLinks && userMenu) {
    authLinks.style.display = "none"
    userMenu.style.display = "flex"

    const userName = document.getElementById("user-name")
    const userRole = document.getElementById("user-role")

    if (userName) userName.textContent = user.name
    if (userRole) {
      userRole.textContent = user.role === "elderly" ? "Idoso" : "Voluntário"
      userRole.className = `role-badge ${user.role}`
    }
  } else if (authLinks && userMenu) {
    authLinks.style.display = "flex"
    userMenu.style.display = "none"
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  initializeMockData()
  updateHeader()

  // Logout button
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      logout()
    })
  }
})
