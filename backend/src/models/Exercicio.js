import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const Exercicio = sequelize.define(
  "Exercicio",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nivel: {
      type: DataTypes.ENUM("LEVE", "MODERADO", "INTENSO"),
      defaultValue: "LEVE",
    },
  },
  {
    tableName: "exercicios",
    timestamps: false, // evita criação automática de createdAt/updatedAt
  }
)

export default Exercicio
