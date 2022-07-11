const mapServer = require("../functions/mapServer");
const main = require("../bot");

module.exports = {
  name: "ghostping",
  description: "top secret interaction.. shhh 😶",
  aliases: ["gp"],
  run: async (client, msg, args) => {
    const permitted = await msg.member.roles.cache.get("989187340385783849");
    if (!permitted) return msg.channel.send("You don't have the permissions to use that command");
    if (!msg.mentions.users.first())
      return msg.channel.send(
        `You must tag a member and number of times. ex: ${main.modules.prefix}gp <@989275344991297576> {number of times (5 is max)}`
      );
    let cats = mapServer.run(client, msg, args);
    let times = 1;
    if (parseInt(args[1])) {
      if (parseInt(args[1]) > 0) {
        times = parseInt(args[1]);
        if (times > 5) {
          times = 5;
        }
      } else return msg.channel.send(`invalid number of times (1-5)`);
    } else {
      return msg.channel.send(`invalid number of times (1-5)`);
    }
    for (let j = 0; j < times; j++) {
      for (let cat of cats) {
        for (let i = 0; i < cat.children.length; i++) {
          if (cat.children[i].channel_type == "text") {
            console.log(`${cat.children[i].name} 👍 `);
            let message = await cat.children[i].pointer.send(`<@${msg.mentions.users.first().id}>`);
            message.delete();
          }
        }
      }
    }
    console.log(`done! he went mad.`);
  },
};
