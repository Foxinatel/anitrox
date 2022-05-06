import { ApplicationCommandOptionData, Client, CommandInteraction, Constants, Message, MessageOptions, User } from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Reloads a command';
  options: ApplicationCommandOptionData[] = [...Array(10).keys()].map(i => ({
    name: `option${i + 1}`,
    description: 'Another option',
    required: i === 0,
    type: Constants.ApplicationCommandOptionTypes.STRING
  }));

  async handleMessage (client: Client, message: Message, args: string[]) {
    await message.channel.send(this.handle(client, message.author, args));
  }

  async handleInteraction (client: Client, interaction: CommandInteraction) {
    await interaction.reply(this.handle(client, interaction.user, [...Array(10).keys()].map(i => interaction.options.getString(`option${i + 1}`) ?? '').filter(str => str)));
  }

  handle (client: Client, user: User, args: string[]): MessageOptions | string {
    if (user.id === client.config.ownerID) {
      if (!args.length) return client.generateErrorMessage('You forgot to provide anything to reload, you pillock', user.displayAvatarURL());
      let returnMessage = '';

      args.forEach(async (arg) => {
        const commandName = arg?.toLowerCase();
        const command = client.commands.get(commandName);

        if (!command) {
          returnMessage += `There is no command with name or alias \`${commandName}\`\n`;
        } else {
          delete require.cache[require.resolve(`./${command.name}.ts`)];

          try {
            const newCommand = require(`./${command.name}.ts`);
            client.commands.set(newCommand.name, newCommand);
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
            text: client.config.footerTxt
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
}();
