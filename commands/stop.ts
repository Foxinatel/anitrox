import { Client, Message, CommandInteraction, User, MessageOptions, ApplicationCommandOptionData } from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = "IT'S TIME TO STOP!... the bot";
  options: ApplicationCommandOptionData[] = [];

  async handleMessage (client: Client, message: Message) {
    await message.channel.send(this.handle(client, message.author));
    process.exit();
  }

  async handleInteraction (client: Client, interaction: CommandInteraction) {
    await interaction.reply(this.handle(client, interaction.user));
    process.exit();
  }

  handle (client: Client, user: User): MessageOptions {
    if (user.id === client.config.ownerID) {
      console.log('The bot is shutting down! Bye bye!');
      return {
        embeds: [{
          title: '<a:AnitroxWorking:697147309531594843> **Shutting Down...**',
          description: 'See you next time!',
          color: 9442302,
          footer: {
            icon_url: user.displayAvatarURL(),
            text: client.config.footerTxt
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
            text: client.config.footerTxt
          }
        }]
      };
    }
  }
}();
