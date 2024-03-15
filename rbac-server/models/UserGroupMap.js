const { DataTypes } = require("sequelize");
const RbacStore = require("../db");
const Group = require("./Group");
const User = require("./User");

const UserGroupMap = RbacStore.client.define(
  "UserGroupMap",
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
    tableName: "user_group_mappings",
  }
);

Group.belongsToMany(User, { through: UserGroupMap });
User.belongsToMany(Group, { through: UserGroupMap });
module.exports = UserGroupMap;
