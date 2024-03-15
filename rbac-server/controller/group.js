const Group = require("../models/Group");
const asyncHandler = require("../middleware/asyncHandler");

// create a new group
exports.createGroup = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    throw new Error("name is required");
  }
  const group = await Group.create({
    name: req.body.name,
  });
  res.status(201).json(group);
});

// get all groups
exports.getGroups = asyncHandler(async (req, res) => {
  const groups = await Group.findAll();
  res.status(200).json(groups);
});
