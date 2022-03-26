const { MessageEmbed } = require('discord.js');
const {build, release} = require('../config.json');

module.exports = {

	name: 'info',
	description: 'Shows bot and host information',
	async execute(client, message, _, footerTxt) {

    function Uptime(uptime) {
      const totalSeconds = (uptime / 1000);

      const days = parseInt(totalSeconds / 86400);
      const hours = parseInt((totalSeconds % 86400) / 3600);
      const minutes = parseInt((totalSeconds % 3600) / 60);
      const seconds = parseInt(totalSeconds % 60);

      const daystring = days + (days === 1 ? "day" : "days");
      const hourstring = hours + (hours === 1 ? "day" : "days");
      const minutetring = minutes + (minutes === 1 ? "day" : "days");
      const secondstring = seconds + (seconds === 1 ? "day" : "days");

      return `${daystring}**, **${hourstring}**, **${minutetring}**, **${secondstring}`;
    }

    const os = require("os");
    const osu = require('node-os-utils');
    const cpu = osu.cpu;
    await message.channel.send(new MessageEmbed({
      "title": "<:AnitroxInfo:809651936831733791> Information about Anitrox",
      "description": "Everything you've ever wanted to know about your favorite bot, Anitrox!",
      "color": 9442302,
      "footer": {
        "icon_url": message.author.displayAvatarURL(),
        "text": footerTxt
      },
      "thumbnail": {
        "url": client.user.displayAvatarURL()
      },
      "fields": [
        {
          "name": "Bot Information",
          "value": "** **"
        },
        {
          "name": "Release Type",
          "value": release,
          "inline": true
        },
        {
          "name": "Release Version",
          "value": build,
          "inline": true
        },
        {
          "name": "Uptime",
          "value": Uptime(client.uptime),
          "inline": true
        },
        {
          "name": "<:memory:793536677737136178> Bot Memory Usage",
          "value": (Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100) + " MiB",
          "inline": true
        },
        {
          "name": "Bot Name",
          "value": client.user.tag,
          "inline": true
        },
        {
          "name": "Bot ID",
          "value": "``" + client.user.id + "``",
          "inline": true
        },
        {
          "name":  "<:hostinfo:793529505263517747> Host Information",
          "value": "** **"
        },
        {
          "name": "<:hostinfo:793529505263517747> Host Uptime",
          "value": Uptime(os.uptime() * 1000)
        },
        {
          "name": "<:cpu:793672442056802354> CPU Type",
          "value": process.arch + ", " + cpu.model()
        },

        {
          "name": "<:hostos:793866961675223090> OS Type",
          "value": process.platform + " / " + os.version()
        },
        {
          "name": "<:node:793537507018145813> Node.JS Version",
          "value": process.version
        },
        {
          "name": "<:hostinfo:793529505263517747> Bot Ping",
          "value": Math.round(client.ws.ping) + " ms",
          "inline": true
        },
        {
          "name":  "<:usersuccess:793885338250641469> **Special Thanks To**",
          "value": "@OfficialTCGMatt for providing help with development\n @chuu_shi Allowing me to host Anitrox on his server"
        }

      ]
    }));
  }
};
