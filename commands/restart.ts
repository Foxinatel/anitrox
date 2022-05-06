import { Client, Message, CommandInteraction, User, ApplicationCommandOptionData } from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Restarts the bot';
  options: ApplicationCommandOptionData[] = [];

  async handleMessage (client: Client, message: Message) {
    const response = await this.handle(client, message.author);
    if (response) await message.channel.send(response);
  }

  async handleInteraction (client: Client, interaction: CommandInteraction) {
    const response = await this.handle(client, interaction.user);
    if (response) await interaction.reply(response);
  }

  async handle (client: Client, user: User): Promise<string | null> {
    if (user.id === client.config.ownerID) {
      console.log('Anitrox is restarting now!');
      // await message.channel.send('<a:NyabotWorking:697147309531594843> Restarting...');
      try {
        client.destroy();
        await client.login(client.config.token);
        console.log('All systems go');
        return '<:NyabotSuccess:697211376740859914> Restart Successful';
      } catch (e) {
        console.error(e);
        return null;
      }
    } else {
      return '<:NyabotDenied:697145462565896194> Access Denied, You must be bot owner to execute this command.';
    }
  }
}();
