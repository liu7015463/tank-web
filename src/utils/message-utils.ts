/**
 * 全局消息工具类
 * 用于在非React组件中显示消息
 */
class MessageUtils {
    private static instance: MessageUtils;
    private messageApi: any = null;

    private constructor() {}

    public static getInstance(): MessageUtils {
        if (!MessageUtils.instance) {
            MessageUtils.instance = new MessageUtils();
        }
        return MessageUtils.instance;
    }

    /**
     * 设置消息API实例
     * 应该在App组件中调用
     */
    public setMessageApi(messageApi: any) {
        this.messageApi = messageApi;
    }

    /**
     * 显示成功消息
     */
    public success(content: string) {
        if (this.messageApi) {
            this.messageApi.success(content);
        } else {
            console.log('Success:', content);
        }
    }

    /**
     * 显示错误消息
     */
    public error(content: string) {
        if (this.messageApi) {
            this.messageApi.error(content);
        } else {
            console.error('Error:', content);
        }
    }

    /**
     * 显示警告消息
     */
    public warning(content: string) {
        if (this.messageApi) {
            this.messageApi.warning(content);
        } else {
            console.warn('Warning:', content);
        }
    }

    /**
     * 显示信息消息
     */
    public info(content: string) {
        if (this.messageApi) {
            this.messageApi.info(content);
        } else {
            console.info('Info:', content);
        }
    }
}

export const messageUtils = MessageUtils.getInstance();
