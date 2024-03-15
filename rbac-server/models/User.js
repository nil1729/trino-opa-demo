const { DataTypes } = require("sequelize");
const RbacStore = require("../db");

const User = RbacStore.client.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
