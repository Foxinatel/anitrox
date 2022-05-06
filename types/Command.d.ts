import { Client, CommandInteraction, Message } from 'discord.js';
import './Client';

export interface Command {
  name: string,
  description: string,
  options: ApplicationCommandOptionData[]
  handleMessage: (client: Client, message: Message, args: string[]) => Promise<void> | Promise<Message>
  handleInteraction: (client: Client, message: CommandInteraction) => Promise<void>
}
