import { executeTask } from './dojo-bootstrap';


async function run() {
  executeTask('aaa', 50).then(() => executeTask('aaa-sss', 10));
  executeTask('bbb', 10, true).then(() => executeTask('bbb-sss', 10), () => executeTask('bbb-fff', 10));
  executeTask('ccc', 25);
}

run();
