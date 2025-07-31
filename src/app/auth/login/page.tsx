'use client';
import { Card, Flex, Layout } from 'antd';
import { redirect } from 'next/navigation';

import Logo from '@/components/logo';
import { useUserToken } from '@/store/user-store';

import LoginForm from './login-form';
export default function LoginPage() {
    const token = useUserToken();
    if (token?.accessToken) {
        redirect('/workbench');
        return null;
    }
    return (
        <Layout className="h-full w-full" style={{ height: '100%', width: '100%' }}>
            <Layout.Header style={{ alignItems: 'center' }}>
                <Logo size={60} />
            </Layout.Header>
            <Layout.Content className="h-full w-full" style={{ height: '100%', width: '100%' }}>
                <Flex
                    className="h-full w-full"
                    justify="center"
                    align="center"
                    style={{ height: '100%', width: '100%' }}
                >
                    <Card className="w-[400px]">
                        <LoginForm />
                    </Card>
                </Flex>
            </Layout.Content>
        </Layout>
    );
}
