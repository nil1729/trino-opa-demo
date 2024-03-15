const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

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
      catalogAccess.push(createCatalogAccess(policies, user));
      schemaAccess.push(createSchemaAccess(policies, user));
      tableAccess.push(createTableAccess(policies, user));
      columnAccess.push(createColumnAccess(policies, user));
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

// create catalog access policy
function createCatalogAccess(policies, user) {
  const catalogSet = getDistinctCatalogs(policies);
  return {
    user: user.email,
    access: [
      {
        catalog: catalogSet,
      },
    ],
  };
}

// create schema access policy
function createSchemaAccess(policies, user) {
  const catalogSet = getDistinctCatalogs(policies);
  const schemaAccess = [];

  for (const catalog of catalogSet) {
    const schemaSet = new Set();
    for (const policy of policies) {
      if (policy.catalog === catalog) {
        schemaSet.add(policy.schema);
      }
    }
    schemaAccess.push({
      catalog: catalog,
      schema: Array.from(schemaSet),
    });
  }

  return {
    user: user.email,
    access: schemaAccess,
  };
}

// create table access policy
function createTableAccess(policies, user) {
  const catalogSet = getDistinctCatalogs(policies);
  const schemaSet = getDistinctSchemas(policies);
  const tableAccess = [];

  for (const catalog of catalogSet) {
    for (const schema of schemaSet) {
      const tableSet = new Set();
      for (const policy of policies) {
        if (policy.catalog === catalog && policy.schema === schema) {
          tableSet.add(policy.table);
        }
      }
      tableAccess.push({
        catalog: catalog,
        schema: schema,
        table: Array.from(tableSet),
      });
    }
  }

  return {
    user: user.email,
    access: tableAccess,
  };
}

// create column access policy
function createColumnAccess(policies, user) {
  const catalogSet = getDistinctCatalogs(policies);
  const schemaSet = getDistinctSchemas(policies);
  const tableSet = getDistinctTables(policies);
  const columnAccess = [];

  for (const catalog of catalogSet) {
    for (const schema of schemaSet) {
      for (const table of tableSet) {
        const columnSet = new Set();
        for (const policy of policies) {
          if (policy.catalog === catalog && policy.schema === schema && policy.table === table) {
            policy.columns.forEach((column) => {
              columnSet.add(column);
            });
          }
        }
        columnAccess.push({
          catalog: catalog,
          schema: schema,
          table: table,
          column: Array.from(columnSet),
        });
      }
    }
  }

  return {
    user: user.email,
    access: columnAccess,
  };
}

function getDistinctCatalogs(policies) {
  const catalog = new Set();
  for (const policy of policies) {
    catalog.add(policy.catalog);
  }
  return Array.from(catalog);
}

function getDistinctSchemas(policies) {
  const schema = new Set();
  for (const policy of policies) {
    schema.add(policy.schema);
  }
  return Array.from(schema);
}

function getDistinctTables(policies) {
  const table = new Set();
  for (const policy of policies) {
    table.add(policy.table);
  }
  return Array.from(table);
}
