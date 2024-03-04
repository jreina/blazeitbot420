const { config } = require("dotenv");
if (!process.env.BOT_TOKEN || !process.env.MONGO_CONNECTION_STRING) config();
if (!process.env.BOT_TOKEN || !process.env.MONGO_CONNECTION_STRING)
  throw new Error("BOT_TOKEN or MONGO_CONNECTION_STRING env variable not set");

module.exports = {
  environment: process.env.NODE_ENV || "development",
  botToken: process.env.BOT_TOKEN,
  mongo: {
    connectionString: process.env.MONGO_CONNECTION_STRING,
  },
};
