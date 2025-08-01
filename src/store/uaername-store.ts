import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserNameStore {
    username: string;
    setUsername: (username: string) => void;
}

export const userNameStore = create<UserNameStore>()(
    persist(
        (set) => ({
            username: '',
            setUsername: (username: string) => {
                console.log('setUsername', username);
                set({ username });
            },
        }),
        { name: 'username-store' },
    ),
);
