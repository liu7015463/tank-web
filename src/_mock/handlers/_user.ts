import { faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';

import { ResultStats, UserApi } from '@/types/enum';

import { USERS } from '../assets';

const signIn = http.post(`${UserApi.SignIn}`, async ({ request }) => {
    const { username, password } = (await request.json()) as Record<string, string>;
    const user = USERS.find((item) => item.username === username);
    if (!user || user.password !== password) {
        return HttpResponse.json({
            status: 10001,
            message: 'Incorrect username or password.',
        });
    }
    // delete password
    const { password: _, ...userWithoutPassword } = user;
    return HttpResponse.json({
        status: ResultStats.SUCCESS,
        message: '',
        data: {
            user: { ...userWithoutPassword },
            accessToken: faker.string.uuid(),
            refreshToken: faker.string.uuid(),
        },
    });
});

export { signIn };
