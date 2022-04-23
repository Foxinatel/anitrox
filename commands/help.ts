import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Get help on anything from commands, to what the bot does! just not your homework..',
  options: [],

  handleMessage (instance: ClientWrapper, message: Discord.Message) {
    return message.channel.send(this.handle(instance, message.author));
  },

  handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    return interaction.reply(this.handle(instance, interaction.user));
  },

  handle (instance: ClientWrapper, user: Discord.User) {
    return {
      embeds: [{
        title: 'HELP! SEYMOUR! THE BOT IS ON FIRE!',
        description: 'Get help on anything from commands, to what the bot does! just not your homework..',
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: `${instance.config.footerTxt} | No mother it's just the northern lights`
        },
        fields: [
          {
            name: 'Command List',
            value: '[Click here!](https://github.com/IDeletedSystem64/anitrox/blob/dev/commands.md)'
          },
          {
            name: '...Or is the bot actually on fire?',
            value: 'Join the [support server!](https://discord.gg/grebRGsBZ3)'
          }
        ]
      }]
    };
  }
};
