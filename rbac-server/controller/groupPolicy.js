const Group = require("../models/Group");
const Policy = require("../models/Policy");
const GroupPolicyMap = require("../models/GroupPolicyMap");
const asyncHandler = require("../middleware/asyncHandler");

// associate a policy with a group
exports.associatePolicyWithGroup = asyncHandler(async (req, res) => {
  const group = await Group.findByPk(req.body.groupId);
  if (!group) {
    throw new Error("group not found");
  }
  const policy = await Policy.findByPk(req.body.policyId);
  if (!policy) {
    throw new Error("policy not found");
  }
  group.addPolicy(policy);
  res.status(201).json({ group, policy });
});

// get all policies associated with a group
exports.getPoliciesByGroup = asyncHandler(async (req, res) => {
  const group = await Group.findByPk(req.params.groupId, {
    include: [{ model: Policy, attributes: ["policyId", "catalog", "schema", "table", "columns"] }],
  });
  if (!group) {
    throw new Error("group not found");
  }
  res.status(200).json(group);
});
