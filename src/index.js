const Discord = require("discord.js");
const logger = console;
const auth = require("./auth");
const messageHandler = require("./messageHandler");
const art = require("./art");
const { CronJob } = require("cron");
const { Database } = require("@johnny.reina/json-db");

const jobs = new Database("blazeitbot").collection("jobs");

const bot = new Discord.Client();

const job = new CronJob(
  "0 20 16 * * *",
  async function() {
    const channels = await jobs.read(item => item.type === "text");
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

bot.on("ready", function(evt) {
  logger.info("Connected");
  logger.info("Logged in as:", bot.user.tag);
});
bot.on("message", messageHandler);

bot.login(auth.botToken);
