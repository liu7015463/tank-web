import type { ColumnsType } from 'antd/es/table';
import type { FC } from 'react';

import { Button, Card, Space, Table, Tag } from 'antd';
import Link from 'next/link';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const UsersPage: FC = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Link href={'#'}>{text}</Link>,
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (_, _record) => (
                <Space size="middle">
                    <Link href={'#'}>编辑</Link>
                    <Link href={'#'}>删除</Link>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: '张三',
            age: 32,
            address: '北京市朝阳区',
            tags: ['开发者', 'cool'],
        },
        {
            key: '2',
            name: '李四',
            age: 42,
            address: '上海市浦东新区',
            tags: ['loser'],
        },
        {
            key: '3',
            name: '王五',
            age: 32,
            address: '广州市天河区',
            tags: ['cool', 'teacher'],
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">用户管理</h1>
                <Button type="primary">添加用户</Button>
            </div>

            <Card>
                <Table columns={columns} dataSource={data} />
            </Card>
        </div>
    );
};

export default UsersPage;
