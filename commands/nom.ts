import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

const gifchoices = [
  'https://i.imgur.com/Ns1RBzX.gif',
  'https://cdn.lowgif.com/full/2027501b8fa5225c-.gif',
  'https://i.gifer.com/36Nx.gif',
  'https://media.tenor.com/images/e8bbe712a5f36bbe9545930894b08bf9/tenor.gif'
];

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Noms a user!',
  options: [{
    name: 'user',
    description: 'The user to nom',
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.USER
  }],

  handleMessage (instance: ClientWrapper, message: Discord.Message) {
    return message.channel.send(this.handle(instance, message.author, message.mentions.users.first()));
  },

  handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    return interaction.reply(this.handle(instance, interaction.user, interaction.options.getUser('user')));
  },

  handle (instance: ClientWrapper, user: Discord.User, target: Discord.User) {
    if (!target) return instance.generateErrorMessage('You need to @mention a user!', user.displayAvatarURL());

    const gif = gifchoices[Math.floor(Math.random() * gifchoices.length)];
    return {
      embeds: [{
        title: '<:BlobNomBlob:801241117919805510> Nom',
        description: `${target} You have been nommed by ${user}!`,
        color: 8311585,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: instance.config.footerTxt
        },
        image: {
          url: gif
        }
      }]
    };
  }
};
