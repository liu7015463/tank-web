'use client';

import { useUserInfo } from '@/store/user-store';

export default function WorkbenchPage() {
    const userInfo = useUserInfo();

    return (
        <div className="p-8">
            <h1 className="mb-4 text-2xl font-bold">工作台</h1>
            <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-2 text-lg font-semibold">欢迎回来!</h2>
                {userInfo.username && (
                    <p className="text-gray-600">
                        用户: {userInfo.username} ({userInfo.email})
                    </p>
                )}
            </div>
        </div>
    );
}
