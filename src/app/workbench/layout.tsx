'use client';

import { Layout } from 'antd';

import { Icon } from '@/components/icon';
import MenuView from '@/components/menu/menu';
import { TabPanes } from '@/components/tab';
import { useAppStore } from '@/store/app-store';

const { Header, Footer } = Layout;
const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 8,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 128px)', // 减去 header 和 footer 的高度
    lineHeight: 'normal',
    color: '#fff',
    backgroundColor: '#fff',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: 'normal',
    color: '#fff',
    backgroundColor: '#1677ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};

const layoutStyle = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
    minHeight: '100vh',
};
export default function WorkbenchLayout({
    children: _children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { collapsed, setCollapsed } = useAppStore();
    function handleClick() {
        console.log('click the logo');
        setCollapsed(!collapsed);
    }
    return (
        <Layout style={layoutStyle}>
            <MenuView style={siderStyle} />
            <Layout>
                <Header style={headerStyle}>
                    <Icon icon="mdi-light:home" onClick={handleClick} size={40} />
                </Header>
                <Layout>
                    {/* <Content style={contentStyle}>{children || 'content'}</Content> */}
                    <TabPanes style={contentStyle} />
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}
