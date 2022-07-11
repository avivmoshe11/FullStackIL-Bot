const main = require("../bot");

module.exports = {
  name: "addbaseperms",
  description: "top secret interaction.. shhh 😶",
  aliases: [""],
  run: async (client, msg, args) => {
    //main.modules.basePerms.push({ id: "test", perms: "ok" });
    const permitted = await msg.member.roles.cache.get("989187340385783849");
    if (!permitted) return msg.channel.send("You don't have the permissions to use that command");

    if (!msg.mentions.roles.first()) return msg.channel.send(`you must mention a role`);
    let roleId = msg.mentions.roles.first();
    let allow = true;
    let perm;
    await msg.react("👀");
    await msg.react("💬");
    await msg.react("🔊");
    setTimeout(() => {
      allow = false;
      return msg.channel.send("time's up!");
    }, 5000);
    // client.on("messageReactionAdd", (rmsg, user) => {
    //   if (allow) {
    //     if (rmsg.message.author.id == user.id) {
    //       console.log(rmsg._emoji.name);
    //     }
    //   }
    //   return;
    // });

    // for (let p of main.modules.basePerms) {
    //   if (p.id == roleId) {
    //     return msg.channel.send("role already updated in list");
    //   }
    // }
  },
};
