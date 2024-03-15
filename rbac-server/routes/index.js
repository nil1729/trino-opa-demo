const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const groupController = require("../controller/group");
const userGroupController = require("../controller/userGroup");

router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.post("/groups", groupController.createGroup);
router.get("/groups", groupController.getGroups);
router.post("/associateUserWithGroup", userGroupController.associateUserWithGroup);
router.get("/groupsByUser/:userId", userGroupController.getGroupsByUser);

module.exports = router;
