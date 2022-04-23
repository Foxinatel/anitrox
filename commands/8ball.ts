import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Ask Anitrox a question, any question! and they will answer it!',
  options: [{
    name: 'question',
    description: 'The question to ask Anitrox',
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING
  }],

  handleMessage (instance: ClientWrapper, message: Discord.Message, args: string[]) {
    return message.channel.send(this.handle(instance, message.author, args.slice(0).join(' ')));
  },

  handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    return interaction.reply(this.handle(instance, interaction.user, interaction.options.getString('question')));
  },

  handle (instance: ClientWrapper, user: Discord.User, question: string) {
    const config = instance.config;
    const index = Math.floor(Math.random() * config.answers.length);
    const answer = config.answers[index];
    const avatarURL = user.displayAvatarURL();

    if (!question) return instance.generateErrorMessage('You need to ask a question!', avatarURL);

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
};
