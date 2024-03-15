const Models = require("../models");

async function sync() {
  await Models.Group.sync({ alter: true });
  await Models.Policy.sync({ alter: true });
  await Models.User.sync({ alter: true });
  await Models.UserGroupMap.sync({ alter: true });
  await Models.GroupPolicyMap.sync({ alter: true });
  console.log("RBAC store is synced successfully");
}

module.exports = sync;
