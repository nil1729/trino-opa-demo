const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

// create a new user
exports.createUser = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    throw new Error("name is required");
  }
  if (!req.body.email) {
    throw new Error("email is required");
  }
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
  });
  res.status(201).json(user);
});

// get all users
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});
