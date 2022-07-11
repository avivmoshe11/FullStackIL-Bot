const { MessageButton, MessageActionRow, MessageEmbed, CommandInteractionOptionResolver, Collection, ButtonInteraction } = require("discord.js");
const { Role } = require("../models/roles");
module.exports = {
  name: "adminpanel",
  description: "panel for admin",
  aliases: ["ap"],
  run: async (client, msg, args) => {
    const permitted = await msg.member.roles.cache.get("989187340385783849");
    if (!permitted && !msg.author.id == "989275344991297576") return msg.channel.send("You don't have the permissions to use that command");

    const messages = await msg.channel.messages.fetch({ limit: 100 });
    const { size } = messages;
    messages.forEach(async (message) => await message.delete());

    let reply = await msg.channel.send(`deleting ${size} messages`);

    await reply.delete();
    let roles = msg.guild.roles.cache;
    for (let role of roles) {
      let roleFromDb = await Role.findOne({ roleId: role[0] });
      let viewColor = "PRIMARY";
      let messageColor = "PRIMARY";
      let connectColor = "PRIMARY";
      let manageChannelColor = "PRIMARY";
      let manageMessagesColor = "PRIMARY";
      if (roleFromDb) {
        ///// view
        if (roleFromDb.view) {
          viewColor = "SUCCESS";
        } else if (roleFromDb.view == false) {
          viewColor = "DANGER";
        }
        ///// message
        if (roleFromDb.message) {
          messageColor = "SUCCESS";
        } else if (roleFromDb.message == false) {
          messageColor = "DANGER";
        }
        ///// connect
        if (roleFromDb.connect) {
          connectColor = "SUCCESS";
        } else if (roleFromDb.connect == false) {
          connectColor = "DANGER";
        }
        ///// manageChannel
        if (roleFromDb.manageChannel) {
          manageChannelColor = "SUCCESS";
        } else if (roleFromDb.manageChannel == false) {
          manageChannelColor = "DANGER";
        }
        ///// manageMessages
        if (roleFromDb.manageMessages) {
          manageMessagesColor = "SUCCESS";
        } else if (roleFromDb.manageMessages == false) {
          manageMessagesColor = "DANGER";
        }
      }
      let row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId(`${role[0]},view`).setStyle(viewColor).setLabel("👀"),
        new MessageButton().setCustomId(`${role[0]},message`).setStyle(messageColor).setLabel("💬"),
        new MessageButton().setCustomId(`${role[0]},connect`).setStyle(connectColor).setLabel("🔊"),
        new MessageButton().setCustomId(`${role[0]},manageChannel`).setStyle(manageChannelColor).setLabel("👨‍💼📃"),
        new MessageButton().setCustomId(`${role[0]},manageMessages`).setStyle(manageMessagesColor).setLabel("👨‍💼💬")
      );
      //console.log(role[1].name, role[1].position, role[1].rawPosition);
      const exampleEmbed = new MessageEmbed().setColor("#04a2d5").setTitle(`${role[1].name}`).setDescription(`set perms for: <@&${role[0]}>  `);
      await msg.channel.send({ embeds: [exampleEmbed], components: [row] });
    }
    await msg.channel.send("all set. choose wisely. if you add a new role, just simply run the admin panel command again :)");

    // const row = new MessageActionRow().addComponents(
    //   new MessageButton().setCustomId(`${test}`).setStyle("PRIMARY").setEmoji("👀"),
    //   new MessageButton().setCustomId("test2").setStyle("PRIMARY").setEmoji("💬"),
    //   new MessageButton().setCustomId("test3").setStyle("PRIMARY").setEmoji("🔊")
    // );
    // const exampleEmbed = new MessageEmbed().setColor("#04a2d5").setTitle(`role name`).setDescription(`set perms for: role name  `);
    // await msg.channel.send({ embeds: [exampleEmbed], components: [row] });

    // client.on("interactionCreate", async (interaction) => {
    //   if (interaction.isButton() && interaction.channelId == "989660174220427354") {
    //     //interaction.setStyle("SUCCESS");
    //     interaction.reply({ content: `<@${interaction.user.id}> perm has been added!` });
    //   }
    // });
  },
};
//.setEmoji("👀").setEmoji("💬").setEmoji("🔊")
