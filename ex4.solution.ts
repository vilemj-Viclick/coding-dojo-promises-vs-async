import {
  executeTask,
} from './bootstrap';

async function run(params) {
  const task1 = executeTask(`task1.${params.runNumber}`, params.task1.time, params.task1.reason);
  const task2 = executeTask(`task2.${params.runNumber}`, params.task2.time, params.task2.reason);
  const task3 = executeTask(`task3.${params.runNumber}`, params.task3.time, params.task3.reason);
  try {
    await Promise.all([task1, task2, task3]);
  }
  catch (error) {
    await executeTask(`Error${params.runNumber}`, 100);
  }
}

run({
  runNumber: 1,
  task1: {
    time: 200,
  },
  task2: {
    time: 100,
    reason: 'Some reason',
  },
  task3: {
    time: 500,
  },
});

// run({
//   runNumber: 2,
//   task1: {
//     time: 200,
//   },
//   task2: {
//     time: 500,
//     reason: 'Some reason',
//   },
//   task3: {
//     time: 300,
//     reason: 'Fail!!!',
//   },
// });
