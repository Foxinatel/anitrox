import * as Discord from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Attributions to open source components used by Anitrox';
  options = [];

  async handleMessage (client: Discord.Client, message: Discord.Message) {
    await message.channel.send(this.handle(client, message.author));
  }

  async handleInteraction (client: Discord.Client, interaction: Discord.CommandInteraction) {
    await interaction.reply(this.handle(client, interaction.user));
  }

  handle (client: Discord.Client, user: Discord.User): Discord.MessageOptions {
    return {
      embeds: [{
        title: 'Contributors',
        description: 'Links to check out our contributors!',
        color: 52508,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: client.config.footerTxt
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
}();