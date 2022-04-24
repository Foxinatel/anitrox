import * as Discord from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Get help on anything from commands, to what the bot does! just not your homework..';
  options = [];

  async handleMessage (client: Discord.Client, message: Discord.Message) {
    await message.channel.send(this.handle(client, message.author));
  }

  async handleInteraction (client: Discord.Client, interaction: Discord.CommandInteraction) {
    await interaction.reply(this.handle(client, interaction.user));
  }

  handle (client: Discord.Client, user: Discord.User): Discord.MessageOptions {
    return {
      embeds: [{
        title: 'HELP! SEYMOUR! THE BOT IS ON FIRE!',
        description: 'Get help on anything from commands, to what the bot does! just not your homework..',
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: `${client.config.footerTxt} | No mother it's just the northern lights`
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
}();
