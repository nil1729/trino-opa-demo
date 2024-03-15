const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

// get all policies for a user
exports.getPoliciesByUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    throw new Error("User not found");
  }
  const groups = await user.getGroups();
  const policies = [];
  for (const group of groups) {
    const groupPolicies = await group.getPolicies();
    policies.push(...groupPolicies);
  }
  res.status(200).json(policies);
});
