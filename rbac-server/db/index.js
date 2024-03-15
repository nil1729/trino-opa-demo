const { Sequelize } = require("sequelize");

const config = {
  user: process.env.RBAC_STORE_USER,
  password: process.env.RBAC_STORE_PASSWORD,
  host: process.env.RBAC_STORE_HOST,
  port: process.env.RBAC_STORE_PORT,
  database: process.env.RBAC_STORE_DB,
};

const PostgresClient = new Sequelize({
  username: config.user,
  password: config.password,
  database: config.database,
  host: config.host,
  port: config.port,
  dialect: "postgres",
});

class RbacStore {
  client = PostgresClient;

  constructor() {
    this.connect();
  }

  async connect() {
    await this.client.authenticate();
    console.log("connected to RBAC store");
  }

  async close() {
    await this.client.close();
    console.log("disconnected from RBAC store");
  }
}

module.exports = new RbacStore();
