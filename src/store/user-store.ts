'use client';
import { useMutation } from '@tanstack/react-query';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { SignInReq } from '@/types/auth';
import type { UserInfo, UserToken } from '@/types/entity';

import userService from '@/api/services/user-service';

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

export const useSignIn = () => {
    const { setUserToken, setUserInfo } = useUserActions();
    const signInMutation = useMutation({
        mutationFn: userService.signin,
    });

    const signin = async (data: SignInReq) => {
        try {
            const res = await signInMutation.mutateAsync(data);
            const { userInfo, accessToken, refreshToken } = res;
            setUserToken({ accessToken, refreshToken });
            setUserInfo(userInfo);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
    return signin;
};
export default useUserStore;
