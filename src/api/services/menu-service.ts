import type { MenuTree } from '@/types/entity';

import { MenuApi } from '@/types/enum';

import apiClient from '../api-client';

/**
 * 获取菜单树数据
 * @returns Promise<MenuTree[]> 菜单树数组
 */
const getMenuTree = () =>
    apiClient.get<MenuTree[]>({
        url: MenuApi.MenuTree,
    });

export default { getMenuTree };
