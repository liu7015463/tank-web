import Link from 'next/link';

import { mergeClassname } from '@/utils';

import { Icon } from '../icon';

interface Props {
    size?: string | number;
    className?: string;
}

/**
 * Logo组件用于显示网站Logo图标
 * @param size - Logo图标的大小，默认为50
 * @param className - 自定义CSS类名，用于样式定制
 * @returns 返回一个包含Logo图标的链接组件
 */
export default function Logo({ size = 50, className }: Props) {
    // 创建一个指向首页的链接，并应用合并后的CSS类名
    return (
        <Link href="/" className={mergeClassname(className)}>
            <Icon icon="noto:blowfish" size={size} color="#FDA92D" />
        </Link>
    );
}
