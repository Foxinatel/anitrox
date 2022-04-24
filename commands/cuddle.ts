import * as Discord from 'discord.js';
import { Command } from 'types/Command';

const gifchoices = [
  'https://i.pinimg.com/originals/4d/89/d7/4d89d7f963b41a416ec8a55230dab31b.gif',
  'https://media1.tenor.com/images/6d73b0a9cadef5310be4b6160d2f959a/tenor.gif?itemid=12099823',
  'https://media.tenor.com/images/2636cf3c8152631b4630bf71757a4afa/tenor.gif',
  'https://i.imgur.com/JiFpT5E.gif'
];

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Cuddle a user!';
  options = [{
    name: 'user',
    description: 'The user to cuddle',
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

    const gif = gifchoices[Math.floor(Math.random() * gifchoices.length)];
    return {
      embeds: [{
        title: ':heart: Cuddle',
        description: `${target} You have been cuddled by ${user}!`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: client.config.footerTxt
        },
        image: {
          url: gif
        }
      }]
    };
  }
}();
