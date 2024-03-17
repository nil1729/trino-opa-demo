const Group = require("../models/Group");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const { modifyTrinoGorups } = require("../trino");

// associate a user with a group
exports.associateUserWithGroup = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.body.userId);
  if (!user) {
    throw new Error("user not found");
  }
  const group = await Group.findByPk(req.body.groupId);
  if (!group) {
    throw new Error("group not found");
  }
  await user.addGroup(group);
  modifyTrinoGorups();
  res.status(201).json({ user, group });
});

// get all groups associated with a user
exports.getGroupsByUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.userId, {
    include: [{ model: Group, attributes: ["name", "groupId"] }],
  });
  if (!user) {
    throw new Error("user not found");
  }
  res.status(200).json(user);
});

// remove a user from a group
exports.removeUserFromGroup = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.body.userId);
  if (!user) {
    throw new Error("user not found");
  }
  const group = await Group.findByPk(req.body.groupId);
  if (!group) {
    throw new Error("group not found");
  }
  await user.removeGroup(group);
  modifyTrinoGorups();
  res.status(200).json({ user, group });
});
