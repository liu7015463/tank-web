import { create } from 'zustand';

interface AppState {
    theme: string;
    collapsed: boolean;
    menuMode: 'horizontal' | 'vertical';
    setTheme: (theme: string) => void;
    setCollapsed: (collapsed: boolean) => void;
    setMenuMode: (mode: 'horizontal' | 'vertical') => void;
}

export const useAppStore = create<AppState>()((set) => ({
    theme: 'dark',
    collapsed: false,
    menuMode: 'horizontal',
    setTheme: (theme) => set({ theme }),
    setCollapsed: (collapsed) => set({ collapsed }),
    setMenuMode: (menuMode) => set({ menuMode }),
}));
