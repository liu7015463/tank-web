import { setupServer } from 'msw/node';

import { signIn } from './handlers/_user';

// Only run in development environment
if (process.env.NODE_ENV === 'development') {
    const handlers = [signIn];
    const server = setupServer(...handlers);

    server.listen({
        onUnhandledRequest: 'bypass',
    });

    console.log('MSW server running in development mode');
}
