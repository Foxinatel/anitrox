import { Constants, Client, Message, CommandInteraction, User, MessageOptions, ApplicationCommandOptionData } from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Give some lines of input, and get one back at random';
  options: ApplicationCommandOptionData[] = [...Array(10).keys()].map(i => ({
    name: `option${i + 1}`,
    description: 'Another option',
    required: i === 0,
    type: Constants.ApplicationCommandOptionTypes.STRING
  }));

  async handleMessage (client: Client, message: Message) {
    let [head, ...options] = message.content.split(/\s*\n\s*/);
    head = head.slice(this.name.length + client.config.prefix.length);
    if (head) options.push(head);
    await message.channel.send(this.handle(client, message.author, options));
  }

  async handleInteraction (client: Client, interaction: CommandInteraction) {
    console.log([...Array(10).keys()].map(i => interaction.options.getString(`option${i + 1}`)).filter(str => str));
    await interaction.reply(this.handle(client, interaction.user, [...Array(10).keys()].map(i => interaction.options.getString(`option${i + 1}`) ?? '').filter(str => str)));
  }

  handle (client: Client, user: User, options: string[]): MessageOptions {
    if (!options.length) return client.generateErrorMessage('You need to provide some input!', user.displayAvatarURL());

    const answer = options[Math.floor(Math.random() * options.length)];
    return {
      embeds: [{
        title: 'I have made my decision:',
        description: answer,
        color: 8311585,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: client.config.footerTxt
        }
      }]
    };
  }
}();
