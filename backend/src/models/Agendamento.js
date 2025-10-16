import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const Agendamento = sequelize.define(
  "Agendamento",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pendente", "confirmado", "concluido", "cancelado"),
      defaultValue: "pendente",
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "agendamentos",
    timestamps: false,
  }
)

export default Agendamento
