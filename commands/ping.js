const { MessageEmbed } = require('discord.js');
const { locations } = require('../config.json');

module.exports = {
  name: "ping",
  description: "Gets bot ping",
  async execute(client, message, _, footer) {
    const index = Math.floor(Math.random() * locations.length);
    const pingLocation = locations[index]
  
    await message.channel.send(new MessageEmbed({
      "title": ":ping_pong: Ping",
      "description": "**Pong!** We pinged **" + pingLocation + "** and got " + client.ws.ping + " ms.",
      "color": 9442302, 
      "footer": footer
    }));
  }
};
