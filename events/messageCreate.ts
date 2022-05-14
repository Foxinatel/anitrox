import { Client, Message } from 'discord.js';
import { ClientEvent } from 'types/ClientEvent';

module.exports = new class implements ClientEvent<'messageCreate'> {
  event: 'messageCreate' = 'messageCreate';

  listener = (client: Client) =>
    async (message: Message) => {
      if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

      const args = message.content.slice(client.config.prefix.length).split(/\s+/);
      const command = args.shift()?.toLowerCase() ?? '';

      if (!client.commands.has(command)) return;

      try {
        await client.commands.get(command)?.handleMessage(client, message, args);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);
          message.channel.send({
            embeds: [{
              title: '<:AnitroxError:809651936563429416> **Something went wrong!**',
              description: error.stack,
              color: 13632027,
              footer: {
                icon_url: message.author.displayAvatarURL(),
                text: client.config.footerTxt
              }
            }]
          });
        } else {
          console.error("Caught a value that isn't an instance of an error:\n" + error);
        }
      }
    }
    ;
}();
