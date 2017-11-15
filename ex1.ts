import {
  createPromise,
  executeTask,
} from './dojo-bootstrap';


createPromise<void>('run',
  resolve =>
    executeTask('my first task', 20)
      .then(() => executeTask('my second task', 20))
      .then(resolve),
);
