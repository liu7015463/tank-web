import { faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';

import { ResultStats, UserApi } from '@/types/enum';

import { USERS } from '../assets';

const signIn = http.post(`${UserApi.SignIn}`, async ({ request }) => {
    console.log('MSW intercepted signin request:', request.url);
    const { username, password } = (await request.json()) as Record<string, string>;
    console.log('Login attempt:', { username, password });

    const user = USERS.find((item) => item.username === username);
    if (!user || user.password !== password) {
        return HttpResponse.json({
            status: 10001,
            message: 'Incorrect username or password.',
        });
    }

    // delete password
    const { password: _, ...userWithoutPassword } = user;
    const response = {
        status: ResultStats.SUCCESS,
        message: '',
        data: {
            userInfo: { ...userWithoutPassword },
            accessToken: faker.string.uuid(),
            refreshToken: faker.string.uuid(),
        },
    };

    console.log('MSW returning response:', response);
    return HttpResponse.json(response);
});

export { signIn };
