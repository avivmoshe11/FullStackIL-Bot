const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "This method calls (in your behalf) to the support team. make sure to state a reason for the request to increase efficiency.",
  aliases: ["h", "helpme"],
  run: async (client, msg, args) => {
    const memberChannel = await msg.member.voice.channel;
    const presentedChannel = memberChannel ? `<#${memberChannel.id}>` : `not in voice channel`;
    reason = args.join(", ") ? `${args.join(" ")}` : `not stated`;
    //console.log(msg.member.voice);
    const exampleEmbed = new MessageEmbed()
      .setColor("#04a2d5")
      .setTitle(`${msg.author.tag} needs your help!`)
      .addField(`reason:`, reason, true)
      .addField(`user in voice:`, presentedChannel, true)
      .setTimestamp()
      .setFooter({
        text: "made by Aviv#1234",
        iconURL: "https://static.euronews.com/articles/stories/05/79/99/44/2000x1333_cmsv2_292bef7f-8fab-5f0d-bed5-63856832498b-5799944.jpg",
      });
    msg.reply({ content: "<@&989284315802238987>", embeds: [exampleEmbed] });
  },
};
