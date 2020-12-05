const jsonPrettyReporter = (stats: any, log: any) => {
    log(JSON.stringify(stats, null, '  '));
};

export default jsonPrettyReporter;
