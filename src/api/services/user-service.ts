import type { SignInReq, SignInRes } from '@/types/auth';

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

export default { signin, logout };
