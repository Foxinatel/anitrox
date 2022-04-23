import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Gets info about an user, such as ID, Discord Join date and more',
  options: [{
    name: 'user',
    description: 'Another user',
    required: false,
    type: Discord.Constants.ApplicationCommandOptionTypes.USER
  }],

  handleMessage (instance: ClientWrapper, message: Discord.Message) {
    const target = message.mentions.members?.first() || message.member;
    return message.channel.send(this.handle(instance, message.author, target));
  },

  async handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    const target = interaction.options.getUser('user') ? (await interaction.guild?.members.fetch(interaction.options.getUser('user') ?? '')) : interaction.member;
    return interaction.reply(this.handle(instance, interaction.user, target));
  },

  handle (instance: ClientWrapper, user: Discord.User, target: Discord.GuildMember) {
    return {
      embeds: [{
        title: `Everything you've ever wanted to know about ${target}!`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: instance.config.footerTxt
        },
        thumbnail: {
          url: target.displayAvatarURL()
        },
        fields: [
          {
            name: 'Username',
            value: target.user.username,
            inline: true
          },
          {
            name: 'Discriminator',
            value: target.user.discriminator,
            inline: true
          },
          {
            name: 'Full Username',
            value: target.user.tag,
            inline: true
          },
          {
            name: 'User Profile Picture',
            value: target.user.displayAvatarURL()
          },
          {
            name: 'User Status',
            value: target.presence?.status ?? (instance.config.intents.includes('GUILD_PRESENCES') ? 'Offline' : 'Missing GUILD_PRESENCES intent')
          },
          {
            name: 'User ID',
            value: `\`${target.user.id}\``
          },
          {
            name: 'User Joined Discord',
            value: target.user.createdAt.toString(),
            inline: true
          }
        ]
      }]
    };
  }
};
