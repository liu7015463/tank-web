import { App } from 'antd';

/**
 * 全局消息Hook
 * 使用Antd的App组件提供的message实例，避免在渲染过程中调用静态方法
 * 这样可以解决React 18并发模式下的警告问题
 */
export const useGlobalMessage = () => {
    const { message } = App.useApp();
    return message;
};

/**
 * 全局通知Hook
 */
export const useGlobalNotification = () => {
    const { notification } = App.useApp();
    return notification;
};

/**
 * 全局Modal Hook
 */
export const useGlobalModal = () => {
    const { modal } = App.useApp();
    return modal;
};
