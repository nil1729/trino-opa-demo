// create catalog access policy
exports.createCatalogAccess = function (policies, entityKey, entityValue) {
  const catalogSet = getDistinctCatalogs(policies);
  return {
    [entityKey]: entityValue,
    access: [
      {
        catalog: catalogSet,
      },
    ],
  };
};

// create schema access policy
exports.createSchemaAccess = function (policies, entityKey, entityValue) {
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
    [entityKey]: entityValue,
    access: schemaAccess,
  };
};

// create table access policy
exports.createTableAccess = function (policies, entityKey, entityValue) {
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
    [entityKey]: entityValue,
    access: tableAccess,
  };
};

// create column access policy
exports.createColumnAccess = function (policies, entityKey, entityValue) {
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
    [entityKey]: entityValue,
    access: columnAccess,
  };
};

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
