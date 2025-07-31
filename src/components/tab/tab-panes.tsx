import type { TabsProps } from 'antd';
import type { FC } from 'react';

import { Dropdown, Tabs } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import type { TabItem } from '@/types/entity';

import { useTabStore } from '@/store/tab-store';

import { generateTabTitle, getRouteConfig } from '../router/routes';
import { TabContent } from './tab-content';
import $style from './tab.module.css';

interface TabPanesProps {
    style?: React.CSSProperties;
}

export const TabPanes: FC<TabPanesProps> = ({ style }) => {
    const router = useRouter();
    const pathname = usePathname();
    console.log('pathname', pathname);
    const {
        tabs,
        activeKey,
        reloadPath,
        addTab,
        removeTab,
        setActiveTab,
        setReloadPath,
        clearAllTabs,
        clearOtherTabs,
    } = useTabStore();

    useEffect(() => {
        // 只在 /workbench 路径下初始化默认 Home tab
        if (pathname === '/workbench' && tabs.length === 0) {
            const homeConfig = getRouteConfig('/workbench');
            if (homeConfig) {
                const tabTitle = generateTabTitle(homeConfig, '/workbench');
                addTab({
                    key: homeConfig.key,
                    title: tabTitle,
                    path: '/workbench',
                    closable: false,
                    component: homeConfig.component,
                });
            }
        }
    }, [pathname, tabs.length, addTab]);

    // Tab切换处理 - 只更新状态，不跳转 URL
    const handleTabChange = (key: string) => {
        console.log('切换到 Tab:', key);
        setActiveTab(key);
    };

    // 关闭tab - 只更新状态，不跳转 URL
    const handleTabClose = (key: string) => {
        console.log('关闭 Tab:', key);
        const isActive = key === activeKey;
        removeTab(key);
        if (isActive && tabs.length > 1) {
            const idx = tabs.findIndex((t) => t.key === key);
            const nextTab = tabs[Math.max(0, idx - 1)];
            if (nextTab && nextTab.key !== key) {
                setActiveTab(nextTab.key);
            }
        }
    };

    // 刷新当前tab
    const handleRefreshTab = () => {
        setReloadPath(pathname);
        setTimeout(() => {
            setReloadPath(null);
        }, 1000);
    };

    const getMenuItems = (tab: TabItem) => [
        {
            key: 'refresh',
            label: '刷新',
            disabled: tab.path !== pathname,
            onClick: () => handleRefreshTab(),
        },
        {
            key: 'close',
            label: '关闭',
            disabled: tab.key === 'Home',
            onClick: () => handleTabClose(tab.key),
        },
        {
            key: 'closeOthers',
            label: '关闭其他',
            onClick: () => {
                clearOtherTabs(tab.key);
                if (tab.key !== activeKey) {
                    router.push(tab.path);
                }
            },
        },
        {
            key: 'closeAll',
            label: '关闭所有',
            disabled: tab.key === 'Home',
            onClick: () => {
                clearAllTabs();
                router.push('/workbench');
            },
        },
    ];
    // 使用 useMemo 优化 items 数组的创建
    const tabItems: TabsProps['items'] = useMemo(() => {
        return tabs.map((tab) => ({
            key: tab.key,
            closable: tab.closable,
            label: (
                <Dropdown menu={{ items: getMenuItems(tab) }} placement="bottomLeft" trigger={['contextMenu']}>
                    <span className="inline-flex items-center">
                        {reloadPath === tab.path && '↻'}
                        {tab.title}
                    </span>
                </Dropdown>
            ),
            children: <TabContent component={tab.component || 'Home'} path={tab.path} tabKey={tab.key} />,
        }));
    }, [tabs, reloadPath, getMenuItems]);

    console.log('tabs', tabs);
    return (
        <div className="h-full">
            <Tabs
                style={style}
                className={$style.tabs}
                activeKey={activeKey}
                hideAdd={true}
                onChange={handleTabChange}
                onEdit={(targetKey, action) => {
                    if (action === 'remove' && typeof targetKey === 'string') {
                        handleTabClose(targetKey);
                    }
                }}
                type="editable-card"
                size="small"
                items={tabItems}
            />
        </div>
    );
};
