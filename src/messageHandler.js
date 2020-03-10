const moment = require("moment");
const art = require("./art");
const { Database } = require("@johnny.reina/json-db");
const jobs = new Database("blazeitbot").collection("jobs");
const helpText = require("./helpText");

function send(message, text) {
  if (art(text).length <= 2000) message.channel.send(art(text));
  else
    [...text.join("")].map(art).forEach(letter => {
      message.channel.send(letter);
    });
}

module.exports = function messageHandler(message) {
  if (
    message.mentions &&
    message.mentions.users.has("685938555360641050") &&
    message.content.includes("help")
  ) {
    // it me
    message.channel.send(helpText);
  }
  if (message.content.startsWith("!")) {
    const [command, ...text] = message.content.replace("!", "").split(" ");
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
        type: message.channel.type
      };

      jobs.insert(job);
      message.channel.send(`Added subscription for channel ${job.channelName}`);
    }
  }
};
