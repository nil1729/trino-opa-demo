const Fs = require("fs");
const Path = require("path");
const Group = require("../models/Group");
const User = require("../models/User");
const TRINO_GROUP_TXT_FILE_PATH = process.env.TRINO_GROUP_TXT_FILE_PATH;

async function modifyTrinoGorups() {
  const filePath = Path.resolve(TRINO_GROUP_TXT_FILE_PATH);
  const groups = await Group.findAll({
    include: [
      {
        model: User,
        attributes: ["email"],
      },
    ],
  });
  const groupLines = [];
  for (const group of groups) {
    const groupUsers = group.Users.map((user) => user.email);
    const groupLine = `${group.name}: ${groupUsers.join(",")}\n`;
    groupLines.push(groupLine);
  }
  groupLines.sort();
  const groupTxt = groupLines.join("");
  try {
    Fs.writeFileSync(filePath, groupTxt);
  } catch (error) {
    console.error(`error writing to ${filePath}`, error);
  }
}

async function initializeTrinoGroups() {
  await modifyTrinoGorups();
  console.log("trino groups initialized");
}

module.exports = {
  modifyTrinoGorups,
  initializeTrinoGroups,
};
