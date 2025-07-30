import type { FC } from 'react';

import { Card, Col, Row, Statistic } from 'antd';

const DashboardPage: FC = () => {
    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">仪表盘</h1>

            <Row gutter={16} className="mb-6">
                <Col span={8}>
                    <Card>
                        <Statistic title="总用户数" value={1128} valueStyle={{ color: '#3f8600' }} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="活跃用户" value={893} valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="今日访问" value={2456} valueStyle={{ color: '#cf1322' }} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Card title="用户增长趋势" className="h-80">
                        <div className="flex h-full items-center justify-center text-gray-500">图表组件占位</div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="访问统计" className="h-80">
                        <div className="flex h-full items-center justify-center text-gray-500">图表组件占位</div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardPage;
