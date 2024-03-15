const { DataTypes } = require("sequelize");
const RbacStore = require("../db");

const Group = RbacStore.client.define(
  "Group",
  {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      field: "group_id",
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "groups",
  }
);

module.exports = Group;
