import { ApplicationCommandOptionChoice, ApplicationCommandOptionData, Client, CommandInteraction, Constants, Message } from 'discord.js';
import { Command } from 'types/Command';

const formatCodes = new Array<ApplicationCommandOptionChoice>(
  { name: 'Normal', value: '0' },
  { name: 'Bold', value: '1' },
  { name: 'Underlined', value: '4' }
);

const textCodes = new Array<ApplicationCommandOptionChoice>(
  { name: 'Gray', value: '30' },
  { name: 'Red', value: '31' },
  { name: 'Green', value: '32' },
  { name: 'Yellow', value: '33' },
  { name: 'Blue', value: '34' },
  { name: 'Pink', value: '35' },
  { name: 'Cyan', value: '36' },
  { name: 'White', value: '37' }
);

const backgroundCodes = new Array<ApplicationCommandOptionChoice>(
  { name: 'Firefly_dark_blue', value: '40' },
  { name: 'Orange', value: '41' },
  { name: 'Marble_blue', value: '42' },
  { name: 'Greyish_turquoise', value: '43' },
  { name: 'Gray', value: '44' },
  { name: 'Indigo', value: '45' },
  { name: 'Light_gray', value: '46' },
  { name: 'White', value: '47' }
);

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Format text using ANSI colour codes!';
  options: ApplicationCommandOptionData[] = [{
    name: 'options',
    description: 'Formatting Options',
    options: [{
      name: 'text',
      description: 'The text to apply the formatting to',
      type: Constants.ApplicationCommandOptionTypes.STRING,
      required: true
    }, {
      name: 'formatting',
      description: 'What style the text should be in',
      type: Constants.ApplicationCommandOptionTypes.STRING,
      choices: formatCodes
    }, {
      name: 'foreground',
      description: 'What colour the text should be in',
      type: Constants.ApplicationCommandOptionTypes.STRING,
      choices: textCodes
    }, {
      name: 'background',
      description: 'What colour the background should be in',
      type: Constants.ApplicationCommandOptionTypes.STRING,
      choices: backgroundCodes
    }],
    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND
  }];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handleMessage (client: Client, message: Message, args: string[]) {
    await message.channel.send('Currently this feature only works with slash commands!');
  }

  async handleInteraction (client: Client, interaction: CommandInteraction) {
    await interaction.reply(this.handle(
      interaction.options.getString('text'),
      interaction.options.getString('formatting'),
      interaction.options.getString('foreground'),
      interaction.options.getString('background')
    ));
  }

  handle (text: string | null, fmt: string | null, fg: string | null, bg: string | null): string {
    if (!text) return '';

    let formattedString = '\u001b[' + (fmt ?? '0');
    if (fg) formattedString += `;${fg}`;
    if (bg) formattedString += `;${bg}`;
    formattedString += 'm' + text;
    return '```ansi\n' + formattedString + '```';
  }
}();
