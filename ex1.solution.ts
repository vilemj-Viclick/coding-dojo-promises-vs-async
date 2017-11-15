import {
  executeTask,
} from './dojo-bootstrap';

async function main() {
  const task1 = executeTask('task1', 20);
  const task2 = executeTask('task2', 30);

  await task1;
  await task2;
}

async function run() {
  main();
}

run();
