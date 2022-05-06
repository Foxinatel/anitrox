import { Constants, Client, Message, CommandInteraction, User, MessageOptions, ApplicationCommandOptionData } from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = "Gets a user's avatar.";
  options: ApplicationCommandOptionData[] = [{
    name: 'user',
    description: 'Another user',
    required: false,
    type: Constants.ApplicationCommandOptionTypes.USER
  },
  {
    name: 'userid',
    description: "Another user's ID",
    required: false,
    type: Constants.ApplicationCommandOptionTypes.STRING
  }];

  async handleMessage (client: Client, message: Message, args: string[]) {
    const target = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    await message.channel.send(this.handle(client, message.author, target));
  }

  async handleInteraction (client: Client, interaction: CommandInteraction) {
    const target = interaction.options.getUser('user') || client.users.cache.get(interaction.options.getString('userid') ?? '') || interaction.user;
    await interaction.reply(this.handle(client, interaction.user, target));
  }

  handle (client: Client, user: User, target: User): MessageOptions {
    return {
      embeds: [{
        title: `:frame_photo: ${target.username}'s Beautiful Avatar!`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: client.config.footerTxt
        },
        image: {
          url: target.displayAvatarURL()
        }
      }]
    };
  }
}();
