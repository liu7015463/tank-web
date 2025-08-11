import { useQuery } from '@tanstack/react-query';

import userService from '@/api/services/user-service';

export const useUserList = () => {
    const query = useQuery({
        queryKey: ['userList'],
        queryFn: () => userService.userList({ current: 1, pageSize: 10 }),
        staleTime: 5 * 60 * 1000, // 5分钟内数据被认为是新鲜的
        gcTime: 10 * 60 * 1000, // 10分钟后清理缓存
        retry: 3, // 失败时重试3次
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 指数退避重试
    });

    console.log(query.data);

    return {
        data: query.data,
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
