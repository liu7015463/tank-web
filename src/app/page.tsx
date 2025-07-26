import { worker } from '@/_mock';
import { urlJoin } from '@/utils';

import LoginPage from './auth/login/page';

export default async function Home() {
    await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: { url: urlJoin('/', 'mockServiceWorker.js') },
    });
    return <LoginPage />;
}
