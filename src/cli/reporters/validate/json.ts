const jsonReporter = (stats: any, log: any) => {
  log(JSON.stringify(stats));
};

export default jsonReporter;
