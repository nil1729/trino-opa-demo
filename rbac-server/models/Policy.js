const { DataTypes } = require("sequelize");
const RbacStore = require("../db");

const Policy = RbacStore.client.define(
  "Policy",
  {
    policyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "policy_id",
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    catalog: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schema: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    table: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    columns: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    clusterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "cluster_id",
    },
  },
  {
    tableName: "policies",
  }
);

module.exports = Policy;
