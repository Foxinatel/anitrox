import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

module.exports = {

  name: require('path').parse(__filename).name,
  description: "Gets a user's avatar.",
  options: [{
    name: 'user',
    description: 'Another user',
    required: false,
    type: Discord.Constants.ApplicationCommandOptionTypes.USER
  },
  {
    name: 'userid',
    description: "Another user's ID",
    required: false,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING
  }],

  handleMessage (instance: ClientWrapper, message: Discord.Message, args: string[]) {
    const target = message.mentions.users.first() || instance.client.users.cache.get(args[0]) || message.author;
    return message.channel.send(this.handle(instance, message.author, target));
  },

  handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    const target = interaction.options.getUser('user') || instance.client.users.cache.get(interaction.options.getString('userid') ?? '') || interaction.user;
    interaction.reply(this.handle(instance, interaction.user, target));
  },

  handle (instance: ClientWrapper, user: Discord.User, target: Discord.User) {
    return {
      embeds: [{
        title: `:frame_photo: ${target.username}'s Beautiful Avatar!`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: instance.config.footerTxt
        },
        image: {
          url: target.displayAvatarURL()
        }
      }]
    };
  }
};
