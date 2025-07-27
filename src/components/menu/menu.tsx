import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useAppStore } from '@/store/app-store';
import { useUserInfo } from '@/store/user-store';
import { getKeyName } from '@/utils';

export default function MenuView({ style }: { style: any }) {
    const userInfo = useUserInfo();
    const collapsed = useAppStore((state) => state.collapsed);
    const path = usePathname();
    const { tabKey: curKey = 'home' } = getKeyName(path);
    const [current, setCurrent] = useState(curKey);
    const { permission = [] } = userInfo;
    return (
        <Layout.Sider style={style}>
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                    <Link href="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link href="/workbench">Workbench</Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
}
