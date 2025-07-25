'use client';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { UserInfo, UserToken } from '@/types/entity';

interface UserStore {
    userInfo: Partial<UserInfo>;
    userToken: UserToken;
    actions: {
        setUserInfo: (userInfo: UserInfo) => void;
        setUserToken: (userToken: UserToken) => void;
        clearUserInfoAndToken: () => void;
    };
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            userInfo: {},
            userToken: {},
            actions: {
                setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
                setUserToken: (userToken: UserToken) => set({ userToken }),
                clearUserInfoAndToken: () => set({ userInfo: {}, userToken: {} }),
            },
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                userInfo: state.userInfo,
                userToken: state.userToken,
            }),
        },
    ),
);

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserActions = () => useUserStore((state) => state.actions);

export default useUserStore;
