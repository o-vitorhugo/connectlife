import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const InscricaoEvento = sequelize.define(
  "InscricaoEvento",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_evento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "eventos",
        key: "id",
      },
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("confirmado", "cancelado"),
      defaultValue: "confirmado",
    },
  },
  {
    tableName: "inscricoes_eventos",
  },
)

export default InscricaoEvento
