const { DataTypes } = require("sequelize");
const RbacStore = require("../db");
const Group = require("./Group");
const Policy = require("./Policy");

const GroupPolicyMap = RbacStore.client.define(
  "GroupPolicyMap",
  {
    mappingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "mapping_id",
    },
  },
  {
    tableName: "group_policy_mappings",
  }
);

Group.belongsToMany(Policy, { through: GroupPolicyMap });
Policy.belongsToMany(Group, { through: GroupPolicyMap });
module.exports = GroupPolicyMap;
