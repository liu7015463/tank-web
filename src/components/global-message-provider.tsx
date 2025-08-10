'use client';

import { App } from 'antd';
import { useEffect } from 'react';

import { messageUtils } from '@/utils/message-utils';

interface GlobalMessageProviderProps {
    children: React.ReactNode;
}

/**
 * 全局消息提供者组件
 * 用于初始化全局消息API，使得在非React组件中也能使用消息功能
 */
export default function GlobalMessageProvider({ children }: GlobalMessageProviderProps) {
    const { message } = App.useApp();

    useEffect(() => {
        // 将消息API实例设置到全局工具类中
        messageUtils.setMessageApi(message);
    }, [message]);

    return <>{children}</>;
}
