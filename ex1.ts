import {
  createPromise,
  executeTask,
} from './bootstrap';


/*
 * Rewrite this code using async/await into a file called myex1.solution.ts
 * You can get inspired by ex1.solution.ts or use it as a tutorial.
 */

createPromise<void>('run',
  resolve =>
    executeTask('my first task', 20)
      .then(() => executeTask('my second task', 20))
      .then(resolve),
);
