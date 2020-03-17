const redis = require("ioredis");
const auth = require("../auth");

class SubscriptionRA {
  constructor() {
    this.db = new redis(auth.redis.host);
    this.key = "blazitbot420:subscriptions";
  }
  async addSubscription(subscription) {
    const existing = await this.findSubscription(
      subscription.guild,
      subscription.channel
    );
    if (existing === undefined) {
      await this.db.lpush(this.key, JSON.stringify(subscription));
      return true;
    }
    return false;
  }
  async getSubscriptions() {
    const subscriptions = await this.db.lrange(this.key, 0, -1);
    return subscriptions.map(x => JSON.parse(x));
  }
  async removeSubscription(guildId, channelId) {
    const existingSub = await this.findSubscription(guildId, channelId);
    if (existingSub !== undefined)
      this.db.lrem(this.key, 1, JSON.stringify(existingSub));
  }
  async findSubscription(guildId, channelId) {
    const subs = await this.getSubscriptions();
    return subs.find(sub => sub.guild === guildId && sub.channel === channelId);
  }
}

module.exports = new SubscriptionRA();
