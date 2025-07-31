import type { FC } from 'react';

import { Button, Card, Descriptions, Space, Tag } from 'antd';

const UserDetailPage: FC = () => {
    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">用户详情</h1>
                <Space>
                    <Button>编辑</Button>
                    <Button type="primary">保存</Button>
                </Space>
            </div>

            <Card title="基本信息" className="mb-6">
                <Descriptions bordered>
                    <Descriptions.Item label="用户名">张三</Descriptions.Item>
                    <Descriptions.Item label="年龄">32</Descriptions.Item>
                    <Descriptions.Item label="状态">
                        <Tag color="green">活跃</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="邮箱">zhangsan@example.com</Descriptions.Item>
                    <Descriptions.Item label="电话">138-0013-8000</Descriptions.Item>
                    <Descriptions.Item label="地址">北京市朝阳区</Descriptions.Item>
                    <Descriptions.Item label="注册时间">2023-01-15 10:30:00</Descriptions.Item>
                    <Descriptions.Item label="最后登录">2024-01-30 14:25:00</Descriptions.Item>
                    <Descriptions.Item label="备注">这是一个测试用户，用于演示用户详情页面的功能。</Descriptions.Item>
                </Descriptions>
            </Card>

            <Card title="权限信息">
                <Descriptions bordered>
                    <Descriptions.Item label="用户角色">
                        <Tag color="blue">管理员</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="部门">技术部</Descriptions.Item>
                    <Descriptions.Item label="职位">高级工程师</Descriptions.Item>
                    <Descriptions.Item label="权限组" span={3}>
                        <Space>
                            <Tag>用户管理</Tag>
                            <Tag>系统设置</Tag>
                            <Tag>数据分析</Tag>
                        </Space>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export default UserDetailPage;
