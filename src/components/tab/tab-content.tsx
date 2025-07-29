import { useTabStore } from '@/store/tab-store';
import { TabContentProps } from '@/types/entity';
import { Alert } from 'antd';
import { ComponentType, FC, lazy, Suspense } from 'react';

const componentMap: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
    '/': () => import('@/app/workbench/page'),
    '/404': () => import('@/app/workbench/page'),
    '/403': () => import('@/app/workbench/page'),
    '/500': () => import('@/app/workbench/page'),
};

const createComponent = (componentName: string) => {
    const importPage = componentMap[componentName];
    if (importPage) {
        return lazy(importPage);
    } else {
        return <Alert message="404" type="error" description={`组件 ${componentName} 未找到`} />;
    }
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

    const Component = createComponent(component);
    return (
        <Suspense fallback={<TabLoading />}>
            <Component path={path} key={key} />
        </Suspense>
    );
};
