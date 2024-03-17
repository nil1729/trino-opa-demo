const Group = require("../../models/Group");
const asyncHandler = require("../../middleware/asyncHandler");
const {
  createCatalogAccess,
  createSchemaAccess,
  createTableAccess,
  createColumnAccess,
} = require("./utils");

exports.getGroupPolicies = asyncHandler(async (req, res) => {
  const clusterId = req.params.clusterId;
  const groups = await Group.findAll();

  const opaGroups = [];
  const catalogAccess = [];
  const schemaAccess = [];
  const tableAccess = [];
  const columnAccess = [];

  for (const group of groups) {
    const policies = await group.getPolicies({
      where: { clusterId },
      attributes: ["catalog", "schema", "table", "columns", "policyId"],
    });

    const mergedPolicies = mergePolicies(policies);

    if (mergedPolicies.length === 0) {
      continue;
    } else {
      opaGroups.push(group.name);
      catalogAccess.push(createCatalogAccess(policies, "group", group.name));
      schemaAccess.push(createSchemaAccess(policies, "group", group.name));
      tableAccess.push(createTableAccess(policies, "group", group.name));
      columnAccess.push(createColumnAccess(policies, "group", group.name));
    }
  }

  res.status(200).json({
    groups: opaGroups,
    catalog: catalogAccess,
    schema: schemaAccess,
    table: tableAccess,
    column: columnAccess,
  });
});

function mergePolicies(policies) {
  const mergedPolicies = {};

  policies.forEach((policy) => {
    const key = `${policy.catalog}-${policy.schema}-${policy.table}`;

    if (!mergedPolicies[key]) {
      mergedPolicies[key] = {
        policyId: Number(policy.policyId).toString(),
        catalog: policy.catalog,
        schema: policy.schema,
        table: policy.table,
        columns: policy.columns,
      };
    } else {
      mergedPolicies[key].columns = [
        ...new Set([...mergedPolicies[key].columns, ...policy.columns]),
      ];
      mergedPolicies[key].policyId = `${mergedPolicies[key].policyId}.${policy.policyId}`;
    }
  });

  return Object.values(mergedPolicies);
}
