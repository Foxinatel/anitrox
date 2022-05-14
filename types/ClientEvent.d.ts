import { Client, ClientEvents } from 'discord.js';

export interface ClientEvent {
  once?: bool = false,
  event: keyof ClientEvents,
  listener: (client: Client) => ((...args: any) => Promise<Void>)
}
