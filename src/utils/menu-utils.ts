import type { ItemType } from 'antd/es/menu/interface';
import type { CSSProperties } from 'react';

import React from 'react';

import type { MenuTree } from '@/types/entity';

import Icon from '@/components/icon/icon';
import { MenuPermissionType } from '@/types/enum';

/**
 * 菜单项样式
 */
const menuItemStyle: CSSProperties = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

/**
 * 将API返回的菜单树数据转换为Antd Menu组件所需的ItemType格式
 * @param menuTree 菜单树数据
 * @returns ItemType[] Antd Menu组件所需的菜单项数组
 */
export const transformMenuTreeToAntdItems = (menuTree: MenuTree[]): ItemType[] => {
    return menuTree
        .filter((menu) => menu.type !== MenuPermissionType.BUTTON)
        .sort((a, b) => (a.customOrder || 0) - (b.customOrder || 0))
        .map((menu) => transformMenuToAntdItem(menu));
};

/**
 * 将单个菜单项转换为Antd Menu ItemType
 * @param menu 菜单项
 * @returns ItemType Antd Menu组件所需的菜单项
 */
const transformMenuToAntdItem = (menu: MenuTree): ItemType => {
    const item: any = {
        key: menu.code || menu.id,
        label: menu.caption || menu.name,
        style: menuItemStyle,
    };

    // 添加图标
    if (menu.icon) {
        item.icon = React.createElement(Icon, { icon: menu.icon, size: 28 });
    }

    // 处理子菜单
    if (menu.children && menu.children.length > 0) {
        item.children = transformMenuTreeToAntdItems(menu.children);
    }

    return item as ItemType;
};

/**
 * 查找菜单项的所有父级菜单路径
 * @param targetKey 目标菜单项的key
 * @param menuItems 菜单项数组
 * @param parentPath 父级路径
 * @returns string[] 父级菜单key数组
 */
export const findParentKeys = (targetKey: string, menuItems: ItemType[], parentPath: string[] = []): string[] => {
    for (const item of menuItems) {
        if (item && typeof item === 'object' && 'children' in item && item.children) {
            const currentPath = [...parentPath, item.key as string];

            // 检查直接子项
            const hasDirectChild = item.children.some(
                (child) => child && typeof child === 'object' && 'key' in child && child.key === targetKey,
            );
            if (hasDirectChild) {
                return currentPath;
            }

            // 递归检查嵌套子项
            const nestedPath = findParentKeys(targetKey, item.children as ItemType[], currentPath);
            if (nestedPath.length > 0) {
                return nestedPath;
            }
        }
    }
    return [];
};

/**
 * 从菜单树中查找指定code的菜单项
 * @param menuTree 菜单树
 * @param code 菜单code
 * @returns MenuTree | null 找到的菜单项或null
 */
export const findMenuByCode = (menuTree: MenuTree[], code: string): MenuTree | null => {
    for (const menu of menuTree) {
        if (menu.code === code) {
            return menu;
        }
        if (menu.children && menu.children.length > 0) {
            const found = findMenuByCode(menu.children, code);
            if (found) {
                return found;
            }
        }
    }
    return null;
};
