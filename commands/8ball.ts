import * as Discord from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Ask Anitrox a question, any question! and they will answer it!';
  options = [{
    name: 'question',
    description: 'The question to ask Anitrox',
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING
  }];

  async handleMessage (client: Discord.Client, message: Discord.Message, args: string[]) {
    await message.channel.send(this.handle(client, message.author, args.slice(0).join(' ')));
  }

  async handleInteraction (client: Discord.Client, interaction: Discord.CommandInteraction) {
    await interaction.reply(this.handle(client, interaction.user, interaction.options.getString('question')));
  }

  handle (client: Discord.Client, user: Discord.User, question: string | null): Discord.MessageOptions {
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
