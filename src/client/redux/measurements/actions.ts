export const MEASUREMENTS = {
  ADD: 'MEASUREMENTS.ADD'
};

export const addMeasurement = (payload: {
  measurement: any;
  taskId: number;
}) => ({
  type: MEASUREMENTS.ADD,
  payload
});
