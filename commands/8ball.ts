import { ApplicationCommandOptionData, Client, CommandInteraction, Constants, Message, MessageOptions, User } from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Ask Anitrox a question, any question! and they will answer it!';
  options: ApplicationCommandOptionData[] = [{
    name: 'question',
    description: 'The question to ask Anitrox',
    required: true,
    type: Constants.ApplicationCommandOptionTypes.STRING
  }];

  async handleMessage (client: Client, message: Message, args: string[]) {
    await message.channel.send(this.handle(client, message.author, args.slice(0).join(' ')));
  }

  async handleInteraction (client: Client, interaction: CommandInteraction) {
    await interaction.reply(this.handle(client, interaction.user, interaction.options.getString('question')));
  }

  handle (client: Client, user: User, question: string | null): MessageOptions {
    const config = client.config;
    const index = Math.floor(Math.random() * config.answers.length);
    const answer = config.answers[index];
    const avatarURL = user.displayAvatarURL();

    if (!question) return client.generateErrorMessage('You need to ask a question!', avatarURL);

    return {
      embeds: [{
        title: ':8ball: 8Ball',
        description: `Your amazing question: **${question}**`,
        color: 9442302,
        footer: {
          icon_url: avatarURL,
          text: config.footerTxt
        },
        fields: [
          {
            name: 'Answer',
            value: `${answer}`
          }
        ]
      }]
    };
  }
}();
