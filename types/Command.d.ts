import { Client, CommandInteraction, Message, User } from 'discord.js';

export interface Command {
  name: string,
  description: string,
  options: Array<ApplicationCommandData>
  handleMessage: (instance: ClientWrapper, message: Message, args: string[]) => Promise<Message>
  handleInteraction: (client: Client, config: (typeof conf), message: CommandInteraction) => Promise<Message>
  handler: (client: Client, config: (typeof conf), user: User, args: unknown) => Message
}
