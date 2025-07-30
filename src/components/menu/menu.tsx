import type { ItemType } from 'antd/es/menu/interface';
import type { CSSProperties } from 'react';

import { Layout, Menu } from 'antd';
import { usePathname } from 'next/navigation';

import { useAppStore } from '@/store/app-store';
import { useTabStore } from '@/store/tab-store';
import { getKeyName } from '@/utils';

import Logo from '../logo';
import { generateTabTitle, getRouteConfigByKey } from '../router/routes';

export default function MenuView({ style }: { style: CSSProperties }) {
    const collapsed = useAppStore((state) => state.collapsed);
    const path = usePathname();
    const { tabKey: _curKey = 'home' } = getKeyName(path);

    const setCurrentTab = useAppStore((state) => state.setCurrentTab);
    const items: ItemType[] = [
        {
            key: 'sub1',
            label: 'Navigation One',
            icon: <Logo size={28} />,
            children: [
                { key: '1', label: 'Option 1' },
                { key: 'UserDetail', label: 'Option 2' },
                { key: 'UserList', label: 'Option 3' },
                { key: 'Dashboard', label: 'Option 4' },
            ],
        },
        {
            key: 'sub2',
            label: 'Navigation Two',
            icon: <Logo size={28} />,
            children: [
                { key: '5', label: 'Option 5' },
                { key: '6', label: 'Option 6' },
                {
                    key: 'sub3',
                    label: 'Submenu',
                    children: [
                        { key: '7', label: 'Option 7' },
                        { key: '8', label: 'Option 8' },
                    ],
                },
            ],
        },
        {
            key: 'sub4',
            label: 'Navigation Three',
            icon: <Logo size={20} />,
            children: [
                { key: '9', label: 'Option 9' },
                { key: '10', label: 'Option 10' },
                { key: '11', label: 'Option 11' },
                { key: '12', label: 'Option 12' },
            ],
        },
    ];
    const { addTab, setActiveTab } = useTabStore();

    // 处理菜单点击，只在 Tab 内切换，不跳转 URL
    const handleMenuClick = (key: string) => {
        setCurrentTab(key);
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
        <Layout.Sider style={style}>
            <Menu
                theme="dark"
                inlineCollapsed={collapsed}
                style={{ height: '100%', width: '100%' }}
                defaultSelectedKeys={['1']}
                mode="inline"
                onClick={({ key }) => handleMenuClick(key)}
                items={items}
            ></Menu>
        </Layout.Sider>
    );
}
