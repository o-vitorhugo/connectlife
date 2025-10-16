// models/Atividade.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Atividade = sequelize.define("Atividade", {
  titulo: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false },
  categoria: { type: DataTypes.STRING, allowNull: false },
  duracao: { type: DataTypes.STRING },
  dificuldade: { type: DataTypes.STRING },
  imagem: { type: DataTypes.STRING },
  beneficios: { type: DataTypes.JSON },
  materiaisNecessarios: { type: DataTypes.JSON },
});

export default Atividade;
