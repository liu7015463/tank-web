import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from 'axios';

import type { Result } from '@/types/api';

import { useUserActions, useUserToken } from '@/store/user-store';
import { ResultStats } from '@/types/enum';

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${useUserToken().accessToken}`;
        return config;
    },
    (err) => Promise.reject(err),
);

axiosInstance.interceptors.response.use(
    (res: AxiosResponse<Result<any>>) => {
        console.log('res', res);
        if (!res.data) {
            throw new Error('请求出错，请稍候重试');
        }
        const { status, data } = res;
        if (status === ResultStats.SUCCESS || status === 200 || status === 201) {
            return data as any;
        }
        throw new Error('请求出错，请稍候重试');
    },
    (error: AxiosError<Result<any>>) => {
        const { response, message } = error || {};
        const errMsg = response?.data?.message || message || '操作失败,系统异常!';
        console.error(errMsg);
        if (response?.status === 401) {
            useUserActions().clearUserInfoAndToken();
        }
        return Promise.reject(error);
    },
);

class APIClient {
    request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
        return axiosInstance.request<any, T>(config);
    }
    get<T = unknown>(config: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'get' });
    }

    post<T = unknown>(config: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'post' });
    }
}

export default new APIClient();
