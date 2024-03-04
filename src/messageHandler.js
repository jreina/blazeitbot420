const moment = require("moment");
const art = require("./art");
const helpText = require("./helpText");
const SubscriptionRA = require("./data/SubscriptionRA");
const { MongoFactory } = require("./factories/MongoFactory");

function send(message, text) {
  if (art(text).length <= 2000) message.channel.send(art(text));
  else
    [...text.join("")].map(art).forEach((letter) => {
      message.channel.send(letter);
    });
}

module.exports = (bot) =>
  async function messageHandler(message) {
    const db = await MongoFactory.getInstance();
    const subscriptionRA = new SubscriptionRA(db);

    if (message.content.startsWith("420!")) {
      const [command, ...text] = message.content.replace("420!", "").split(" ");
      if (command === "blaze") {
        send(message, moment().format("h:mm"));
      } else if (command === "blazify") {
        send(message, text.join(" "));
      } else if (command === "dailyblaze") {
        if (message.channel.type === "dm") {
          return message.channel.send(
            "Sorry, buddy! I can't do dailyblaze alerts for DMs :("
          );
        }

        const job = {
          channel: message.channel.id,
          guild: message.guild.id,
          channelName: message.channel.name,
          user: message.author.tag,
          type: message.channel.type,
        };

        const wasAdded = await subscriptionRA.addSubscription(job);
        if (wasAdded) {
          message.channel.send(
            `Added subscription for channel ${job.channelName}`
          );

          console.log(`Adding subscription. Job: ${JSON.stringify(job)}`);
        } else
          message.channel.send(
            `Subscription for channel ${job.channelName} already exists!`
          );
      } else if (command === "dedailyblaze") {
        await subscriptionRA.removeSubscription(
          message.guild.id,
          message.channel.id
        );
        message.channel.send(
          `Removed subscription for channel ${message.channel.name}`
        );
      } else if (command === "dailyblazelist") {
        const subs = await subscriptionRA.getSubscriptions(message.guild.id);
        const currentServerSubs = subs
          .map((sub) => `#${sub.channelName} added by ${sub.user}`)
          .join("\n");
        const msg = `dailyblaze subscriptions for this server:\n\n${currentServerSubs}`;
        message.channel.send(msg);
      } else if (command === "help") {
        message.channel.send(helpText);
      }
    }
  };
