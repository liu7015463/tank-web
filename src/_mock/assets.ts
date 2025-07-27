import { faker } from '@faker-js/faker';

import type { User } from '@/types/entity';

import WorkbenchPage from '@/app/workbench/page';

export const USERS: User[] = [
    {
        id: 'user_admin_id',
        username: 'admin',
        password: 'demo1234',
        avatar: faker.image.avatarGitHub(),
        email: 'admin@slash.com',
    },
    {
        id: 'user_test_id',
        username: 'test',
        password: 'demo1234',
        avatar: faker.image.avatarGitHub(),
        email: 'test@slash.com',
    },
    {
        id: 'user_guest_id',
        username: 'guest',
        password: 'demo1234',
        avatar: faker.image.avatarGitHub(),
        email: 'guest@slash.com',
    },
];

export const preDefinedRoutes = [
    {
        path: '/',
        name: '首页',
        exact: true,
        key: 'home',
        icon: '',
        component: null,
    },
    {
        path: '/workspace',
        name: '工作台',
        exact: true,
        key: 'workspace',
        component: WorkbenchPage,
        icon: '',
        // icon: () =>
        //   React.createElement(Icon, { icon: 'arcticons:syska-smart-home' })
    },
    {
        path: '/user',
        name: '用户管理',
        key: 'user',
        type: 'subMenu',
        icon: '',
        iconfont: 'icon-xiaoshouzongjian',
        routes: [
            {
                path: '/user/list',
                name: '用户列表',
                exact: true,
                key: 'user:list:view',
                component: null,
            },
            {
                path: '/user/list/add',
                name: '新增用户',
                exact: true,
                key: 'user:list:add',
                // hideInMenu: true,
                component: null,
            },
            {
                path: '/user/list/edit',
                name: '编辑用户',
                exact: true,
                key: 'user:list:edit',
                hideInMenu: true,
                component: null,
            },
        ],
    },
    {
        path: '/role',
        name: '角色管理',
        key: 'role',
        type: 'subMenu',
        icon: '',
        routes: [
            {
                path: '/role/list',
                name: '角色列表',
                exact: true,
                key: 'role:list:view',
                component: null,
            },
        ],
    },
    {
        path: '/auth',
        name: '权限测试页',
        exact: true,
        key: 'auth:test:view',
        icon: '',
        component: null,
    },
    {
        path: '/test-api',
        name: '测试api',
        exact: true,
        key: '/test-api',
        icon: '',
        component: null,
    },
    {
        path: '/403',
        name: '暂无权限',
        exact: true,
        key: '/403',
        icon: '',
        // hideInMenu: true,
        component: null,
    },
];
