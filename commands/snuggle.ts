import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

const gifchoices = [
  'https://media.discordapp.net/attachments/803658122299572255/806775382995894282/anime-couple-snuggle-gif-5.gif?width=450&height=238',
  'https://media.discordapp.net/attachments/803658122299572255/806775411928989726/snuggl1.gif',
  'https://cdn.discordapp.com/attachments/803658122299572255/806775422833786911/ImpureDeepAmbushbug-small.gif'
];

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Snuggle a user!',
  options: [{
    name: 'user',
    description: 'The user to snuggle',
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.USER
  }],

  handleMessage (instance: ClientWrapper, message: Discord.Message) {
    return message.channel.send(this.handle(instance, message.author, message.mentions.users.first()));
  },

  handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    return interaction.reply(this.handle(instance, interaction.user, interaction.options.getUser('user')));
  },

  handle (instance: ClientWrapper, user: Discord.User, target: Discord.User) {
    if (!target) return instance.generateErrorMessage('You need to @mention a user!', user.displayAvatarURL());

    const gif = gifchoices[Math.floor(Math.random() * gifchoices.length)];
    return {
      embeds: [{
        title: '<:BlobSnuggleCat:806759753450782731> Snuggle',
        description: `${target} You have been snuggled by ${user}!`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: instance.config.footerTxt
        },
        image: {
          url: gif
        }
      }]
    };
  }
};
