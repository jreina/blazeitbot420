const { MongoClient } = require("mongodb");
const auth = require('../auth');

module.exports.MongoFactory = class MongoFactory {
  static async getInstance() {
    if (MongoFactory._db) return MongoFactory._db;
    MongoFactory._db = (
      await MongoClient.connect(auth.mongo.connectionString, {
        useUnifiedTopology: true,
      })
    ).db(`blazeitbot-${auth.environment}`);
    return MongoFactory._db;
  }
};
