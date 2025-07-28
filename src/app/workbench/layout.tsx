'use client';

import { Col, Layout, Row } from 'antd';

import Logo from '@/components/logo';
import MenuView from '@/components/menu/menu';

const { Header, Footer, Content } = Layout;
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
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <Row style={{ height: '100%', width: '100%' }}>
                    <Col span={6}>
                        <Logo />
                    </Col>
                    <Col span={6} offset={12}>
                        <Logo />
                    </Col>
                </Row>
            </Header>
            <Layout>
                <MenuView style={siderStyle} />
                <Layout>
                    <Content style={contentStyle}>{children || 'content'}</Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}
