export enum BasicStatus {
    DISABLED = 0,
    ENABLED = 1,
}

export enum ResultStats {
    SUCCESS = 0,
    FAIL = 1,
    ERROR = -1,
    TIMEOUT = 401,
}

/**
 * 菜单权限类型枚举
 */
export enum MenuPermissionType {
    /** 分组 */
    GROUP = 0,
    /** 目录  */
    CATALOGUE = 1,
    /** 菜单 */
    MENU = 2,
    /** 页面 */
    COMPONENT = 3,
    /** 功能 */
    FUNCTION = 4,
    /** 按钮 */
    BUTTON = 5,
}

export enum StorageEnum {
    UserInfo = 'userInfo',
    UserToken = 'userToken',
    Settings = 'settings',
    I18N = 'i18nextLng',
}

export enum UserApi {
    SignIn = '/api/user/account/login',
    Logout = '/api/user/logout',
}

export enum MenuApi {
    MenuTree = '/api/v1/rbac/menus/tree',
}
