import type { UserInfo, UserToken } from './entity';

export interface SignInReq {
    username: string;
    password: string;
}

export type SignInRes = UserToken & {
    userInfo: UserInfo;
};
