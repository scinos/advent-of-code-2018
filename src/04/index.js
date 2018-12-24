const aggregateSchedule = input => {
  const listSorted = Array.from(input).sort();
  const extractGuardId = /\[.*?\] Guard #([0-9]*) begins shift/;
  const extractMinute = /\[[0-9]+-[0-9]+-[0-9]+ [0-9]+:([0-9]+)]/;

  const schedule = {};

  let id;
  let minuteSleep;
  let minuteWakeUp;
  let lastStatus;

  listSorted.forEach(entry => {
    if (entry.includes('Guard')) {
      // If the previous guard was asleep at the end of the night
      if (lastStatus === 'asleep') {
        for (let i = minuteSleep; i <= 59; i += 1) {
          schedule[id][i] += 1;
        }
      }
      id = Number(entry.match(extractGuardId)[1]);
      if (!schedule[id]) schedule[id] = Array.from({ length: 60 }, () => 0);
    } else if (entry.includes('falls asleep')) {
      minuteSleep = Number(entry.match(extractMinute)[1]);
      lastStatus = 'asleep';
    } else if (entry.includes('wakes up')) {
      minuteWakeUp = Number(entry.match(extractMinute)[1]);
      lastStatus = 'awake';
      for (let i = minuteSleep; i < minuteWakeUp; i += 1) {
        schedule[id][i] += 1;
      }
    }
  });

  return schedule;
};

const findMax = map => {
  let maxId;
  let maxValue = 0;
  for (let i = 0; i < map.length; i += 1) {
    if (map[i] > maxValue) {
      maxId = i;
      maxValue = map[i];
    }
  }
  return maxId;
};

module.exports.challenge1 = input => {
  const schedule = aggregateSchedule(input);

  const aggregation = Object.entries(schedule).map(([id, timetable]) => ({
    // Total minutes asleep
    total: timetable.reduce((a, b) => a + b, 0),
    // Minute asleep more frequently
    max: findMax(timetable),
    // Guard id
    id: Number(id),
  }));
  // Find the guard with most slept minutes
  aggregation.sort((a, b) => b.total - a.total);

  return aggregation[0].max * aggregation[0].id;
};

module.exports.challenge2 = input => {
  const guards = aggregateSchedule(input);

  const aggregation = Object.entries(guards).map(([id, timetable]) => {
    const mostFrequentMinute = findMax(timetable);
    const timesSleptInThatMinute = timetable[mostFrequentMinute];

    return {
      mostFrequentMinute,
      timesSleptInThatMinute,
      id: Number(id),
    };
  });

  // Find the guard with most slept minutes
  aggregation.sort((a, b) => b.timesSleptInThatMinute - a.timesSleptInThatMinute);

  return aggregation[0].mostFrequentMinute * aggregation[0].id;
};
