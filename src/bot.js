require("dotenv").config();
const { createDecipheriv } = require("crypto");
const { Client, Intents, Collection, Guild, GuildChannel, GuildMember, TextChannel, Message } = require("discord.js");
const client = new Client({ intents: new Intents(32767) });
const fs = require("fs");
const mongoose = require("mongoose");
const { Role } = require("./models/roles");

mongoose
  .connect(process.env.LOGIN)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(`could not connect to mongo db ${err}`);
  });

client.commands = new Collection();
client.aliases = new Collection();

const commands = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".js"));
console.log(`loading...`);
for (file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${commandName}`);
  client.commands.set(command.name, command);
  command.aliases.forEach((alias) => {
    client.aliases.set(alias, command.name);
  });
  console.log(`${file} has been loaded`);
}
const prefix = "!!";
const version = "1.0";

let basePerms = [
  { id: "945363813895663689", perms: { VIEW_CHANNEL: true } },
  { id: "989602399024975952", perms: { SEND_MESSAGES: false, CONNECT: false } },
];
//addPerm(client, "945363813895663689", { view: true }, Role);
//addPerm(client, "989602399024975952", { messageFalse: true }, Role);

client.on("ready", () => {
  console.log("ready!");
  client.user.setActivity(`${prefix}help || ${prefix}info`, { type: "PLAYING" });
  client.user.setStatus("online");
});

client.on("messageCreate", (msg) => {
  if (msg.content == "<@989275344991297576>" && !msg.author.bot) {
    return msg.channel.send(`my prefix is "${prefix}" and i only reply in the <#989164227082199100> channel`);
    //was return
  }
  if (msg.content.startsWith(prefix) && !msg.author.bot) {
    if (msg.channel.id != "989164227082199100" && !msg.content.includes(`${prefix}h`) && msg.channel.id != "989660174220427354")
      return msg.channel.send(`I only reply in the <#989164227082199100> channel. Feel free to join me :slight_smile:`);
    console.log(msg.author.tag + ": " + msg.content);
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    } else {
      return msg.channel.send({ content: "That Command doesn't exist" });
    }

    command.run(client, msg, args);
  }
});

client.on("channelCreate", async (channel) => {
  console.log(`new channel created: ${channel.name}`);
  if (channel.type == "GUILD_CATEGORY") {
    //channel.permissionOverwrites.edit("989291113938575462", { VIEW_CHANNEL: true });
    let roles = await Role.find({ toReturn: "aa" });
    if (!roles || roles.length == 0) return console.log("no roles bro");
    //console.log(roles);
    let permissionsToAdd;
    for (let role of roles) {
      permissionsToAdd = "{";
      ///// start

      /// view
      if (role.view) {
        permissionsToAdd += ' "VIEW_CHANNEL": true,';
      } else if (role.view == false) {
        permissionsToAdd += ' "VIEW_CHANNEL": false,';
      }

      /// message
      if (role.message) {
        permissionsToAdd += ' "SEND_MESSAGES": true,';
      } else if (role.message == false) {
        permissionsToAdd += ' "SEND_MESSAGES": false,';
      }

      /// connect
      if (role.connect) {
        permissionsToAdd += ' "CONNECT": true,';
      } else if (role.connect == false) {
        permissionsToAdd += ' "CONNECT": false,';
      }
      /// manageChannel
      if (role.manageChannel) {
        permissionsToAdd += ' "MANAGE_CHANNELS": true,';
      } else if (role.manageChannel == false) {
        permissionsToAdd += ' "MANAGE_CHANNELS": false,';
      }
      /// manageMessages
      if (role.manageMessages) {
        permissionsToAdd += ' "MANAGE_MESSAGES": true,';
      } else if (role.manageMessages == false) {
        permissionsToAdd += ' "MANAGE_MESSAGES": false,';
      }
      permissionsToAdd = permissionsToAdd.slice(0, -1);
      permissionsToAdd += "}";
      //let test = JSON.parse(permissionsToAdd);
      //console.log(test);
      console.log(role.roleId, JSON.parse(permissionsToAdd));
      channel.permissionOverwrites.edit(role.roleId, JSON.parse(permissionsToAdd));
      permissionsToAdd = "{";
    }
  }
});

client.on("roleDelete", async (role) => {
  let ch = await role.guild.channels.cache.get("989660174220427354");
  let msg = await ch.send("test lol");
  console.log(msg.author);
  let found = await Role.findOneAndDelete({ roleId: role.id });
  if (found) {
    console.log("role deleted");
  } else {
    console.log("role wasn't important lol");
  }
  let command = await client.commands.get("adminpanel");
  command.run(client, msg, null);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.component.style == "PRIMARY") {
      interaction.component.setStyle("SUCCESS");
      interaction.update({
        components: interaction.message.components,
      });

      let args = await interaction.component.customId.split(",");
      let id = args.shift();
      console.log(id, { [args]: true });
      addPerm(id, { [args]: true }, Role);
    } else if (interaction.component.style == "SUCCESS") {
      interaction.component.setStyle("DANGER");
      interaction.update({ components: interaction.message.components });

      let args = await interaction.component.customId.split(",");
      let id = args.shift();
      console.log(id, { [args]: false });
      updatePerm(id, { [args]: false }, Role);
    } else if (interaction.component.style == "DANGER") {
      interaction.component.setStyle("PRIMARY");
      interaction.update({ components: interaction.message.components });

      let args = await interaction.component.customId.split(",");
      let id = args.shift();
      console.log(id, { [args]: null });
      removePerm(id, { [args]: null }, Role);
    }
  }
});

async function addPerm(id, perm, Role) {
  let roleFromDb = await Role.findOne({ roleId: id });
  if (roleFromDb) {
    await updatePerm(id, perm, Role);
    return;
  }
  console.log(perm);
  await new Role({
    roleId: id,
    ...perm,
  }).save();
  console.log("added!");
}

async function removePerm(id, perm, Role) {
  await updatePerm(id, perm, Role);
  let roleFromDb = await Role.findOne({ roleId: id });
  if (roleFromDb) {
    if (
      roleFromDb.view == null &&
      roleFromDb.connect == null &&
      roleFromDb.message == null &&
      roleFromDb.manageChannel == null &&
      roleFromDb.manageMessages == null
    ) {
      let found = await Role.findOneAndDelete({ roleId: id });
      if (found) {
        return console.log("role deleted");
      } else {
        return console.log("wat");
      }
    }
  }
}

async function updatePerm(id, perm, Role) {
  await Role.findOneAndUpdate(
    {
      roleId: id,
    },
    perm
  );
  return console.log("updated!");
}
client.login(process.env.TOKEN);

exports.modules = {
  prefix: prefix,
  version: version,
  basePerms: basePerms,
};
