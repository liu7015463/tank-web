'use client';

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 128px)', // 减去 header 和 footer 的高度
    lineHeight: 'normal',
    color: '#fff',
    backgroundColor: '#0958d9',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: 'normal',
    color: '#fff',
    backgroundColor: '#1677ff',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
    minHeight: '100vh',
};
export default function WorkbenchLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Layout style={layoutStyle}>
            <Sider width="25%" style={siderStyle}>
                Sider
            </Sider>
            <Layout>
                <Header style={headerStyle}>Header</Header>
                <Content style={contentStyle}>{children || 'content'}</Content>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>
        </Layout>
    );
}
