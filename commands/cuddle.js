const gifchoices = [
  'https://i.pinimg.com/originals/4d/89/d7/4d89d7f963b41a416ec8a55230dab31b.gif',
  'https://media1.tenor.com/images/6d73b0a9cadef5310be4b6160d2f959a/tenor.gif?itemid=12099823',
  'https://media.tenor.com/images/2636cf3c8152631b4630bf71757a4afa/tenor.gif',
  'https://i.imgur.com/JiFpT5E.gif'
];

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Cuddle a user!',

  async execute (client, message, _, config) {
    const taggedUser = message.mentions.users.first();
    const index = Math.floor(Math.random() * gifchoices.length);
    const gif = (gifchoices[index]);
    const avatarURL = message.author.displayAvatarURL();

    if (!taggedUser) {
      await message.channel.send(client.generateErrorMessage('You need to @mention a user!', avatarURL));
    } else {
      await message.channel.send({
        embeds: [{
          title: ':heart: Cuddle',
          description: `${taggedUser} You have been cuddled by ${message.author}!`,
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
