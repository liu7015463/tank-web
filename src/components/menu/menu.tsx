import type { CSSProperties } from 'react';

import { Alert, Image, Layout, Menu, Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { useMenu } from '@/hooks/use-menu';
import { useAppStore } from '@/store/app-store';
import { useTabStore } from '@/store/tab-store';
import { findParentKeys } from '@/utils/menu-utils';

import { generateTabTitle, getRouteConfigByKey } from '../router/routes';
import './menu.css';

export default function MenuView({ style }: { style: CSSProperties }) {
    const collapsed = useAppStore((state) => state.collapsed);
    const { menuItems, isLoading, isError, error } = useMenu();
    const { addTab, activeKey, setActiveTab } = useTabStore();

    // 管理菜单展开状态
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    // 自动展开父级菜单的函数
    const autoExpandParentKeys = useCallback(
        (key: string) => {
            if (!menuItems || collapsed) {
                return;
            }
            // 查找所有父级菜单路径
            const parentKeys = findParentKeys(key, menuItems);
            if (parentKeys.length > 0) {
                setOpenKeys((prevOpenKeys) => {
                    const keysToOpen = parentKeys.filter((parentKey) => !prevOpenKeys.includes(parentKey));
                    if (keysToOpen.length > 0) {
                        console.log('📂 自动展开父级菜单:', keysToOpen);
                        return [...prevOpenKeys, ...keysToOpen];
                    }
                    return prevOpenKeys;
                });
            }
        },
        [menuItems, collapsed],
    );

    // 处理菜单选择，确保父级展开
    const handleMenuSelect = useCallback(
        ({ key }: { key: string }) => {
            console.log('菜单点击选择:', key);
            autoExpandParentKeys(key);
        },
        [autoExpandParentKeys],
    );

    // 监听 activeKey 变化，自动展开对应的父级菜单
    useEffect(() => {
        if (activeKey) {
            console.log('activeKey 变化:', activeKey);
            // 使用 setTimeout 来避免在 useEffect 中直接调用 setState
            const timer = setTimeout(() => {
                autoExpandParentKeys(activeKey);
            }, 0);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [activeKey, autoExpandParentKeys]);

    // 处理菜单点击，只在 Tab 内切换，不跳转 URL
    const handleMenuClick = (key: string) => {
        const routeConfig = getRouteConfigByKey(key);
        if (routeConfig) {
            const tabTitle = generateTabTitle(routeConfig, routeConfig.path);

            // 先添加 Tab
            addTab({
                key: routeConfig.key,
                title: tabTitle,
                path: routeConfig.path, // 保持原路径用于显示，但不实际跳转
                closable: routeConfig.key !== 'Home',
                component: routeConfig.component,
            });

            // 然后设置为活跃 Tab（不跳转 URL）
            setActiveTab(routeConfig.key);
        }
        console.log('菜单点击:', key);
    };

    const handlerOpennChage = (openKeys: string[]) => {
        console.log('展开菜单:', openKeys);
        setOpenKeys(openKeys);
    };

    // 渲染加载状态
    if (isLoading) {
        return (
            <Layout.Sider
                style={{
                    ...style,
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                }}
                collapsed={collapsed}
            >
                <div>
                    <Image src="icon.svg" alt="logo" preview={false} height={64} width="100%" />
                </div>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <Spin size="large" />
                </div>
            </Layout.Sider>
        );
    }

    // 渲染错误状态
    if (isError) {
        return (
            <Layout.Sider
                style={{
                    ...style,
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                }}
                collapsed={collapsed}
            >
                <div>
                    <Image src="icon.svg" alt="logo" preview={false} height={64} width="100%" />
                </div>
                <div style={{ padding: '20px' }}>
                    <Alert
                        message="菜单加载失败"
                        description={error?.message || '请检查网络连接'}
                        type="error"
                        showIcon
                    />
                </div>
            </Layout.Sider>
        );
    }

    return (
        <Layout.Sider
            style={{
                ...style,
                overflow: 'hidden',
                boxSizing: 'border-box',
            }}
            collapsed={collapsed}
        >
            <div>
                <Image src="icon.svg" alt="logo" preview={false} height={64} width="100%" />
            </div>
            <Menu
                theme="light"
                style={{
                    height: '100%',
                    flex: 1,
                    minWidth: 0,
                    maxWidth: '100%',
                    border: 'none',
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                }}
                defaultSelectedKeys={['Home']}
                selectedKeys={[activeKey]}
                openKeys={openKeys}
                onOpenChange={handlerOpennChage}
                mode="inline"
                onClick={({ key }) => handleMenuClick(key)}
                onSelect={handleMenuSelect}
                items={menuItems}
            />
        </Layout.Sider>
    );
}
