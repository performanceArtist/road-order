const dependencies: { [key: string]: string[] } = {
  admin: [],
  login: [],
  driver: ['recorder', 'map', 'vendors~map~taskmap'],
  operator: ['recorder', 'map', 'taskmap', 'vendors~map~taskmap']
};

export default dependencies;
