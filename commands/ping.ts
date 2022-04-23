import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Gets bot ping',
  options: [],

  handleMessage (instance: ClientWrapper, message: Discord.Message, args: string[]) {
    return message.channel.send(this.handle(instance, message.author, args.slice(0).join(' ')));
  },

  handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    return interaction.reply(this.handle(instance, interaction.user, interaction.options.getString('question')));
  },

  handle (instance: ClientWrapper, user: Discord.User) {
    const config = instance.config;
    const index = Math.floor(Math.random() * config.locations.length);
    const location = config.locations[index];

    return {
      embeds: [{
        title: ':ping_pong: Ping',
        description: `**Pong!** We pinged **${location}** and got ${instance.client.ws.ping} ms.`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: config.footerTxt
        }
      }]
    };
  }
};
