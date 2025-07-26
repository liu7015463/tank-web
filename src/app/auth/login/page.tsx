'use client';
import { redirect } from 'next/navigation';

import Logo from '@/components/logo';
import { useUserToken } from '@/store/user-store';
import { mergeClassname } from '@/utils';

import LoginForm from './login-form';
import $styles from './login.module.css';
export default function LoginPage() {
    const token = useUserToken();
    if (token?.accessToken) {
        redirect('/workbench');
        return null;
    }
    return (
        <div className={$styles.container}>
            <span className="-enter-x xl:hidden" />

            <div className={$styles.main}>
                <div className="flex h-full">
                    <div className={$styles.leftBlock}>
                        <div className="my-auto">
                            <Logo size={128} />
                            <div className="-enter-x mt-10 font-medium text-white">
                                <span className="mt-4 inline-block text-3xl">基于Nextjs的管理面板</span>
                            </div>
                        </div>
                    </div>
                    <div className={mergeClassname($styles.rightBlock, 'enter-x')}>
                        <div className={$styles.formBlock}>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
