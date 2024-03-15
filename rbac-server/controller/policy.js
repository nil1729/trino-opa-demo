const Policy = require("../models/Policy");
const asyncHandler = require("../middleware/asyncHandler");

// create a new policy
exports.createPolicy = asyncHandler(async (req, res) => {
  const policyBody = {
    name: req.body.name,
    catalog: req.body.catalog,
    schema: req.body.schema,
    table: req.body.table,
    columns: req.body.columns,
    clusterId: req.body.clusterId,
  };
  const policy = await Policy.create(policyBody);
  res.status(201).json(policy);
});

// get all policies
exports.getPolicies = asyncHandler(async (req, res) => {
  const policies = await Policy.findAll();
  res.status(200).json(policies);
});
