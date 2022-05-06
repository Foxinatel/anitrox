import { Constants, Client, Message, GuildMember, CommandInteraction, User, MessageOptions, ApplicationCommandOptionData } from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Gets info about an user, such as ID, Discord Join date and more';
  options: ApplicationCommandOptionData[] = [{
    name: 'user',
    description: 'Another user',
    required: false,
    type: Constants.ApplicationCommandOptionTypes.USER
  }];

  handleMessage (client: Client, message: Message) {
    const target = message.mentions.members?.first() || message.member;
    return message.channel.send(this.handle(client, message.author, target as GuildMember));
  }

  async handleInteraction (client: Client, interaction: CommandInteraction) {
    const target = interaction.options.getUser('user') ? (await interaction.guild?.members.fetch(interaction.options.getUser('user') ?? '')) : interaction.member;
    return interaction.reply(this.handle(client, interaction.user, target as GuildMember));
  }

  handle (client: Client, user: User, target: GuildMember): MessageOptions {
    return {
      embeds: [{
        title: `Everything you've ever wanted to know about ${target}!`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: client.config.footerTxt
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
            value: target.presence?.status ?? (client.config.intents.includes('GUILD_PRESENCES') ? 'Offline' : 'Missing GUILD_PRESENCES intent')
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
}();
