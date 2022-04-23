import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Give some lines of input, and get one back at random',
  options: [...Array(10).keys()].map(i => ({
    name: `option${i + 1}`,
    description: 'Another option',
    required: i === 0,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING
  })),

  handleMessage (instance: ClientWrapper, message: Discord.Message) {
    let [head, ...options] = message.content.split(/\s*\n\s*/);
    head = head.slice(this.name.length + instance.config.prefix.length);
    if (head) options.push(head);
    return message.channel.send(this.handle(instance, message.author, options));
  },

  handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    console.log([...Array(10).keys()].map(i => interaction.options.getString(`option${i + 1}`)).filter(str => str));
    return interaction.reply(this.handle(instance, interaction.user, [...Array(10).keys()].map(i => interaction.options.getString(`option${i + 1}`)).filter(str => str)));
  },

  handle (instance: ClientWrapper, user: Discord.User, options: string[]) {
    if (!options.length) return instance.generateErrorMessage('You need to provide some input!', user.displayAvatarURL());

    const answer = options[Math.floor(Math.random() * options.length)];
    return {
      embeds: [{
        title: 'I have made my decision:',
        description: answer,
        color: 8311585,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: instance.config.footerTxt
        }
      }]
    };
  }
};
