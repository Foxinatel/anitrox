import * as Discord from 'discord.js';
import { ClientWrapper } from '../types/ClientWrapper';

const { inspect } = require('util');

module.exports = {

  name: require('path').parse(__filename).name,
  description: 'handles JS code',
  options: [{
    name: 'code',
    description: 'The string to evaluate',
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING
  }],

  handleMessage (instance: ClientWrapper, message: Discord.Message, args: string[]) {
    return message.channel.send(this.handle(instance, message.author, args.join(' ')));
  },

  handleInteraction (instance: ClientWrapper, interaction: Discord.CommandInteraction) {
    return interaction.reply(this.handle(instance, interaction.user, interaction.options.getString('code')));
  },

  handle (instance: ClientWrapper, user: Discord.User, code: string) {
    if (user.id === instance.config.ownerID) {
      try {
        const evaled = inspect(eval(code));
        // return message.channel.send(evaled, { code: 'xl' });

        return `\`\`\`js\n${evaled}\n\`\`\``;
      } catch (error: unknown) {
        if (error instanceof Error) {
          return {
            embeds: [{
              title: '<:AnitroxError:809651936563429416> **Something went wrong! **',
              color: 13632027,
              footer: {
                icon_url: user.displayAvatarURL(),
                text: instance.config.footerTxt
              },
              fields: [
                {
                  name: '**What Happened?**',
                  value: 'The command you tried to run failed to handle due to an error'
                },
                {
                  name: 'Error Info',
                  value: error.message
                }
              ]
            }]
          };
        } else {
          console.log("Caught a value that isn't an instance of an error:\n" + error);
        }
      }
    }
  }
};
