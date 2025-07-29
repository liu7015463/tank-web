import type { FC } from 'react';

import { Dropdown, Menu, Tabs } from 'antd';
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
        const routeConfig = getRouteConfig(pathname);
        console.log('routeConfig', routeConfig);
        if (routeConfig) {
            const tabTitle = generateTabTitle(routeConfig, pathname);
            addTab({
                key: routeConfig.key,
                title: tabTitle,
                path: pathname,
                closable: routeConfig.key !== 'Home',
                component: routeConfig.component,
            });
        }
    }, [pathname, addTab]);

    // Tab切换处理
    const handleTabChange = (key: string) => {
        const tab = tabs.find((t) => t.key === key);
        if (tab) {
            setActiveTab(key);
            router.push(tab.path);
        }
    };

    // 关闭tab
    const handleTabClose = (key: string) => {
        const isActive = key === activeKey;
        removeTab(key);
        if (isActive && tabs.length > 1) {
            const idx = tabs.findIndex((t) => t.key === key);
            const nextTab = tabs[Math.max(0, idx - 1)];
            if (nextTab && nextTab.key !== key) {
                router.push(nextTab.path);
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

    const menu = (tab: TabItem) => (
        <Menu>
            <Menu.Item key="refresh" onClick={handleRefreshTab} disabled={tab.path !== pathname}>
                刷新
            </Menu.Item>
            <Menu.Item
                key="close"
                onClick={(e) => {
                    e.domEvent.stopPropagation();
                    handleTabClose(tab.key);
                }}
                disabled={tab.key === 'home'}
            >
                关闭
            </Menu.Item>
            <Menu.Item
                key="closeOthers"
                onClick={(e) => {
                    e.domEvent.stopPropagation();
                    clearOtherTabs(tab.key);
                    if (tab.key !== activeKey) {
                        router.push(tab.path);
                    }
                }}
            >
                关闭其他
            </Menu.Item>
            <Menu.Item
                key="closeAll"
                onClick={(e) => {
                    e.domEvent.stopPropagation();
                    clearAllTabs();
                    router.push('/workbench');
                }}
                disabled={tab.key === 'Home'}
            >
                关闭所有
            </Menu.Item>
        </Menu>
    );
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
                            <Dropdown overlay={menu(tab)} placement="bottomLeft" trigger={['contextMenu']}>
                                <span className="inline-flex items-center">
                                    {reloadPath === tab.path && '↻'}
                                    {tab.title}
                                </span>
                            </Dropdown>
                        }
                    >
                        <TabContent component={tab.component || 'Home'} path={tab.path} key={tab.key} />
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
};
