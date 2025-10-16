// src/index.js
import express from "express"
import cors from "cors"
import morgan from "morgan"
import "dotenv/config"
import { sequelize } from "./config/database.js"

// IMPORTAR TODOS OS MODELS
import "./models/Agendamento.js"
import "./models/Atividade.js"
import "./models/Avaliacao.js"
import "./models/Evento.js"
import "./models/Exercicio.js"
import "./models/Faq.js"
import "./models/index.js"
import "./models/InscricaoEvento.js"
import "./models/PostBlog.js"
import "./models/Usuario.js"

// Rotas
import rotasUsuarios from "./routes/usuarios.js"
import rotasAtividades from "./routes/atividades.js"
import rotasAgendamentos from "./routes/agendamentos.js"
import rotasEventos from "./routes/eventos.js"
import rotasAvaliacoes from "./routes/avaliacoes.js"
import rotasBlog from "./routes/blog.js"
import rotasFaq from "./routes/faq.js"

const app = express()
const port = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// Rotas
app.use("/usuarios", rotasUsuarios)
app.use("/atividades", rotasAtividades)
app.use("/agendamentos", rotasAgendamentos)
app.use("/eventos", rotasEventos)
app.use("/avaliacoes", rotasAvaliacoes)
app.use("/blog", rotasBlog)
app.use("/faq", rotasFaq)

app.get("/", (req, res) => {
  res.send("API rodando!")
})

// Criar tabelas e iniciar o servidor
const iniciarServidor = async () => {
  try {
    await sequelize.authenticate()
    console.log("Conexão com o banco de dados estabelecida com sucesso!")

    // Se precisar recriar as tabelas, use force: true (CUIDADO: apaga todos os dados!)
    // Ou delete manualmente as tabelas no MySQL antes de rodar
    await sequelize.sync({ force: false })
    console.log("Tabelas criadas/atualizadas com sucesso!")

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`)
    })
  } catch (error) {
    console.error("Erro ao criar tabelas ou iniciar servidor:", error)
  }
}

iniciarServidor()
