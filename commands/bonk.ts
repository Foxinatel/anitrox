import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Bonks a user!',
  options: [{
    name: 'user',
    description: 'The user to bonk',
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
        title: '<a:SylvBonk:801185845847130113> Bonk',
        description: `${target} You have been bonked by ${user}!`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: instance.config.footerTxt
        },
        image: {
          url: 'https://cdn.discordapp.com/attachments/793537380330111028/801194481549312060/HappyBONK.gif'
        }
      }]
    };
  }
};
