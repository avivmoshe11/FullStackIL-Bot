module.exports = {
  name: "ping",
  description: "top secret interaction.. shhh 😶",
  aliases: ["pingi"],
  run: (client, msg, args) => {
    // let a = null;
    // if (a == null) {
    //   console.log("ok");
    // }
    msg.channel.send("pong");
  },
};
