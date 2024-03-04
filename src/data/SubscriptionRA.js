const { Db } = require("mongodb");

class SubscriptionRA {
  /** @param {Db} db */
  constructor(db) {
    this.db = db;
    this.collection = "subscriptions";
  }
  async addSubscription(subscription) {
    const existing = await this.findSubscription(
      subscription.guild,
      subscription.channel
    );
    if (!existing) {
      await this.db.collection(this.collection).insertOne(subscription);
      return true;
    }
    return false;
  }
  async getAllSubscriptions() {
    return this.db.collection(this.collection).find().toArray();
  }
  async getSubscriptions(guild) {
    return this.db.collection(this.collection).find({ guild }).toArray();
  }
  async removeSubscription(guild, channel) {
    await this.db.collection(this.collection).findOneAndDelete({
      guild,
      channel,
    });
  }
  async findSubscription(guild, channel) {
    const subscription = await this.db.collection(this.collection).findOne({
      guild,
      channel,
    });
    return subscription;
  }
}

module.exports = SubscriptionRA;
