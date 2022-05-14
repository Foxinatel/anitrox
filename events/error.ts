import { ClientEvent } from 'types/ClientEvent';

module.exports = new class implements ClientEvent<'error'> {
  event: 'error' = 'error';
  listener = () => async (e: Error) => { console.log(`[ERROR] ${e}`); };
}();
