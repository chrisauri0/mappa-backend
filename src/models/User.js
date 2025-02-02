const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = sequelize.define(
  "User",
  {
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    photo: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
