import { Client, Collection, MessageEmbed } from 'discord.js';
import conf from '../config.json';

export interface ClientWrapper {
  client: Client,
  commands: Collection<string, Command>,
  config: (typeof conf),
  generateErrorMessage: (errorMsg: string, avatarURL: string) => MessageEmbed
}
