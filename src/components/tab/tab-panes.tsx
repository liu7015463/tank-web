import type { FC } from 'react';

import { Dropdown, Tabs } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import type { TabItem } from '@/types/entity';

import { useTabStore } from '@/store/tab-store';

import { generateTabTitle, getRouteConfig } from '../router/routes';
import { TabContent } from './tab-content';

const { TabPane } = Tabs;

export const TabPanes: FC = () => {
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
    console.log('tabs', tabs);
    return (
        <div className="h-full">
            <Tabs
                className="h-full"
                activeKey={activeKey}
                hideAdd={true}
                onChange={handleTabChange}
                type="editable-card"
                size="small"
            >
                {tabs.map((tab) => (
                    <TabPane
                        key={tab.key}
                        closable={tab.closable}
                        tab={
                            <Dropdown
                                menu={{ items: getMenuItems(tab) }}
                                placement="bottomLeft"
                                trigger={['contextMenu']}
                            >
                                <span className="inline-flex items-center">
                                    {reloadPath === tab.path && '↻'}
                                    {tab.title}
                                </span>
                            </Dropdown>
                        }
                    >
                        <TabContent component={tab.component || 'Home'} path={tab.path} tabKey={tab.key} />
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
};
