import type { FormProps } from 'antd';

import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';

import type { SignInReq } from '@/types/auth';

import { useSignIn } from '@/store/user-store';

interface FieldType {
    username?: string;
    password?: string;
    remember?: boolean;
}
export default function LoginForm() {
    const signin = useSignIn();
    const router = useRouter();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            console.log('Success:', values);
            await signin(values as SignInReq);
            router.push('/workbench');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    return (
        <div className="flex w-full flex-col items-center justify-center gap-5">
            <Form
                name="login"
                style={{ maxWidth: 600 }}
                autoComplete="off"
                initialValues={{ remember: true }}
                labelCol={{ span: 8 }}
                onFinish={onFinish}
            >
                <Form.Item<FieldType>
                    name="username"
                    label="用户名"
                    labelCol={{ span: 8 }}
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input placeholder="用户名" />
                </Form.Item>
                <Form.Item<FieldType> name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
                    <Input.Password placeholder="密码" />
                </Form.Item>
                <Form.Item<FieldType> valuePropName="checked" name="remember" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
