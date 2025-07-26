import { setupWorker } from 'msw/browser';

import { signIn } from './handlers/_user';

const handlers = [signIn];
const worker = setupWorker(...handlers);

export { worker };
