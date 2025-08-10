'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App, ConfigProvider } from 'antd';
import { useState } from 'react';

import GlobalMessageProvider from './global-message-provider';
import MSWProvider from './msw-provider';

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <MSWProvider>
            <AntdRegistry>
                <ConfigProvider>
                    <App>
                        <GlobalMessageProvider>
                            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                        </GlobalMessageProvider>
                    </App>
                </ConfigProvider>
            </AntdRegistry>
        </MSWProvider>
    );
}
