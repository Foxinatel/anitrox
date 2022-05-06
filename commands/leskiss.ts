import { Constants, Client, Message, CommandInteraction, User, MessageOptions, ApplicationCommandOptionData } from 'discord.js';
import { Command } from 'types/Command';

const gifchoices = [
  'https://cdn.discordapp.com/attachments/793537380330111028/803833954750038066/gif5.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803833959338475550/gif12.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803834034135236628/gif9.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803834082034843658/gif18.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803834094063583302/gif8.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803834099869024296/gif10.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803834132035665950/gif16.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803834146413084713/gif13.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803834249425715210/gif22.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803834323898990592/gif11.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803834328848793650/gif14.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803834391226351676/gif17.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803834391226351676/gif17.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803834498714304522/gif15.gif',
  'https://cdn.discordapp.com/attachments/793537380330111028/803834514269798460/gif19.gif'
];

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Lesbian kiss <:lesbian:803831629428686849>';
  options: ApplicationCommandOptionData[] = [{
    name: 'user',
    description: 'The user to kiss',
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
        title: ':heart: <:lesbian:803831629428686849> Kiss',
        description: `${target} You have been kissed by ${user}!`,
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
