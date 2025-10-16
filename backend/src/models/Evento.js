import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const Evento = sequelize.define(
  "Evento",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    local: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    capacidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inscritos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    organizador: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    imagem: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "eventos",
    timestamps: false, // evita erro se não tiver createdAt/updatedAt
  }
)

export default Evento
