import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

module.exports = {

  name: require('path').parse(__filename).name,
  description: "IT'S TIME TO STOP!... the bot",
  options: [],

  async handleMessage (instance: ClientWrapper, message: Discord.Message, args: string[]) {
    await message.channel.send(this.handle(instance, message.author, args.slice(0).join(' ')));
    process.exit();
  },

  async handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    await interaction.reply(this.handle(instance, interaction.user, interaction.options.getString('question')));
    process.exit();
  },

  handle (instance: ClientWrapper, user: Discord.User) {
    if (user.id === instance.config.ownerID) {
      console.log('The bot is shutting down! Bye bye!');
      return {
        embeds: [{
          title: '<a:AnitroxWorking:697147309531594843> **Shutting Down...**',
          description: 'See you next time!',
          color: 9442302,
          footer: {
            icon_url: user.displayAvatarURL(),
            text: instance.config.footerTxt
          }
        }]
      };
    } else {
      return {
        embeds: [{
          title: '<:AnitroxDenied:809651936642203668> 403 Forbidden',
          description: 'You need to be the bot owner to execute this command!',
          color: 13632027,
          footer: {
            icon_url: user.displayAvatarURL(),
            text: instance.config.footerTxt
          }
        }]
      };
    }
  }
};
