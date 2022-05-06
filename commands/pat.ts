import { Constants, Client, Message, CommandInteraction, User, MessageOptions, ApplicationCommandOptionData } from 'discord.js';
import { Command } from 'types/Command';

const gifchoices = [
  'https://cdn.discordapp.com/attachments/803658122299572255/803708174293008474/tenor.gif',
  'https://community.gamepress.gg/uploads/default/original/3X/0/a/0a762099c5ad6de9ca5f13dd22a7e45884a99eb3.gif',
  'https://media1.giphy.com/media/ARSp9T7wwxNcs/giphy.gif'
];

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Pats a user!';
  options: ApplicationCommandOptionData[] = [{
    name: 'user',
    description: 'The user to pat',
    required: true,
    type: Constants.ApplicationCommandOptionTypes.USER
  }];

  async handleMessage (client: Client, message: Message) {
    await message.channel.send(this.handle(client, message.author, message.mentions.users.first() ?? null));
  }

  async handleInteraction (client: Client, interaction: CommandInteraction) {
    await interaction.reply(this.handle(client, interaction.user, interaction.options.getUser('user')));
  }

  handle (client: Client, user: User, target: User | null): MessageOptions {
    if (!target) return client.generateErrorMessage('You need to @mention a user!', user.displayAvatarURL());
    const gif = gifchoices[Math.floor(Math.random() * gifchoices.length)];
    return {
      embeds: [{
        title: '<:pats:801238281286713355> Pat',
        description: `${target} You have been patted by ${user}!`,
        color: 8311585,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: client.config.footerTxt
        },
        image: {
          url: gif
        }
      }]
    };
  }
}();
