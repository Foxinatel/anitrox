const { Constants } = require('discord.js');

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Ask Anitrox a question, any question! and they will answer it!',
  options: [{
    name: 'question',
    description: 'The question to ask Anitrox',
    required: true,
    type: Constants.ApplicationCommandOptionTypes.STRING
  }],

  async parseMessage (client, config, message, args) {
    await message.channel.send(this.handle(client, config, message.author, args.slice(0).join(' ')));
  },

  async parseInteraction (client, config, interaction) {
    await interaction.reply(this.handle(client, config, interaction.user, interaction.options.getString('question')));
  },

  handle (client, config, user, question) {
    if (!question) return client.generateErrorMessage('You need to ask a question!', user.displayAvatarURL());

    return {
      embeds: [{
        title: ':8ball: 8Ball',
        description: `Your amazing question: **${question}**`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: config.footerTxt
        },
        fields: [
          {
            name: 'Answer',
            value: `${config.answers.get_random()}`
          }
        ]
      }]
    };
  }
};
