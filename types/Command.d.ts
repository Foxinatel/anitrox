import { Client, CommandInteraction, Message } from 'discord.js';
import './Client';

export interface Command {
  readonly name: string,
  readonly description: string,
  readonly options: ApplicationCommandOptionData[]
  readonly handleMessage: (client: Client, message: Message, args: string[]) => Promise<void> | Promise<Message>
  readonly handleInteraction: (client: Client, message: CommandInteraction) => Promise<void>
}
