import type { ComponentType, FC } from 'react';

import { Alert } from 'antd';
import { lazy, Suspense, useMemo } from 'react';

import type { TabContentProps } from '@/types/entity';

import { useTabStore } from '@/store/tab-store';

const componentMap: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
    Home: () => import('@/components/pages/workspace-page'),
    Dashboard: () => import('@/components/pages/dashboard-page'),
    UserList: () => import('@/components/pages/users-page'),
    UserDetail: () => import('@/components/pages/user-detail-page'),
};

const NotFoundComponent: ComponentType<TabContentProps> = ({ component, path, tabKey: key }) => {
    return (
        <div className="p8 text-center">
            <Alert message="404" type="error" description={`组件 ${component} 未找到`} />
            <div className="mt-4 text-gray-500">
                <p>路径: {path}</p>
                <p>Tab Key: {key}</p>
            </div>
        </div>
    );
};

// 加载中组件
const TabLoading = () => (
    <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
        <span className="ml-2">加载中...</span>
    </div>
);

// 刷新中组件
const TabRefreshing = () => (
    <div style={{ height: '100vh' }} className="flex items-center justify-center">
        <Alert message="刷新中..." type="info" showIcon />
    </div>
);

export const TabContent: FC<TabContentProps> = ({ component, path, tabKey: key }) => {
    const reloadPath = useTabStore((state) => state.reloadPath);

    const Component = useMemo(() => {
        const importPage = componentMap[component];
        if (importPage) {
            return lazy(importPage);
        } else {
            return () => <NotFoundComponent component={component} path={path} tabKey={key} />;
        }
    }, [component]);

    if (reloadPath === path) {
        return <TabRefreshing />;
    }
    return (
        <Suspense fallback={<TabLoading />}>
            <Component path={path} key={key} component={component} />
        </Suspense>
    );
};
