import * as Discord from 'discord.js';
import { Command } from './types/Command';

import fs from 'fs';
import config from './config.json';

console.log('Starting!');
const client = new Discord.Client({ intents: config.intents.map((intent: string) => eval(`Discord.Intents.FLAGS.${intent}`)) });

client.config = config;

client.commands = new Discord.Collection(
  fs.readdirSync('./commands')
    .filter(file => file.endsWith('.ts'))
    .map(file => {
      const command: Command = require(`./commands/${file}`);
      return [command.name, command];
    })
);

client.generateErrorMessage = (errorMsg, avatarURL): Discord.MessageOptions => ({
  embeds: [{
    title: '<:AnitroxError:809651936563429416> Error',
    color: 13632027,
    footer: {
      icon_url: avatarURL,
      text: config.footerTxt
    },
    fields: [
      {
        name: 'Something went wrong!',
        value: errorMsg
      }
    ]
  }]
});

client.on('error', e => console.log(`[ERROR] ${e}`));
client.on('warn', e => console.log(`[WARN] ${e}`));

client.once('ready', async () => {
  const sandboxSettings = config.sandbox;
  const localCommands = client.guilds.cache.get(sandboxSettings.id)?.commands;
  const globalCommands = client.application?.commands;
  let existingLocal = await localCommands?.fetch();
  let existingGlobal = await globalCommands?.fetch();

  if (sandboxSettings.enabled) {
    if (sandboxSettings.refreshLocal && localCommands) {
      console.log('deleting previous local commands');
      existingLocal?.forEach(async (x) => {
        await localCommands?.delete(x);
      });
      existingLocal = new Discord.Collection();
    }

    if (sandboxSettings.refreshGlobal) {
      console.log('deleting previous global commands');
      existingGlobal?.forEach(async x => {
        await client.application?.commands.delete(x);
      });
      existingGlobal = new Discord.Collection();
    }
  }

  client.commands.forEach(async (command) => {
    if (sandboxSettings.enabled && !existingLocal?.map(x => x.name).includes(command.name)) {
      await localCommands?.create(command);
      // console.log(`created new local command ${command.name}`);
    }
    if (!existingGlobal?.map(x => x.name).includes(command.name)) {
      await globalCommands?.create(command);
      // console.log(`created new global command ${command.name}`);
    }
  });

  console.clear();
  console.log('    ___          _ __                 ');
  console.log('   /   |  ____  (_) /__________  _  __');
  console.log('  / /| | / __ \\/ / __/ ___/ __ \\| |/_/');
  console.log(' / ___ |/ / / / / /_/ /  / /_/ />  <  ');
  console.log('/_/  |_/_/ /_/_/\\__/_/   \\____/_/|_|  ');
  console.log(`${config.release}, ${config.build}`);
  console.log('Bot online. | Anitrox by IDeletedSystem64 | ALL MY CODE KEEPS BLOWING UP!');
  // Statuses
  setInterval(async () => {
    // Picks a status from the config file
    const index = Math.floor(Math.random() * config.statuses.length);
    await client.user?.setActivity(config.statuses[index]);
  }, 20000);
});

// Begin Command Handler
client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).split(/\s+/);
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
            text: config.footerTxt
          }
        }]
      });
    } else {
      console.error("Caught a value that isn't an instance of an error:\n" + error);
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isApplicationCommand()) {
    await client.commands.get(interaction.commandName)?.handleInteraction(client, interaction as Discord.CommandInteraction);
  }
});

client.login(config.token);
