const { getUserPolicies } = require("./users");
const { getGroupPolicies } = require("./groups");

module.exports = {
  getUserPolicies: getUserPolicies,
  getGroupPolicies: getGroupPolicies,
};
