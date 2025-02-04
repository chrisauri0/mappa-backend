const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Plan = sequelize.define(
  "Plan",
  {
    name_plan: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      unique: false,
    },
    stripePriceId: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("available", "unavailable"),
      defaultValue: "available",
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Plan;
