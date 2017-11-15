import {
  executeTask,
} from './dojo-bootstrap';

async function subFunction() {
  await executeTask('subFunctionTask1', 50);
  await executeTask('subFunctionTask2', 100);
}

async function run() {
  try {
    const task = executeTask('task', 100, true);
    const subTask = subFunction();

    await Promise.all([task, subTask, executeTask('task3', 30)]);
  }
  catch (error) {
    await executeTask('Error', 10);
  }
}

run();
