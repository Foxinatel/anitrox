import * as Discord from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Bonks a user!';
  options = [{
    name: 'user',
    description: 'The user to bonk',
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.USER
  }];

  async handleMessage (client: Discord.Client, message: Discord.Message) {
    await message.channel.send(this.handle(client, message.author, message.mentions.users.first() ?? null));
  }

  async handleInteraction (client: Discord.Client, interaction: Discord.CommandInteraction) {
    await interaction.reply(this.handle(client, interaction.user, interaction.options.getUser('user')));
  }

  handle (client: Discord.Client, user: Discord.User, target: Discord.User | null): Discord.MessageOptions {
    if (!target) return client.generateErrorMessage('You need to @mention a user!', user.displayAvatarURL());

    return {
      embeds: [{
        title: '<a:SylvBonk:801185845847130113> Bonk',
        description: `${target} You have been bonked by ${user}!`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: client.config.footerTxt
        },
        image: {
          url: 'https://cdn.discordapp.com/attachments/793537380330111028/801194481549312060/HappyBONK.gif'
        }
      }]
    };
  }
}();
