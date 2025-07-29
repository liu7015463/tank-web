'use client';

import { Col, Layout, Row } from 'antd';

import Logo from '@/components/logo';
import MenuView from '@/components/menu/menu';
import { TabPanes } from '@/components/tab';

const { Header, Footer } = Layout;
const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 8,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
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
                    {/* <Content style={contentStyle}>{children || 'content'}</Content> */}
                    <TabPanes />
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}
