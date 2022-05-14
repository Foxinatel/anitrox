import { Client, CommandInteraction, Interaction } from 'discord.js';
import { ClientEvent } from 'types/ClientEvent';

module.exports = new class implements ClientEvent<'interactionCreate'> {
  event: 'interactionCreate' = 'interactionCreate';

  listener = (client: Client) =>
    async (interaction: Interaction) => {
      if (interaction.isApplicationCommand()) {
        await client.commands.get(interaction.commandName)?.handleInteraction(client, interaction as CommandInteraction);
      }
    };
}();
