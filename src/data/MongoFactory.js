const { MongoClient } = require("mongodb");
class MongoFactory {
  async getInstance() {
    if (this._db) return this._db;
    this._db = MongoClient.connect(process.env.MONGO_CONNECTION_STRING);
  }
}
