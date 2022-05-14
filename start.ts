import * as Discord from 'discord.js';
import fs from 'fs';
import { Command } from './types/Command';
import { ClientEvent } from 'types/ClientEvent';
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

fs.readdirSync('./events')
  .filter(file => file.endsWith('.ts'))
  .forEach(file => {
    const event: ClientEvent = require(`./events/${file}`);
    client[event.once ? 'once' : 'on'](event.event, event.listener(client));
  });

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

client.login(config.token);
