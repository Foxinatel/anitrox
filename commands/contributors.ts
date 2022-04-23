import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Attributions to open source components used by Anitrox',
  options: [],

  handleMessage (instance: ClientWrapper, message: Discord.Message) {
    return message.channel.send(this.handle(instance, message.author));
  },

  handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    return interaction.reply(this.handle(instance, interaction.user));
  },

  handle (instance: ClientWrapper, user: Discord.User) {
    return {
      embeds: [{
        title: 'Contributors',
        description: 'Links to check out our contributors!',
        color: 52508,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: instance.config.footerTxt
        },
        thumbnail: {
          url: 'https://cdn.discordapp.com/emojis/809651812323164192.webp?size=128&quality=lossless'
        },
        fields: [
          {
            name: 'chuu_shi',
            value: 'Thanks to Chuu for letting me use some of his resources to host Anitrox!\n <:GitHub:778165439477841981> [Check out his code!](https://github.com/chuushi)'
          },
          {
            name: 'OfficialTCGMatt',
            value: "Matt has helped quite a bit with Anitrox, especially in the early days of Anitrox's development! He even has his own bot!\n <:GitHub:778165439477841981> [Check out his code!](https://github.com/OfficialTCGMatt)\n :robot: [Check out TheCodingBot!](https://github.com/TMC-Software/TheCodingBot)"
          },
          {
            name: 'Foxinatel',
            value: 'Foxi has made massive improvements to Anitrox, such as improving error handling, and much more!\n<:GitHub:778165439477841981> [Check out his code!](https://github.com/foxinatel)'
          }
        ]
      }]
    };
  }
};
