# FullStackIL Bot


**FullStackIL Bot** is a custom bot for discord, created to serve the FullStackIL discord community, using the *discord.js* v13 module.



# Discord.js

![discord.js logo](https://camo.githubusercontent.com/d55d8a7f07a103454ebb77b653d9600ce27e011f78395d9713b432c8c011c76a/68747470733a2f2f646973636f72642e6a732e6f72672f7374617469632f6c6f676f2e737667)
**discord.js** is a powerful Node.js module that allows you to interact with the Discord API.
* Object-oriented
* Predictable abstractions
* Performant
* 100% coverage of the *Discord API*

For further information about **discord.js** module [discord.js website](https://discord.js.org/#/)

## What is a discord bot

A **bot** is an automated Discord account. It utilises the [Discord API](https://discord.com/developers/docs/intro). They have a "BOT" tag next to their username. They can be added through the API. Bots typically follow a command structure, where a user sends a prefixed message and the bot reponds, though bots can work in many different ways.

## Requirements


* Discord bot Token [Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
* Node.js v16.16 or above

## Features & Commands


* default **Prefix** is `!!`

* **ghostping** - ghostpinging a member for the given amount of times in every text channel in the server (dynamic) (max 5) **[limited only to administrative roles]**. 
  `!!ghostping @user <numberOfTimes>`
  
* **help** - a dynamic-designed command featuring a request for help by user, can add reason and will state voice channel if in one for efficiency bonus.
  `!!help <reason>`

* **info** - a dynamic-designed command featuring all of the commands available by the bot with a description.
  `!!info`
  
* **lock/unlock** - locks/unlocks the server. (changes the view for members from null to false and from false to null) ignores pre-specified categories **[limited only to administrative roles]**.
  `!!lock / !!unlock`

* **adminpanel** - a never seen before command, made to make discord role settings moderation as simple as it can be. dynamically updates from the guild's role list and saved in a MongoDB database, applying the settings whenever you creat a new category in your guild. (because of the discord channels nature to extend the parent channel's (category) permissions. **[limited only to administrative roles]**
  `!!adminpanel / deleting a role will re-run this function in the designated channel`

* **ping pong** command to indicate the bot is currently responsive to your server.
  `!!ping`

Additionally, added a full aliases system by the discord users community conventions.
> such as h/helpme for help, gp for ghostping and more.
