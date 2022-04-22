const { Constants } = require('discord.js');

const gifchoices = [
  'https://media.discordapp.net/attachments/803658122299572255/806775382995894282/anime-couple-snuggle-gif-5.gif?width=450&height=238',
  'https://media.discordapp.net/attachments/803658122299572255/806775411928989726/snuggl1.gif',
  'https://cdn.discordapp.com/attachments/803658122299572255/806775422833786911/ImpureDeepAmbushbug-small.gif'
];

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Snuggle an user!',
  options: [{
    name: 'user',
    description: 'The user to snuggle',
    required: true,
    type: Constants.ApplicationCommandOptionTypes.USER
  }],

  async execute (client, message, _, config) {
    const taggedUser = message.mentions.users.first();
    const avatarURL = message.author.displayAvatarURL();

    if (!taggedUser) {
      await message.channel.send(client.generateErrorMessage('You need to @mention a user!', avatarURL));
    } else {
      const gif = gifchoices[Math.floor(Math.random() * gifchoices.length)];
      await message.channel.send({
        embeds: [{
          title: '<:BlobSnuggleCat:806759753450782731> Snuggle',
          description: `${taggedUser} You have been snuggled by ${message.author}!`,
          color: 9442302,
          footer: {
            icon_url: avatarURL,
            text: config.footerTxt
          },
          image: {
            url: gif
          }
        }]
      });
    }
  }
};
