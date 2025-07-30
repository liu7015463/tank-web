import type { RouteConfig } from '@/types/entity';

export const routes: RouteConfig[] = [
    {
        path: '/workbench',
        name: '首页',
        key: 'Home',
        component: 'Home',
        icon: 'HomeOutlined',
    },
    {
        path: '/workbench',
        name: '仪表盘',
        key: 'Dashboard',
        component: 'Dashboard',
        icon: 'DashboardOutlined',
    },
    {
        path: '/workbench',
        name: '用户管理',
        key: 'UserList',
        component: 'UserList',
        icon: 'UserOutlined',
    },
    {
        path: '/workbench',
        name: '用户详情',
        key: 'UserDetail',
        component: 'UserDetail',
    },
];

export const getRouteConfig = (path: string): RouteConfig | null => {
    const matchRoute = (route: RouteConfig, path: string): boolean => {
        return route.path === path;
    };

    const findRoute = (routes: RouteConfig[], path: string): RouteConfig | null => {
        for (const route of routes) {
            if (matchRoute(route, path)) {
                return route;
            }
            if (route.children) {
                const childRoute = findRoute(route.children, path);
                if (childRoute) {
                    return childRoute;
                }
            }
        }
        return null;
    };
    return findRoute(routes, path);
};

export const getRouteConfigByKey = (key: string): RouteConfig | null => {
    const findRouteByKey = (routes: RouteConfig[], key: string): RouteConfig | null => {
        for (const route of routes) {
            if (key === route.key) {
                return route;
            }
            if (route.children) {
                const childRoute = findRouteByKey(route.children, key);
                if (childRoute) {
                    return childRoute;
                }
            }
        }
        return null;
    };
    return findRouteByKey(routes, key);
};

export const generateTabTitle = (route: RouteConfig, path: string): string => {
    return route.name || route.key || path;
};
