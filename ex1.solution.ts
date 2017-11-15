import {
  executeTask,
} from './dojo-bootstrap';


async function run() {
  await executeTask('my first task', 20);
  await executeTask('my second task', 20);
}

run();
