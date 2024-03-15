const Group = require("../models/Group");
const User = require("../models/User");
const UserGroupMap = require("../models/UserGroupMap");
const asyncHandler = require("../middleware/asyncHandler");

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
  user.addGroup(group);
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
