import { Client, Message, CommandInteraction, User, MessageOptions, ApplicationCommandOptionData } from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Gets bot ping';
  options: ApplicationCommandOptionData[] = [];

  async handleMessage (client: Client, message: Message) {
    await message.channel.send(this.handle(client, message.author));
  }

  async handleInteraction (client: Client, interaction: CommandInteraction) {
    await interaction.reply(this.handle(client, interaction.user));
  }

  handle (client: Client, user: User): MessageOptions {
    const config = client.config;
    const index = Math.floor(Math.random() * config.locations.length);
    const location = config.locations[index];

    return {
      embeds: [{
        title: ':ping_pong: Ping',
        description: `**Pong!** We pinged **${location}** and got ${client.ws.ping} ms.`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: config.footerTxt
        }
      }]
    };
  }
}();
