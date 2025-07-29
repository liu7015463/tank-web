import { useTabStore } from '@/store/tab-store';
import { TabContentProps } from '@/types/entity';
import { Alert } from 'antd';
import { ComponentType, FC, lazy, Suspense, useMemo } from 'react';

const componentMap: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
    '/': () => import('@/app/workbench/page'),
    '/404': () => import('@/app/workbench/page'),
    '/403': () => import('@/app/workbench/page'),
    '/500': () => import('@/app/workbench/page'),
};

const NotFoundComponent: ComponentType<TabContentProps> = ({ component, path, key }) => {
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
    <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">加载中...</span>
    </div>
);

// 刷新中组件
const TabRefreshing = () => (
    <div style={{ height: '100vh' }} className="flex items-center justify-center">
        <Alert message="刷新中..." type="info" showIcon />
    </div>
);

export const TabContent: FC<TabContentProps> = ({ component, path, key }) => {
    const reloadPath = useTabStore((state) => state.reloadPath);
    if (reloadPath === path) {
        return <TabRefreshing />;
    }

    const Component = useMemo(() => {
        const importPage = componentMap[component];
        if (importPage) {
            return lazy(importPage);
        } else {
            return () => <NotFoundComponent component={component} path={path} key={key} />;
        }
    }, [component]);
    return (
        <Suspense fallback={<TabLoading />}>
            <Component path={path} key={key} component={component} />
        </Suspense>
    );
};
