import type { IconProps as IconifyIconProps } from '@iconify/react';
import type { CSSProperties } from 'react';

import { Icon as IconifyIcon } from '@iconify/react';

import { mergeClassname } from '@/utils';

interface IconProps extends IconifyIconProps {
    icon: string;
    size?: number | string;
    color?: string;
    style?: CSSProperties;
    className?: string;
}

/**
 * Icon组件 - 基于Iconify的图标组件封装
 *
 * @param icon - 图标名称或图标对象，用于指定要显示的图标
 * @param size - 图标尺寸，默认为'1em'，可以是任何CSS有效的长度单位
 * @param className - 自定义CSS类名，会与默认的inline-block类名合并
 * @param style - 自定义内联样式对象，会与默认样式合并
 * @param color - 图标颜色，会应用到style.color上
 * @param props - 其他传递给IconifyIcon组件的属性
 * @returns 返回一个封装好的IconifyIcon组件实例
 */
export default function Icon({ icon, size = '1em', className = '', style, color, ...props }: IconProps) {
    return (
        <IconifyIcon
            icon={icon}
            width={size}
            height={size}
            style={{
                color,
                height: size,
                width: size,
                ...style,
            }}
            className={mergeClassname('inline-block', className)}
            {...props}
        />
    );
}
