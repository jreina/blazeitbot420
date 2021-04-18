const { MongoClient } = require("mongodb");
module.exports.MongoFactory = class MongoFactory {
  static async getInstance() {
    if (MongoFactory._db) return MongoFactory._db;
    MongoFactory._db = (
      await MongoClient.connect(process.env.MONGO_CONNECTION_STRING, {
        useUnifiedTopology: true,
      })
    ).db("blazeitbot");
    return MongoFactory._db;
  }
};
