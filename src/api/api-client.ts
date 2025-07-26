import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from 'axios';

import type { Result } from '@/types/api';

import userStore from '@/store/user-store';
import { ResultStats } from '@/types/enum';

const axiosInstance = axios.create({
    baseURL: '',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer Token`;
        return config;
    },
    (err) => Promise.reject(err),
);

axiosInstance.interceptors.response.use(
    (res: AxiosResponse<Result<any>>) => {
        if (!res.data) {
            throw new Error('请求出错，请稍候重试');
        }
        const { status, message, data } = res.data;
        if (status !== ResultStats.SUCCESS) {
            throw new Error(message || '请求出错，请稍候重试');
        }
        return data;
    },
    (error: AxiosError<Result<any>>) => {
        const { response, message } = error || {};
        const errMsg = response?.data?.message || message || '操作失败,系统异常!';
        console.error(errMsg);
        if (response?.status === 401) {
            userStore.getState().actions.clearUserInfoAndToken();
        }
        Promise.reject(error);
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
