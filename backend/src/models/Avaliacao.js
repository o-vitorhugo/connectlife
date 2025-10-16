import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const Avaliacao = sequelize.define(
  "Avaliacao",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_agendamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "agendamentos",
        key: "id",
      },
    },
    id_idoso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    nota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "avaliacoes",
    timestamps: false,
  },
)

export default Avaliacao
