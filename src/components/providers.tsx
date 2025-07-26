'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import MSWProvider from './msw-provider';

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <MSWProvider>
            <AntdRegistry>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </AntdRegistry>
        </MSWProvider>
    );
}
