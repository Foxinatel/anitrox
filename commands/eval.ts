import * as Discord from 'discord.js';
import { Command } from 'types/Command';

const { inspect } = require('util');

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'handles JS code';
  options = [{
    name: 'code',
    description: 'The string to evaluate',
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING
  }];

  async handleMessage (client: Discord.Client, message: Discord.Message, args: string[]) {
    const response = this.handle(client, message.author, args.join(' '));
    if (response) await message.channel.send(response);
  }

  async handleInteraction (client: Discord.Client, interaction: Discord.CommandInteraction) {
    const response = this.handle(client, interaction.user, interaction.options.getString('code'));
    if (response) await interaction.reply(response);
  }

  handle (client: Discord.Client, user: Discord.User, code: string | null): Discord.MessageOptions | string | null {
    if (user.id === client.config.ownerID) {
      try {
        const evaled = inspect(eval(code ?? ''));
        // return message.channel.send(evaled, { code: 'xl' });
        return `\`\`\`js\n${evaled}\n\`\`\``;
      } catch (error: unknown) {
        if (error instanceof Error) {
          return {
            embeds: [{
              title: '<:AnitroxError:809651936563429416> **Something went wrong! **',
              color: 13632027,
              footer: {
                icon_url: user.displayAvatarURL(),
                text: client.config.footerTxt
              },
              fields: [
                {
                  name: '**What Happened?**',
                  value: 'The command you tried to run failed to handle due to an error'
                },
                {
                  name: 'Error Info',
                  value: error.message
                }
              ]
            }]
          };
        } else {
          console.log("Caught a value that isn't an client of an error:\n" + error);
          return null;
        }
      }
    } else {
      return '<:NyabotDenied:697145462565896194> Access Denied, You must be bot owner to execute this command.';
    }
  }
}();
