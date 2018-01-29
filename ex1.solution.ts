import {
  executeTask,
} from './bootstrap';

/*
 * This is an example solution of the ex1.ts assignment.
 * Use this as an inspiration to solve other exercises as well.
 * You can see the parallels in the code on this example.
 */

async function run() {
  await executeTask('my first task', 20);
  await executeTask('my second task', 20);
}

run();
