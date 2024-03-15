const express = require("express");
const RbacStore = require("./db");
const RbacStoreSync = require("./db/sync");
const SERVER_PORT = process.env.SERVER_PORT;

const app = express();

// handle json request body
app.use(express.json());

app.listen(SERVER_PORT, async function () {
  await RbacStoreSync();
  console.log(`server is running on port ${SERVER_PORT}`);
});
