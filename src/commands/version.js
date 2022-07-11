var main = require(`../bot`);
module.exports = {
  name: "version",
  description: "this method returns bot's current version. nothing interesting.",
  aliases: ["v"],
  run: (client, msg, args) => {
    console.log(main.modules.version);
    msg.channel.send(`System is running on version: ${main.modules.version}`);
  },
};
