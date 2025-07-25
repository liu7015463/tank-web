import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
