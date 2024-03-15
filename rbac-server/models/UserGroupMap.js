const { DataTypes } = require("sequelize");
const RbacStore = require("../db");
const Group = require("./Group");
const User = require("./User");

const UserGroupMap = RbacStore.client.define(
  "UserGroupMap",
  {
    userId: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "email",
      },
      field: "user_id",
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: Group,
        key: "group_id",
      },
    },
  },
  {
    tableName: "user_group_mappings",
  }
);

Group.belongsToMany(User, { through: UserGroupMap });
User.belongsToMany(Group, { through: UserGroupMap });
module.exports = UserGroupMap;
