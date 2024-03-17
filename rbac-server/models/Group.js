const { DataTypes } = require("sequelize");
const RbacStore = require("../db");

const Group = RbacStore.client.define(
  "Group",
  {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "group_id",
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "groups",
  }
);

module.exports = Group;
