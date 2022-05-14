import { ClientEvent } from 'types/ClientEvent';

module.exports = new class implements ClientEvent<'warn'> {
  event: 'warn' = 'warn';
  listener = () => async (e: string) => console.log(`[WARN] ${e}`);
}();
