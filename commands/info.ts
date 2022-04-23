import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

function Uptime (uptime: number) {
  const totalSeconds = (uptime / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const daystring = days + (days === 1 ? ' day' : ' days');
  const hourstring = hours + (hours === 1 ? ' hour' : ' hours');
  const minutetring = minutes + (minutes === 1 ? ' minute' : ' minutes');
  const secondstring = seconds + (seconds === 1 ? ' second' : ' seconds');

  return `${daystring}**, **${hourstring}**, **${minutetring}**, **${secondstring}`;
}

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Shows bot and host information',
  options: [],

  handleMessage (instance: ClientWrapper, message: Discord.Message) {
    return message.channel.send(this.handle(instance, message.author));
  },

  handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    return interaction.reply(this.handle(instance, interaction.user));
  },

  handle (instance: ClientWrapper, user: Discord.User) {
    const os = require('os');
    const osu = require('node-os-utils');
    const cpu = osu.cpu;
    const config = instance.config;
    const client = instance.client;

    return {
      embeds: [{
        title: '<:AnitroxInfo:809651936831733791> Information about Anitrox',
        description: "Everything you've ever wanted to know about your favorite bot, Anitrox!",
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: config.footerTxt
        },
        thumbnail: {
          url: client.user?.displayAvatarURL()
        },
        fields: [
          {
            name: 'Bot Information',
            value: '** **'
          },
          {
            name: 'Release Type',
            value: config.release,
            inline: true
          },
          {
            name: 'Release Version',
            value: config.build,
            inline: true
          },
          {
            name: 'Uptime',
            value: Uptime(client.uptime ?? 0),
            inline: true
          },
          {
            name: '<:memory:793536677737136178> Bot Memory Usage',
            value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MiB`,
            inline: true
          },
          {
            name: 'Bot Name',
            value: client.user?.tag,
            inline: true
          },
          {
            name: 'Bot ID',
            value: `\`${client.user?.id}\``,
            inline: true
          },
          {
            name: '<:hostinfo:793529505263517747> Host Information',
            value: '** **'
          },
          {
            name: '<:hostinfo:793529505263517747> Host Uptime',
            value: Uptime(os.uptime() * 1000)
          },
          {
            name: '<:cpu:793672442056802354> CPU Type',
            value: `${process.arch}, ${cpu.model()}`
          },

          {
            name: '<:hostos:793866961675223090> OS Type',
            value: `${process.platform} / ${os.version()}`
          },
          {
            name: '<:node:793537507018145813> Node.JS Version',
            value: process.version
          },
          {
            name: '<:hostinfo:793529505263517747> Bot Ping',
            value: `${Math.round(client.ws.ping)} ms`,
            inline: true
          },
          {
            name: '**Special Thanks To**',
            value: '@OfficialTCGMatt for providing help with development\n @chuu_shi Allowing me to host Anitrox on his server'
          }
        ]
      }]
    };
  }
};
