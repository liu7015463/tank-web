import type { BasicStatus, MenuPermissionType } from './enum';

export interface UserToken {
    accessToken?: string;
    refreshToken?: string;
}

export interface UserInfo {
    id: string;
    email: string;
    username: string;
    password?: string;
    avatar?: string;
    roles?: Role[];
    status?: BasicStatus;
    permissions?: Permission[];
    menu?: MenuTree[];
}

export interface PagaginateResult<T> {
    items: T[];
    meta: {
        currentPage: number;
        itemCount: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
    };
}

export interface Paginate {
    current: number;
    pageSize: number;
}

export interface CommonOptions {
    status?: BasicStatus;
    desc?: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface User extends CommonOptions {
    id: string; // uuid
    username: string;
    password: string;
    email: string;
    phone?: string;
    avatar?: string;
}

export interface Role extends CommonOptions {
    id: string; // uuid
    name: string;
    code: string;
}

export interface Permission extends CommonOptions {
    id: string; // uuid
    name: string;
    code: string; // resource:action  example: "user-management:read"
}

export interface Menu extends CommonOptions {
    id: string; // uuid
    parentId: string | null;
    name: string;
    code: string;
    path: string | null;
    icon: string | null;
    caption: string | null;
    externalLink: string | null;
    component: string | null;
    customOrder: number;
    type: MenuPermissionType;
}

export type MenuTree = Menu & {
    children?: MenuTree[];
};

export interface User extends CommonOptions {
    id: string; // uuid
    username: string;
    password: string;
    email: string;
    phone?: string;
    avatar?: string;
}

export type RecordAny<T = any> = Record<string, T>;

export interface RouteConfig {
    path: string;
    name: string;
    key: string;
    component: string; // 组件标识符
    icon?: string;
    children?: RouteConfig[];
}

export interface TabItem {
    key: string;
    title: string;
    path: string;
    closable: boolean;
    component?: string;
}

export interface TabStore {
    tabs: TabItem[];
    activeKey: string;
    reloadPath: string | null;

    addTab: (tab: TabItem) => void;
    removeTab: (tabKey: string) => void;
    setActiveTab: (key: string) => void;
    updateTab: (key: string, tab: Partial<TabItem>) => void;
    setReloadPath: (path: string | null) => void;
    clearAllTabs: () => void;
    clearOtherTabs: (tabKey: string) => void;

    getActiveTab: () => TabItem | null;
    getTabByKey: (key: string) => TabItem | null;
}

export interface TabContentProps {
    component: string;
    path: string;
    tabKey: string;
}
