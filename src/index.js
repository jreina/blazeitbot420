const Discord = require("discord.js");
const logger = console;
const auth = require("./auth");
const messageHandler = require("./messageHandler");
const art = require("./art");
const { CronJob } = require("cron");
const SubscriptionRA = require("./data/SubscriptionRA");

const bot = new Discord.Client();

const job = new CronJob(
  "0 20 16 * * *",
  async function() {
    const channels = await SubscriptionRA.getSubscriptions();
    channels.forEach(item => {
      console.log(
        `Processing subscription for channel ${item.channelName} (${item.channel}) created by ${item.user}`
      );
      const channel = bot.channels.resolve(item.channel);
      channel.send(art("4:20"));
    });
  },
  null,
  true,
  "America/Chicago"
);
job.start();

bot.login(auth.botToken).then(_ => {
  bot.on("ready", function(evt) {
    logger.info("Connected");
    logger.info("Logged in as:", bot.user.tag);
  });
  bot.on("message", messageHandler(bot));
});
