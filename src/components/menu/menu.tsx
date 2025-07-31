import type { ItemType } from 'antd/es/menu/interface';
import type { CSSProperties } from 'react';

import { Layout, Menu } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { useAppStore } from '@/store/app-store';
import { useTabStore } from '@/store/tab-store';

import Icon from '../icon/icon';
import { generateTabTitle, getRouteConfigByKey } from '../router/routes';
import './menu.css';

export default function MenuView({ style }: { style: CSSProperties }) {
    const collapsed = useAppStore((state) => state.collapsed); // 在 MenuView 组件中添加以下样式
    const menuItemStyle: CSSProperties = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };

    // 修改 items 数据结构，为每个菜单项添加样式
    const items: ItemType[] = [
        {
            key: 'Home',
            label: 'Option 1',
            style: menuItemStyle,
        },
        {
            key: 'sub1',
            label: 'Navigation One',
            icon: <Icon icon="noto:blowfish" color="blue" size={28} />,
            children: [
                { key: 'UserDetail', label: 'Option 2', style: menuItemStyle },
                { key: 'UserList1', label: 'Option 3', style: menuItemStyle },
                { key: 'Dashboard', label: 'Option 4', style: menuItemStyle },
            ],
        },
        {
            key: 'sub2',
            label: 'Navigation Two',
            icon: <Icon icon="mdi-light:home" size={28} color="red" />,
            children: [
                { key: 'Dashboard2', label: 'Dashboard (测试自动展开)', style: menuItemStyle },
                { key: '6', label: 'Option 6', style: menuItemStyle },
                {
                    key: 'sub3',
                    label: 'Submenu',
                    children: [
                        { key: 'UserList', label: 'User List (嵌套测试)', style: menuItemStyle },
                        { key: '8', label: 'Option 8', style: menuItemStyle },
                    ],
                },
            ],
        },
        {
            key: 'sub4',
            label: 'Navigation Three',
            icon: <Icon icon="material-symbols:battery-android-bolt-outline" size={28} color="blue" />,
            children: [
                { key: '9', label: 'Option 9', style: menuItemStyle },
                { key: '10', label: 'Option 10', style: menuItemStyle },
                { key: '11', label: 'Option 11', style: menuItemStyle },
                { key: '12', label: 'Option 12', style: menuItemStyle },
            ],
        },
    ];
    const { addTab, activeKey, setActiveTab } = useTabStore();

    // 管理菜单展开状态
    const [openKeys, setOpenKeys] = useState<string[]>([]); // 默认全部收起，测试自动展开功能

    // 查找子菜单项的所有父级菜单路径
    const findParentKeys = (targetKey: string, menuItems: ItemType[], parentPath: string[] = []): string[] => {
        for (const item of menuItems) {
            if (item && typeof item === 'object' && 'children' in item && item.children) {
                const currentPath = [...parentPath, item.key as string];

                // 检查直接子项
                const hasDirectChild = item.children.some(
                    (child) => child && typeof child === 'object' && 'key' in child && child.key === targetKey,
                );
                if (hasDirectChild) {
                    return currentPath;
                }

                // 递归检查嵌套子项
                const nestedPath = findParentKeys(targetKey, item.children as ItemType[], currentPath);
                if (nestedPath.length > 0) {
                    return nestedPath;
                }
            }
        }
        return [];
    };

    // 处理菜单选择，确保父级展开
    const handleMenuSelect = useCallback(
        ({ key }: { key: string }) => {
            console.log('菜单点击选择:', key);
            if (collapsed) {
                return;
            }
            // 查找所有父级菜单路径
            const parentKeys = findParentKeys(key, items);
            if (parentKeys.length > 0) {
                // 使用函数式更新，避免依赖 openKeys
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
        [items],
    );

    // 监听 activeKey 变化，自动展开对应的父级菜单
    useEffect(() => {
        if (activeKey) {
            console.log('activeKey 变化:', activeKey);
            handleMenuSelect({ key: activeKey });
        }
    }, [activeKey, handleMenuSelect]);

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

    return (
        <Layout.Sider
            style={{
                ...style,
                overflow: 'hidden',
                boxSizing: 'border-box',
            }}
            collapsed={collapsed}
        >
            <Menu
                theme="dark"
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
                onOpenChange={setOpenKeys}
                mode="inline"
                onClick={({ key }) => handleMenuClick(key)}
                onSelect={handleMenuSelect}
                items={items}
            />
        </Layout.Sider>
    );
}
