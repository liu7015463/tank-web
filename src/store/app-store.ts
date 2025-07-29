import { create } from 'zustand';

interface AppState {
    theme: string;
    currentTab: string;
    collapsed: boolean;
    menuMode: 'horizontal' | 'vertical';
    setTheme: (theme: string) => void;
    setCurrentTab: (tab: string) => void;
    setCollapsed: (collapsed: boolean) => void;
    setMenuMode: (mode: 'horizontal' | 'vertical') => void;
}

export const useAppStore = create<AppState>()((set) => ({
    theme: 'dark',
    currentTab: 'home',
    collapsed: false,
    menuMode: 'horizontal',
    setTheme: (theme) => set({ theme }),
    setCurrentTab: (tab) => set({ currentTab: tab }),
    setCollapsed: (collapsed) => set({ collapsed }),
    setMenuMode: (menuMode) => set({ menuMode }),
}));
