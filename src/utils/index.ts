import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { isArray } from 'lodash';
import { twMerge } from 'tailwind-merge';

import type { RecordAny } from '@/types/entity';

import { preDefinedRoutes as routes } from '@/_mock/assets';
/**
 * 合并多个类名值为一个字符串
 *
 * @param inputs - 类名值数组，可以是字符串、对象或数组等形式的类名
 * @returns 合并后的类名字符串，相同类名会进行去重合并
 */
export function mergeClassname(...inputs: ClassValue[]) {
    // 使用clsx处理类名值数组，然后通过twMerge进行合并和优化
    return twMerge(clsx(inputs));
}

/**
 * join url parts
 * @example
 * urlJoin('/admin/', '/api/', '/user/') // '/admin/api/user'
 * urlJoin('/admin', 'api', 'user/')     // '/admin/api/user'
 * urlJoin('/admin/', '', '/user/')      // '/admin/user'
 */
export const urlJoin = (...parts: string[]) => {
    const result = parts
        .map((part) => {
            return part.replace(/^\/+|\/+$/g, ''); // 去除两边/
        })
        .filter(Boolean);
    return `/${result.join('/')}`;
};

/**
 * 扁平化路由数组，将嵌套的路由结构展开为一维数组
 * @param arr - 路由数组，可能包含嵌套的 routes 属性
 * @returns 扁平化后的路由数组
 */
export const flattenRoutes = (arr: RecordAny<unknown>[]): RecordAny<unknown>[] => {
    // 边界情况处理
    if (!arr || !isArray(arr)) {
        return [];
    }

    return arr.reduce<RecordAny<unknown>[]>((pre, item) => {
        // 如果当前项有子路由，递归处理子路由
        if (isArray(item.routes)) {
            // 添加当前项（父级路由）
            pre.push(item);
            // 递归展开子路由并合并到结果中
            return pre.concat(flattenRoutes(item.routes));
        }

        // 如果没有子路由，直接添加当前项
        pre.push(item);
        return pre;
    }, []);
};

export function getKeyName(path: string = '/403') {
    const truePath = path.split('?')[0];
    const curRoute = flattenRoutes(routes).filter((item: RecordAny<unknown>) => {
        // Type guard to ensure item has path property
        if (typeof item.path === 'string') {
            return item.path.includes(truePath);
        }
        if (isArray(item.path)) {
            return item.path.some((p: string) => p.includes(truePath));
        }
        return false;
    });

    if (!curRoute[0]) return { title: '暂无权限', tabKey: '403', component: null };
    const { name, key, component } = curRoute[0];
    return { title: name, tabKey: key, component };
}
