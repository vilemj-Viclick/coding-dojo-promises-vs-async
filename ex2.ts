import {
  createPromise,
  executeTask,
} from './bootstrap';

/*
 * Rewrite the code into a *.solution.ts using async/await.
 * Do not use Promise.all in the solution!!!
 */

createPromise<void>('run',
  resolve => {
    Promise.all([
      executeTask('task1', 20),
      executeTask('task2', 10),
      executeTask('task3', 30),
    ]).then(() => resolve(undefined));
  });
