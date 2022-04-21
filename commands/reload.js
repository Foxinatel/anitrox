module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Reloads a command',

  async execute (client, message, args, config) {
    const avatarURL = message.author.displayAvatarURL();
    if (message.author.id === config.ownerID) {
      if (!args.length) {
        await message.channel.send(client.generateErrorMessage('You forgot to provide anything to reload, you pillock', avatarURL));
      }
      args.forEach(async (arg) => {
        const commandName = arg.toLowerCase();
        const command = message.client.commands.get(commandName) ||
          message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
          await message.channel.send(client.generateErrorMessage(`There is no command with name or alias \`${commandName}\`, ${message.author}!`, avatarURL));
        } else {
          delete require.cache[require.resolve(`./${command.name}.js`)];

          try {
            const newCommand = require(`./${command.name}.js`);
            client.commands.set(newCommand.name, newCommand);
            await message.channel.send(`<:AnitroxSuccess:809651936819019796>  **Reloaded \`${command.name}\` successfully!**`);
            console.log(`User reloaded ${command.name}.`);
          } catch (error) {
            console.error(error);
            await message.channel.send(client.generateErrorMessage(`There was an error while reloading \`${command.name}\`:\n\`${error.message}\``, avatarURL));
          }
        }
      });
    } else {
      message.channel.send({
        embeds: [{
          title: '<:AnitroxDenied:809651936642203668> **403 Forbidden**',
          color: 13632027,
          footer: {
            icon_url: avatarURL,
            text: config.footerTxt
          },
          fields: [
            {
              name: '**What Happened?**',
              value: "You don't have the appropriate permissions to run this command!"
            }
          ]
        }]
      });
    }
  }
};
