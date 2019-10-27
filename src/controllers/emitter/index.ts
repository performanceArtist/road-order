import { EventEmitter } from 'events';

import newDiagnostic from './newDiagnostic';
import newMeasurement from './newMeasurement';
import orderUpdate from './orderUpdate';
import newOrder from './newOrder';

const postgresEmitter = (function() {
  const emitter = new EventEmitter();

  emitter.on('new_diagnostic', newDiagnostic);
  emitter.on('new_measurement', newMeasurement);
  emitter.on('update_order', orderUpdate);
  emitter.on('new_order', newOrder);

  return emitter;
})();

export default postgresEmitter;
