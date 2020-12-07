const percentage = (a: number, b: number) => ((a / b) * 100).toFixed(2) + '%';
const summaryLine = (
  count: number,
  total: number,
  desc: string,
  rateDesc: string
) =>
  `${count} out of ${total} ${desc} [${percentage(
    count,
    total
  )} ${rateDesc} RATE]`;

const defaultReporter = (stats: any, log: any) => {
  // individual results
  log('File Results:');
  stats.results.forEach((result: any) => {
    log(`${result.valid ? '✔' : '✘'} ${result.file}`);
    if (result.error) {
      log(`  [ERROR]: ${result.error}`);
    } else if (!result.valid && Array.isArray(result.diff)) {
      let removed = 0;
      let added = 0;
      let same = 0;
      let charRemoved = 0;
      let charAdded = 0;
      let charSame = 0;
      result.diff.forEach((d: [number, string]) => {
        const [diffType, value] = d;
        if (diffType === -1) {
          removed++;
          charRemoved += value.length;
        } else if (diffType === 1) {
          added++;
          charAdded += value.length;
        } else if (diffType === 0) {
          same++;
          charSame += value.length;
        }
      });
      log(`  [INVALID]`);
      log(`  diffs: (same=${same}, removed=${removed}, added=${added})`);
      log(
        `  chars: (same=${charSame}, removed=${charRemoved}, added=${charAdded})`
      );
    }
  });

  // summary
  log('\nSummary:');
  log(summaryLine(stats.numValid, stats.numResults, 'were valid', 'PASS'));
  log(summaryLine(stats.numInvalid, stats.numResults, 'were invalid', 'FAIL'));
  log(
    summaryLine(
      stats.numError,
      stats.numResults,
      'encountered an error',
      'ERROR'
    )
  );
};

export default defaultReporter;
