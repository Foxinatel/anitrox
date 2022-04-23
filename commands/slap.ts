import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Slaps a user!',
  options: [{
    name: 'user',
    description: 'The user to slap',
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
    return {
      embeds: [{
        title: ':anger: Slap',
        description: `${target} You have been slapped by ${user}!`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: instance.config.footerTxt
        },
        image: {
          url: 'https://media1.tenor.com/images/b6d8a83eb652a30b95e87cf96a21e007/tenor.gif?itemid=10426943'
        }
      }]
    };
  }
};
