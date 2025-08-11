import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FC } from 'react';

import { Button, Card, Result, Space, Table, Tag } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

import type { Paginate, UserInfo } from '@/types/entity';

import { useUserList } from '@/hooks/use-users';
import { BasicStatus } from '@/types/enum';

const UsersPage: FC = () => {
    // 分页状态
    const [pagination, setPagination] = useState<Paginate>({ current: 1, pageSize: 10 });

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
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: BasicStatus) => (
                <Tag color={status === BasicStatus.ENABLED ? 'green' : 'red'}>
                    {status === BasicStatus.ENABLED ? '启用' : '禁用'}
                </Tag>
            ),
        },
        {
            title: '角色',
            key: 'roles',
            dataIndex: 'roles',
            render: (roles: UserInfo['roles']) => (
                <Space>
                    {roles?.map((role) => (
                        <Tag key={role.id} color="blue">
                            {role.name}
                        </Tag>
                    ))}
                </Space>
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

    const { data, isLoading, isError, error } = useUserList(pagination);

    // 错误处理
    if (isError) {
        return (
            <div className="p-6">
                <Result
                    status="error"
                    title="获取用户列表失败"
                    subTitle={error?.message || '请检查网络连接或稍后重试'}
                    extra={
                        <Button type="primary" onClick={() => window.location.reload()}>
                            重新加载
                        </Button>
                    }
                />
            </div>
        );
    }

    // 分页变化处理
    function handleTableChange(
        paginationConfig: TablePaginationConfig,
        filters?: any,
        sorter?: any,
        extra?: any,
    ): void {
        console.log('分页变化:', paginationConfig, 'extra:', extra);
        const newPagination = {
            current: paginationConfig.current || 1,
            pageSize: paginationConfig.pageSize || 10,
        };
        console.log('设置新的分页参数:', newPagination);
        setPagination(newPagination);
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">用户管理</h1>
                    {data?.meta && (
                        <p className="mt-2 text-sm text-gray-500">
                            共 {data.meta.totalItems} 条数据，当前第 {data.meta.currentPage} 页，共{' '}
                            {data.meta.totalPages} 页
                        </p>
                    )}
                </div>
                <Button type="primary">添加用户</Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    dataSource={data?.items}
                    pagination={{
                        current: data?.meta.currentPage ?? pagination.current,
                        pageSize: data?.meta.perPage ?? pagination.pageSize,
                        total: data?.meta.totalItems ?? 0,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条数据`,
                        pageSizeOptions: ['10', '20', '50', '100'],
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
