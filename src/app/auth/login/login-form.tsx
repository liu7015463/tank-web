import type { FormProps } from 'antd';

import { Button, Checkbox, Form, Input } from 'antd';
import { isEmpty, isNil } from 'lodash';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { SignInReq } from '@/types/auth';

import { useSignIn } from '@/store/user-store';

import { userNameStore } from '../../../store/uaername-store';

interface FieldType {
    username?: string;
    password?: string;
    remember?: boolean;
}
export default function LoginForm() {
    const signin = useSignIn();
    const router = useRouter();
    const { username, setUsername } = userNameStore();
    const initRem = !isNil(username) && !isEmpty(username);
    const [remember, setRemember] = useState<boolean>(initRem);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        if (remember) {
            if (values.username) {
                setUsername(values.username);
            }
        } else {
            setUsername('');
        }
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
                initialValues={{ remember, username: username || '' }}
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
                    <Checkbox
                        onChange={() => {
                            setRemember(!remember);
                        }}
                    >
                        Remember me
                    </Checkbox>
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
