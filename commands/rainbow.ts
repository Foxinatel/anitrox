import { ApplicationCommandManager, ApplicationCommandOptionData, Client, CommandInteraction, Constants, Message, MessageOptions, User } from 'discord.js';
import { Command } from 'types/Command';

const ansiCodes = ['31', '33', '32', '34'];

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Convert some text to rainbow colours!';
  options: ApplicationCommandOptionData[] = [{
    name: 'text',
    description: 'Text to convert to rainbow',
    required: true,
    type: Constants.ApplicationCommandOptionTypes.STRING
  }];

  async handleMessage (client: Client, message: Message, args: string[]) {
    await message.channel.send(this.handle(args.slice(0).join(' ')));
  }

  async handleInteraction (client: Client, interaction: CommandInteraction) {
    await interaction.reply(this.handle(interaction.options.getString('text')));
  }

  handle (text: string | null): string {
    if (!text) return '';
    let formattedString = '';
    let inc = -1;
    for (const char of text) {
      formattedString += `\u001b[0;${ansiCodes[++inc % ansiCodes.length]}m` + char;
    }
    return '```ansi\n' + formattedString + '```';
  }
}();
