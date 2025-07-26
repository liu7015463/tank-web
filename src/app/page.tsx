import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LoginPage from './auth/login/page';

export default function Home() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <LoginPage />
        </QueryClientProvider>
    );
}
