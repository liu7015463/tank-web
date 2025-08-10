import { useQuery } from '@tanstack/react-query';

import type { MenuTree } from '@/types/entity';

import menuService from '@/api/services/menu-service';
import { transformMenuTreeToAntdItems } from '@/utils/menu-utils';

/**
 * 菜单数据查询的查询键
 */
export const MENU_QUERY_KEY = ['menu', 'tree'] as const;

/**
 * 使用React Query管理菜单数据的Hook
 * @returns 菜单数据查询结果，包括原始菜单树、转换后的Antd菜单项、加载状态等
 */
export const useMenu = () => {
    const query = useQuery({
        queryKey: MENU_QUERY_KEY,
        queryFn: menuService.getMenuTree,
        staleTime: 5 * 60 * 1000, // 5分钟内数据被认为是新鲜的
        gcTime: 10 * 60 * 1000, // 10分钟后清理缓存
        retry: 3, // 失败时重试3次
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 指数退避重试
    });

    // 转换菜单数据为Antd Menu组件所需格式
    const menuItems = query.data ? transformMenuTreeToAntdItems(query.data) : [];

    return {
        // 原始菜单树数据
        menuTree: query.data as MenuTree[] | undefined,
        // 转换后的Antd菜单项
        menuItems,
        // 查询状态
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        // 查询方法
        refetch: query.refetch,
        // 是否正在重新获取
        isFetching: query.isFetching,
    };
};

/**
 * 预加载菜单数据的Hook
 * 可以在应用启动时调用，提前加载菜单数据
 */
export const usePrefetchMenu = () => {
    // 这里可以添加预加载逻辑
    // 例如在用户登录成功后立即预加载菜单数据
};
