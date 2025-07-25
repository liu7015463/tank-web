'use client';
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
        <>
            <Logo />
            <LoginForm />
        </>
    );
}
