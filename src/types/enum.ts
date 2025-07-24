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

export enum PermissionType {
    GROUP = 0,
    CATALOGUE = 1,
    MENU = 2,
    COMPONENT = 3,
}

export enum StorageEnum {
    UserInfo = 'userInfo',
    UserToken = 'userToken',
    Settings = 'settings',
    I18N = 'i18nextLng',
}
