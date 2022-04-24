import * as Discord from 'discord.js';
import { Command } from 'types/Command';

const gifchoices = [
  'https://media.discordapp.net/attachments/803658122299572255/806775382995894282/anime-couple-snuggle-gif-5.gif?width=450&height=238',
  'https://media.discordapp.net/attachments/803658122299572255/806775411928989726/snuggl1.gif',
  'https://cdn.discordapp.com/attachments/803658122299572255/806775422833786911/ImpureDeepAmbushbug-small.gif'
];

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Snuggle a user!';
  options = [{
    name: 'user',
    description: 'The user to snuggle',
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.USER
  }];

  handleMessage (client: Discord.Client, message: Discord.Message) {
    return message.channel.send(this.handle(client, message.author, message.mentions.users.first() ?? null));
  }

  handleInteraction (client: Discord.Client, interaction: Discord.CommandInteraction) {
    return interaction.reply(this.handle(client, interaction.user, interaction.options.getUser('user')));
  }

  handle (client: Discord.Client, user: Discord.User, target: Discord.User | null): Discord.MessageOptions {
    if (!target) return client.generateErrorMessage('You need to @mention a user!', user.displayAvatarURL());

    const gif = gifchoices[Math.floor(Math.random() * gifchoices.length)];
    return {
      embeds: [{
        title: '<:BlobSnuggleCat:806759753450782731> Snuggle',
        description: `${target} You have been snuggled by ${user}!`,
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
