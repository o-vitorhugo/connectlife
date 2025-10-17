import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  papel: {
    type: DataTypes.ENUM('IDOSO', 'VOLUNTARIO'),
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  telefone: DataTypes.STRING,
  endereco: DataTypes.STRING,
  habilidades: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  interesses: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
}, {
  tableName: 'usuarios',
  timestamps: true,
});