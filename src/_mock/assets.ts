import { faker } from '@faker-js/faker';

import type { User } from '@/types/entity';

export const USERS: User[] = [
    {
        id: 'user_admin_id',
        username: 'admin',
        password: 'demo1234',
        avatar: faker.image.avatarGitHub(),
        email: 'admin@slash.com',
    },
    {
        id: 'user_test_id',
        username: 'test',
        password: 'demo1234',
        avatar: faker.image.avatarGitHub(),
        email: 'test@slash.com',
    },
    {
        id: 'user_guest_id',
        username: 'guest',
        password: 'demo1234',
        avatar: faker.image.avatarGitHub(),
        email: 'guest@slash.com',
    },
];
