const { Db } = require("mongodb");

class SubscriptionRA {
  collection = "subscriptions";
  /** @param {Db} db */
  constructor(db) {
    this.db = db;
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
