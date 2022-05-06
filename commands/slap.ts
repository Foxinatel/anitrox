import { Constants, Client, Message, CommandInteraction, User, MessageOptions, ApplicationCommandOptionData } from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Slaps a user!';
  options: ApplicationCommandOptionData[] = [{
    name: 'user',
    description: 'The user to slap',
    required: true,
    type: Constants.ApplicationCommandOptionTypes.USER
  }];

  handleMessage (client: Client, message: Message) {
    return message.channel.send(this.handle(client, message.author, message.mentions.users.first() ?? null));
  }

  handleInteraction (client: Client, interaction: CommandInteraction) {
    return interaction.reply(this.handle(client, interaction.user, interaction.options.getUser('user')));
  }

  handle (client: Client, user: User, target: User | null): MessageOptions {
    if (!target) return client.generateErrorMessage('You need to @mention a user!', user.displayAvatarURL());
    return {
      embeds: [{
        title: ':anger: Slap',
        description: `${target} You have been slapped by ${user}!`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: client.config.footerTxt
        },
        image: {
          url: 'https://media1.tenor.com/images/b6d8a83eb652a30b95e87cf96a21e007/tenor.gif?itemid=10426943'
        }
      }]
    };
  }
}();
