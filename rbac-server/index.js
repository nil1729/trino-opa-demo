const express = require("express");
const RbacStoreSync = require("./db/sync");
const { initializeTrinoGroups } = require("./trino");
const SERVER_PORT = process.env.SERVER_PORT;

const app = express();

// handle json request body
app.use(express.json());

// routes
app.use("/api/v1", require("./routes"));

app.listen(SERVER_PORT, async function () {
  await RbacStoreSync();
  await initializeTrinoGroups();
  console.log(`server is running on port ${SERVER_PORT}`);
});
