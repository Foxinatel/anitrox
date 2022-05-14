import { ClientEvent } from 'types/ClientEvent';

module.exports = new class implements ClientEvent {
  event = require('path').parse(__filename).name;

  listener = () => async (e: string) => console.log(`[WARN] ${e}`);
}();
