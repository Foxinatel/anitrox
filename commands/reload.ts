import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Reloads a command',
  options: [...Array(10).keys()].map(i => ({
    name: `option${i + 1}`,
    description: 'Another option',
    required: i === 0,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING
  })),

  handleMessage (instance: ClientWrapper, message: Discord.Message, args: string[]) {
    return message.channel.send(this.handle(instance, message.author, args));
  },

  handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    return interaction.reply(this.handle(instance, interaction.user, [...Array(10).keys()].map(i => interaction.options.getString(`option${i + 1}`)).filter(str => str)));
  },

  handle (instance: ClientWrapper, user: Discord.User, args: string[]) {
    if (user.id === instance.config.ownerID) {
      if (!args.length) return instance.generateErrorMessage('You forgot to provide anything to reload, you pillock', user.displayAvatarURL());
      let returnMessage = '';

      args.forEach(async (arg) => {
        const commandName = arg?.toLowerCase();
        const command = instance.commands.get(commandName) ||
          instance.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
          returnMessage += `There is no command with name or alias \`${commandName}\`\n`;
        } else {
          delete require.cache[require.resolve(`./${command.name}.ts`)];

          try {
            const newCommand = require(`./${command.name}.ts`);
            instance.commands.set(newCommand.name, newCommand);
            returnMessage += `Successfully reloaded \`${commandName}\`\n`;
            console.log(`User reloaded ${command.name}.`);
          } catch (error) {
            console.error(error);
            returnMessage += `There was an error while reloading \`${command.name}\`\n`;
          }
        }
      });

      return returnMessage;
    } else {
      return {
        embeds: [{
          title: '<:AnitroxDenied:809651936642203668> **403 Forbidden**',
          color: 13632027,
          footer: {
            icon_url: user.displayAvatarURL(),
            text: instance.config.footerTxt
          },
          fields: [
            {
              name: '**What Happened?**',
              value: "You don't have the appropriate permissions to run this command!"
            }
          ]
        }]
      };
    }
  }
};
