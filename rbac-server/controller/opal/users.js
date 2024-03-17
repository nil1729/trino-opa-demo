const User = require("../../models/User");
const asyncHandler = require("../../middleware/asyncHandler");
const {
  createCatalogAccess,
  createSchemaAccess,
  createTableAccess,
  createColumnAccess,
} = require("./utils");

exports.getUserPolicies = asyncHandler(async (req, res) => {
  const clusterId = req.params.clusterId;
  const users = await User.findAll();

  const opaUsers = [];
  const catalogAccess = [];
  const schemaAccess = [];
  const tableAccess = [];
  const columnAccess = [];

  for (const user of users) {
    const groups = await user.getGroups();
    const policies = [];
    for (const group of groups) {
      const groupPolicies = await group.getPolicies({ where: { clusterId } });
      policies.push(...groupPolicies);
    }
    if (policies.length === 0) {
      continue;
    } else {
      opaUsers.push(user.email);
      catalogAccess.push(createCatalogAccess(policies, "user", user.email));
      schemaAccess.push(createSchemaAccess(policies, "user", user.email));
      tableAccess.push(createTableAccess(policies, "user", user.email));
      columnAccess.push(createColumnAccess(policies, "user", user.email));
    }
  }

  res.status(200).json({
    users: opaUsers,
    catalog: catalogAccess,
    schema: schemaAccess,
    table: tableAccess,
    column: columnAccess,
  });
});
