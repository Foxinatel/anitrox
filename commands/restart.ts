import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Restarts the bot',
  options: [],

  async handleMessage (instance: ClientWrapper, message: Discord.Message, args: string[]) {
    return message.channel.send(await this.handle(instance, message.author, args.slice(0).join(' ')));
  },

  async handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    return interaction.reply(await this.handle(instance, interaction.user, interaction.options.getString('question')));
  },

  async handle (instance: ClientWrapper, user: Discord.User) {
    if (user.id === instance.config.ownerID) {
      console.log('Anitrox is restarting now!');
      // await message.channel.send('<a:NyabotWorking:697147309531594843> Restarting...');
      try {
        instance.client.destroy();
        await instance.client.login(instance.config.token);
        console.log('All systems go');
        return '<:NyabotSuccess:697211376740859914> Restart Successful';
      } catch (e) { console.error(e); }
    } else {
      return '<:NyabotDenied:697145462565896194> Access Denied, You must be bot owner to execute this command.';
    }
  }
};
