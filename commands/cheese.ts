import { Constants, Client, Message, CommandInteraction, User, MessageOptions, ApplicationCommandOptionData } from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Cheese a user, or run with no arguments for a surprise :eyes:';
  options: ApplicationCommandOptionData[] = [{
    name: 'user',
    description: 'The user to cheese',
    required: false,
    type: Constants.ApplicationCommandOptionTypes.USER
  }];

  async handleMessage (client: Client, message: Message) {
    await message.channel.send(this.handle(client, message.author, message.mentions.users.first() ?? null));
  }

  async handleInteraction (client: Client, interaction: CommandInteraction) {
    await interaction.reply(this.handle(client, interaction.user, interaction.options.getUser('user')));
  }

  handle (client: Client, user: User, target: User | null): MessageOptions | string {
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
