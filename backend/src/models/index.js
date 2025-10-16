import { sequelize } from "../config/database.js"
import { Usuario } from "./Usuario.js"
import Atividade from "./Atividade.js"
import Agendamento from "./Agendamento.js"
import Evento from "./Evento.js"
import InscricaoEvento from "./InscricaoEvento.js"
import Avaliacao from "./Avaliacao.js"
import PostBlog from "./PostBlog.js"
import FAQ from "./Faq.js"

Usuario.hasMany(Agendamento, { foreignKey: "id_idoso", as: "agendamentosComoIdoso" })
Usuario.hasMany(Agendamento, { foreignKey: "id_voluntario", as: "agendamentosComoVoluntario" })
Agendamento.belongsTo(Usuario, { foreignKey: "id_idoso", as: "idoso" })
Agendamento.belongsTo(Usuario, { foreignKey: "id_voluntario", as: "voluntario" })

Atividade.hasMany(Agendamento, { foreignKey: "id_atividade", as: "agendamentos" })
Agendamento.belongsTo(Atividade, { foreignKey: "id_atividade", as: "atividade" })

Agendamento.hasOne(Avaliacao, { foreignKey: "id_agendamento", as: "avaliacao" })
Avaliacao.belongsTo(Agendamento, { foreignKey: "id_agendamento", as: "agendamento" })

Usuario.hasMany(Avaliacao, { foreignKey: "id_idoso", as: "avaliacoesFeitas" })
Avaliacao.belongsTo(Usuario, { foreignKey: "id_idoso", as: "avaliador" })

Evento.hasMany(InscricaoEvento, { foreignKey: "id_evento", as: "inscricoes" })
InscricaoEvento.belongsTo(Evento, { foreignKey: "id_evento", as: "evento" })
InscricaoEvento.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" })

export { sequelize, Usuario, Atividade, Agendamento, Evento, InscricaoEvento, Avaliacao, PostBlog, FAQ }
