'use client';

import { useEffect, useState } from 'react';

import { getWorker } from '@/_mock';
import { urlJoin } from '@/utils';

interface MSWProviderProps {
    children: React.ReactNode;
}

export default function MSWProvider({ children }: MSWProviderProps) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initMSW = async () => {
            // Only initialize MSW in browser environment and development mode
            if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
                try {
                    console.log('Starting MSW...');
                    const worker = await getWorker();
                    if (worker) {
                        await worker.start({
                            onUnhandledRequest: 'bypass',
                            serviceWorker: { url: urlJoin('/', 'mockServiceWorker.js') },
                        });
                        console.log('✅ MSW started successfully');
                    }
                    setIsReady(true);
                } catch (error) {
                    console.error('❌ Failed to start MSW:', error);
                    setIsReady(true); // Still render the app even if MSW fails
                }
            } else {
                console.log('MSW skipped (not in development or not in browser)');
                setIsReady(true);
            }
        };

        initMSW();
    }, []);

    if (!isReady) {
        return <div>Loading...</div>; // Or your loading component
    }

    return <>{children}</>;
}
