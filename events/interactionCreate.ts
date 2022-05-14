import { Client, CommandInteraction } from 'discord.js';
import { ClientEvent } from 'types/ClientEvent';

module.exports = new class implements ClientEvent {
  event = require('path').parse(__filename).name;

  listener = (client: Client) =>
    async (interaction: CommandInteraction) => {
      if (interaction.isApplicationCommand()) {
        await client.commands.get(interaction.commandName)?.handleInteraction(client, interaction as CommandInteraction);
      }
    }
    ;
}();
