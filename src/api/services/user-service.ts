import type { SignInReq, SignInRes } from '@/types/auth';
import type { PagaginateResult, Paginate, UserInfo } from '@/types/entity';

import { UserApi } from '@/types/enum';

import apiClient from '../api-client';

const signin = (data: SignInReq) =>
    apiClient.post<SignInRes>({
        url: UserApi.SignIn,
        data: {
            credential: data.username,
            password: data.password,
        },
    });

const logout = () =>
    apiClient.get({
        url: UserApi.Logout,
    });

const userList = ({ current, pageSize }: Paginate) => {
    console.log('current:', current, 'pageSize:', pageSize);
    return apiClient.get<PagaginateResult<UserInfo>>({
        url: UserApi.UserList,
        params: {
            page: current,
            limit: pageSize,
        },
    });
};

export default { signin, logout, userList };
