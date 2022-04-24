import * as Discord from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Cheese a user, or run with no arguments for a surprise :eyes:';
  options = [{
    name: 'user',
    description: 'The user to cheese',
    required: false,
    type: Discord.Constants.ApplicationCommandOptionTypes.USER
  }];

  async handleMessage (client: Discord.Client, message: Discord.Message) {
    await message.channel.send(this.handle(client, message.author, message.mentions.users.first() ?? null));
  }

  async handleInteraction (client: Discord.Client, interaction: Discord.CommandInteraction) {
    await interaction.reply(this.handle(client, interaction.user, interaction.options.getUser('user')));
  }

  handle (client: Discord.Client, user: Discord.User, target: Discord.User | null): Discord.MessageOptions | string {
    if (!target) return '*slams cheese on desk*\n**Cheese.** https://www.youtube.com/watch?v=Or4IE8fkpn4';

    return {
      embeds: [{
        title: ':cheese: Cheesed',
        description: `${target} You have been cheesed by ${user}!`,
        color: 16312092,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: client.config.footerTxt
        },
        image: {
          url: 'https://cdn.discordapp.com/attachments/803658122299572255/812867714368536636/R06325af354168febcafd96b8328b7590.png'
        }
      }]
    };
  }
}();
