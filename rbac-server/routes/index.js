const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const groupController = require("../controller/group");
const userGroupController = require("../controller/userGroup");
const policyController = require("../controller/policy");
const groupPolicyController = require("../controller/groupPolicy");

router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.post("/groups", groupController.createGroup);
router.get("/groups", groupController.getGroups);
router.post("/user-groups", userGroupController.associateUserWithGroup);
router.get("/user-groups/:userId", userGroupController.getGroupsByUser);
router.post("/policies", policyController.createPolicy);
router.get("/policies", policyController.getPolicies);
router.post("/group-policies", groupPolicyController.associatePolicyWithGroup);
router.get("/group-policies/:groupId", groupPolicyController.getPoliciesByGroup);

module.exports = router;
