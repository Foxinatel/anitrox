import { Client, ClientEvents } from 'discord.js';

export interface ClientEvent<Event extends keyof ClientEvents = unknown> {
  once?: bool;
  event: Event;
  listener: (client: Client) => (...args: ClientEvents[Event]) => Promise<void>;
}
