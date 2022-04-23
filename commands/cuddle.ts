import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

const gifchoices = [
  'https://i.pinimg.com/originals/4d/89/d7/4d89d7f963b41a416ec8a55230dab31b.gif',
  'https://media1.tenor.com/images/6d73b0a9cadef5310be4b6160d2f959a/tenor.gif?itemid=12099823',
  'https://media.tenor.com/images/2636cf3c8152631b4630bf71757a4afa/tenor.gif',
  'https://i.imgur.com/JiFpT5E.gif'
];

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Cuddle a user!',
  options: [{
    name: 'user',
    description: 'The user to cuddle',
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
        title: ':heart: Cuddle',
        description: `${target} You have been cuddled by ${user}!`,
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
