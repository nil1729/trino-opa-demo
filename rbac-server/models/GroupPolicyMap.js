const { DataTypes } = require("sequelize");
const RbacStore = require("../db");
const Group = require("./Group");
const Policy = require("./Policy");

const GroupPolicyMap = RbacStore.client.define(
  "GroupPolicyMap",
  {
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: Group,
        key: "group_id",
      },
      field: "group_id",
    },
    policyId: {
      type: DataTypes.INTEGER,
      references: {
        model: Policy,
        key: "policy_id",
      },
      field: "policy_id",
    },
  },
  {
    tableName: "group_policy_mappings",
  }
);

Group.belongsToMany(Policy, { through: GroupPolicyMap });
Policy.belongsToMany(Group, { through: GroupPolicyMap });
module.exports = GroupPolicyMap;
