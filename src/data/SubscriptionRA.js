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
  async getSubscriptions(guildId) {
    return this.db.collection(this.collection).find({ guildId }).toArray();
  }
  async removeSubscription(guildId, channelId) {
    await this.db.collection(this.collection).findOneAndDelete({
      guildId,
      channelId,
    });
  }
  async findSubscription(guildId, channelId) {
    const subscription = await this.db.collection(this.collection).findOne({
      guildId,
      channelId,
    });
    return subscription;
  }
}

module.exports = SubscriptionRA;
