import { signIn } from './handlers/_user';

const handlers = [signIn];

// Create a function to get worker only in browser environment
const getWorker = async () => {
    if (typeof window !== 'undefined') {
        const { setupWorker } = await import('msw/browser');
        return setupWorker(...handlers);
    }
    return null;
};

export { getWorker };
