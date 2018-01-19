import {
  executeTask,
  prettyPrint,
  waitForAll,
} from './bootstrap';


async function run() {
  try {
    await executeTask('task1', 200);
    await executeTask('task2', 100);
    await executeTask('task3', 300);
  }
  catch (error) {
    await executeTask('Error', 100);
  }
}

run();


async function run3() {
  const task1 = executeTask('task1', 200);
  const task2 = executeTask('task2', 100, 'Some reason.');
  const task3 = executeTask('task3', 300);
  await Promise.all([
    task1,
    task2,
    task3,
  ]).catch((whatHappened) => {
    console.log('The thing failed because:');
    prettyPrint(whatHappened);
    console.log('\n\n');
    return executeTask('Error', 100);
  });
}

// run3();
