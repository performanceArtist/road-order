import { EventEmitter } from 'events';

import newDiagnostic from './newDiagnostic';
import newMeasurement from './newMeasurement';
import orderUpdate from './orderUpdate';

const postgresEmitter = (function() {
  const emitter = new EventEmitter();

  emitter.on('new_diagnostic', newDiagnostic);
  emitter.on('new_measurement', newMeasurement);
  emitter.on('update_order', orderUpdate);
  return emitter;
})();

export default postgresEmitter;
