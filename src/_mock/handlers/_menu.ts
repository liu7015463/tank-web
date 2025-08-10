import { http, HttpResponse } from 'msw';

import type { MenuTree } from '@/types/entity';

import { MenuApi, MenuPermissionType, ResultStats } from '@/types/enum';

/**
 * Mock菜单数据 - 基于服务端真实数据结构
 */
const MOCK_MENU_TREE: MenuTree[] = [
    {
        id: '0db19640-9e1f-4282-a070-f3ac878390bc',
        parentId: null,
        name: '系统管理',
        code: 'system',
        path: null,
        icon: 'settings',
        caption: '系统管理',
        externalLink: null,
        component: null,
        customOrder: 1000,
        type: MenuPermissionType.MENU,
        children: [
            {
                id: 'da2e1604-7bd4-4429-b39e-9dbc028d2115',
                parentId: '0db19640-9e1f-4282-a070-f3ac878390bc',
                name: '用户管理',
                code: 'user-manage',
                path: '/system/users',
                icon: 'people',
                caption: '用户管理',
                externalLink: null,
                component: 'UserManage',
                customOrder: 1010,
                type: MenuPermissionType.MENU,
            },
            {
                id: '109e232e-6ad3-4da9-9536-8d8f6bb7d147',
                parentId: '0db19640-9e1f-4282-a070-f3ac878390bc',
                name: '角色管理',
                code: 'role-manage',
                path: '/system/roles',
                icon: 'security',
                caption: '角色管理',
                externalLink: null,
                component: 'RoleManage',
                customOrder: 1020,
                type: MenuPermissionType.MENU,
            },
            {
                id: 'eda59e7a-1286-4c03-b88d-ac74ce606896',
                parentId: '0db19640-9e1f-4282-a070-f3ac878390bc',
                name: '权限管理',
                code: 'permission-manage',
                path: '/system/permissions',
                icon: 'key',
                caption: '权限管理',
                externalLink: null,
                component: 'PermissionManage',
                customOrder: 1030,
                type: MenuPermissionType.MENU,
            },
            {
                id: '657c36d0-cb7d-45fb-8c92-55a788d1b00e',
                parentId: '0db19640-9e1f-4282-a070-f3ac878390bc',
                name: '菜单管理',
                code: 'menu-manage',
                path: '/system/menus',
                icon: 'menu',
                caption: '菜单管理',
                externalLink: null,
                component: 'MenuManage',
                customOrder: 1040,
                type: MenuPermissionType.MENU,
            },
        ],
    },
    {
        id: 'f5885a99-114d-4831-a140-e7bb8c6fc0c2',
        parentId: null,
        name: '内容管理',
        code: 'content',
        path: null,
        icon: 'article',
        caption: '内容管理',
        externalLink: null,
        component: null,
        customOrder: 2000,
        type: MenuPermissionType.MENU,
        children: [
            {
                id: '9ef7c2bb-07fd-4d6a-b0a0-8166952625a4',
                parentId: 'f5885a99-114d-4831-a140-e7bb8c6fc0c2',
                name: '文章管理',
                code: 'content-manage',
                path: '/content/posts',
                icon: 'description',
                caption: '文章管理',
                externalLink: null,
                component: 'PostManage',
                customOrder: 2010,
                type: MenuPermissionType.MENU,
            },
            {
                id: '40c34706-f001-41b8-80a4-c69e7bae5cb3',
                parentId: 'f5885a99-114d-4831-a140-e7bb8c6fc0c2',
                name: '分类管理',
                code: 'category-manage',
                path: '/content/categories',
                icon: 'category',
                caption: '分类管理',
                externalLink: null,
                component: 'CategoryManage',
                customOrder: 2020,
                type: MenuPermissionType.MENU,
            },
            {
                id: '4f886dc1-45b1-4c48-862d-f95e26573f1b',
                parentId: 'f5885a99-114d-4831-a140-e7bb8c6fc0c2',
                name: '标签管理',
                code: 'tag-manage',
                path: '/content/tags',
                icon: 'label',
                caption: '标签管理',
                externalLink: null,
                component: 'TagManage',
                customOrder: 2030,
                type: MenuPermissionType.MENU,
            },
            {
                id: '66bc0fd3-cf00-44f4-9f85-81d3777689b1',
                parentId: 'f5885a99-114d-4831-a140-e7bb8c6fc0c2',
                name: '评论管理',
                code: 'comment-manage',
                path: '/content/comments',
                icon: 'comment',
                caption: '评论管理',
                externalLink: null,
                component: 'CommentManage',
                customOrder: 2040,
                type: MenuPermissionType.MENU,
            },
        ],
    },
];

/**
 * 获取菜单树的Mock处理器
 */
export const getMenuTree = http.get(MenuApi.MenuTree, async () => {
    console.log('MSW intercepted menu tree request');

    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 500));

    return HttpResponse.json({
        status: ResultStats.SUCCESS,
        message: '获取菜单树成功',
        data: MOCK_MENU_TREE,
    });
});
