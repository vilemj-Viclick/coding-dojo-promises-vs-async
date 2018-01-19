import {
  createPromise,
  executeTask,
} from './bootstrap';

/*
 * Rewrite the code into a ex2.solution.ts using async/await.
 */

createPromise<void>('run',
  resolve => {
    executeTask('task1', 20)
      .then(
        () => executeTask('task2', 10),
      )
      .then(
        () => executeTask('task3', 30),
      )
      .then(
        () => resolve(undefined),
      );
  });
