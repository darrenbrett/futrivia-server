"use strict";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const config = require("./configuration");
const url = config.get("MONGO_URL");
const dbName = config.get("MONGO_DATABASE");

const start = async () => {
  const connectionOpts = {
    db: {
      address: `${url}${dbName}`
    }
  };
  console.log(`Connected to ${process.env.NODE_ENV} database`);
};

start().catch(error => {
  console.error(error);
  process.exit(-1);
});
