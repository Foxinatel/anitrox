import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Cheese a user, or run with no arguments for a surprise :eyes:',
  options: [{
    name: 'user',
    description: 'The user to cheese',
    required: false,
    type: Discord.Constants.ApplicationCommandOptionTypes.USER
  }],

  handleMessage (instance: ClientWrapper, message: Discord.Message) {
    return message.channel.send(this.handle(instance, message.author, message.mentions.users.first()));
  },

  handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    return interaction.reply(this.handle(instance, interaction.user, interaction.options.getUser('user')));
  },

  handle (instance: ClientWrapper, user: Discord.User, target: Discord.User) {
    if (!target) return '*slams cheese on desk*\n**Cheese.** https://www.youtube.com/watch?v=Or4IE8fkpn4';

    return {
      embeds: [{
        title: ':cheese: Cheesed',
        description: `${target} You have been cheesed by ${user}!`,
        color: 16312092,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: instance.config.footerTxt
        },
        image: {
          url: 'https://cdn.discordapp.com/attachments/803658122299572255/812867714368536636/R06325af354168febcafd96b8328b7590.png'
        }
      }]
    };
  }
};
