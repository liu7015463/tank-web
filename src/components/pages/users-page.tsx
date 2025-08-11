import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FC } from 'react';

import { Button, Card, Space, Table } from 'antd';
import Link from 'next/link';

import type { UserInfo } from '@/types/entity';

import { useUserList } from '@/hooks/use-users';

const UsersPage: FC = () => {
    const columns: ColumnsType<UserInfo> = [
        {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <Link href={'#'}>{text}</Link>,
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '角色',
            key: 'roles',
            dataIndex: 'roles',
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
    const { data, isLoading, isError, error } = useUserList();

    if (isError) {
        return <div>{error?.message}</div>;
    }

    function handleTableChange(pagination: TablePaginationConfig): void {
        console.log('分页变化:', pagination);
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">用户管理</h1>
                <Button type="primary">添加用户</Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    dataSource={data?.items}
                    pagination={{
                        current: data?.meta.currentPage ?? 1,
                        pageSize: data?.meta.perPage ?? 10,
                        total: data?.meta.totalItems ?? 0,
                    }}
                    rowKey={(r) => r.id}
                    loading={isLoading}
                    onChange={handleTableChange}
                />
            </Card>
        </div>
    );
};

export default UsersPage;
