import conf from '../config.json';
import { Command } from './Command';
import { Collection, MessageOptions } from 'discord.js';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>,
    config: (typeof conf),
    generateErrorMessage: (errorMsg: string, avatarURL: string) => MessageOptions
  }
}
