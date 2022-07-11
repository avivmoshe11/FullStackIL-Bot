const mapServer = require("../functions/mapServer");
const main = require("../bot");
module.exports = {
  name: "lock",
  description: "lock/unlock the server. function for the management",
  aliases: ["unlock"],
  run: async (client, msg, args) => {
    const permitted = await msg.member.roles.cache.get("989187340385783849");
    if (!permitted) return msg.channel.send("You don't have the permissions to use that command");
    let cats = mapServer.run(client, msg, args);
    const argumentsPreShift = msg.content.slice(main.modules.prefix.length).trim().split(/ +/g);
    const commandName = argumentsPreShift.shift().toLowerCase();
    let status;
    if (commandName == "lock") {
      status = false;
    } else if (commandName == "unlock") {
      status = null;
    }
    const readOnlyCats = ["989269003123957761", "989165223724327013", "945363276215222285"];
    for (let cat of cats) {
      let check = true;
      for (let i = 0; i < readOnlyCats.length; i++) {
        if (cat.id == readOnlyCats[i]) {
          check = false;
        }
      }
      if (check) {
        for (let j = 0; j < cat.children.length; j++) {
          if (cat.children[j].id != "989164002204610590" && cat.children[j].id != "989245893737840712") {
            cat.children[j].pointer.permissionOverwrites.edit("945363813895663689", { VIEW_CHANNEL: status });
          }
        }
      } else {
        console.log(`forbidden: ${cat.name}`);
      }
    }
  },
};
