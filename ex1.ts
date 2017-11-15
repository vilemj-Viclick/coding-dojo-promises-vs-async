import {
  executeTask,
} from './dojo-bootstrap';

async function subFunction() {
  await executeTask('subFunctionTask1', 50);
  await executeTask('subFunctionTask2', 50);
}

async function run() {
  await executeTask('lll', 100);
  subFunction();
  await executeTask('task3', 30);
  return 'run';
}

run();
