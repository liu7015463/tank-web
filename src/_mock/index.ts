import { getMenuTree } from './handlers/_menu';
import { signIn } from './handlers/_user';

const handlers = [signIn, getMenuTree];

// Create a function to get worker only in browser environment
const getWorker = async () => {
    if (typeof window !== 'undefined') {
        const { setupWorker } = await import('msw/browser');
        return setupWorker(...handlers);
    }
    return null;
};

export { getWorker };
