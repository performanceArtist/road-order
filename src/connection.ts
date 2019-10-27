import config from './config';
import postgresEmitter from './controllers/emitter';

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: config.database
});

(async function init() {
  const connection = await knex.client.acquireRawConnection();
  connection.query('LISTEN new_diagnostic');
  connection.query('LISTEN new_measurement');
  connection.query('LISTEN update_order');
  connection.on(
    'notification',
    async (data: { payload: string; channel: string }) => {
      const payload = JSON.parse(data.payload);
      postgresEmitter.emit(data.channel, payload);
    }
  );
})();

export default knex;
