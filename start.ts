import * as Discord from 'discord.js';
import { ClientWrapper } from './types/ClientWrapper';
import { Command } from './types/Command';

import fs from 'fs';
import config from './config.json';

console.log('Starting!');
const client = new Discord.Client({ intents: config.intents.map((intent: string) => eval(`Discord.Intents.FLAGS.${intent}`)) });

const instance: ClientWrapper = {
  client,
  commands: new Discord.Collection(
    fs.readdirSync('./commands')
      .filter((file: string) => file.endsWith('.ts'))
      .map((file: string) => {
        const command: Command = require(`./commands/${file}`);
        return [command.name, command];
      })
  ),
  config: require('./config.json'),
  generateErrorMessage: (errorMsg: string, avatarURL: string) => new Discord.MessageEmbed({
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
  })
};

client.on('error', (e: Error) => console.log(`[ERROR] ${e}`));
client.on('warn', (e: string) => console.log(`[WARN] ${e}`));

client.once('ready', async () => {
  const sandboxSettings = config.sandbox;
  const localCommands: Discord.GuildApplicationCommandManager | undefined = client.guilds.cache.get(sandboxSettings.id)?.commands;
  const globalCommands: Discord.ApplicationCommandManager | undefined = client.application?.commands;
  let existingLocal: Discord.Collection<Discord.Snowflake, Discord.ApplicationCommand> | undefined =
    await localCommands?.fetch();
  let existingGlobal: Discord.Collection<Discord.Snowflake, Discord.ApplicationCommand> | undefined =
    await globalCommands?.fetch();

  if (sandboxSettings.enabled) {
    if (sandboxSettings.refreshLocal) {
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

  instance.commands.forEach(async command => {
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

  if (!instance.commands.has(command)) return;

  try {
    await instance.commands.get(command)?.handleMessage(instance, message, args);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
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
      console.log("Caught a value that isn't an instance of an error:\n" + error);
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isApplicationCommand()) { await instance.commands.get(interaction.commandName)?.handleInteraction(instance, interaction as Discord.CommandInteraction); }
});

client.login(config.token);
