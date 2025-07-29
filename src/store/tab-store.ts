import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { TabItem, TabStore } from '@/types/entity';

export const useTabStore = create<TabStore>()(
    persist(
        immer((set, get) => ({
            tabs: [
                {
                    key: 'home',
                    title: '首页',
                    path: '/',
                    closable: false,
                    component: 'Home',
                },
            ],
            activeKey: 'home',
            reloadPath: null,
            addTab: (tab: TabItem) =>
                set((state) => {
                    const idx = state.tabs.findIndex((item: TabItem) => item.key === tab.key);
                    if (idx > -1) {
                        state.tabs[idx] = { ...state.tabs[idx], ...tab };
                    } else {
                        state.tabs.push(tab);
                    }
                    state.activeKey = tab.key;
                }),
            setActiveTab: (key: string) => {
                set((state) => (state.activeKey = key));
            },
            setReloadPath: (path: string | null) => {
                set((state) => (state.reloadPath = path));
            },
            removeTab: (key: string) =>
                set((state) => {
                    const idx = state.tabs.findIndex((tab: TabItem) => tab.key === key);
                    if (idx === -1 || key === 'home') {
                        return;
                    }
                    state.tabs.splice(idx, 1);
                    if (state.activeKey === key) {
                        state.activeKey = state.tabs[Math.max(idx - 1, 0)];
                    }
                }),
            updateTab: (key: string, update: Partial<TabItem>) =>
                set((state) => {
                    const tab = state.tabs.filter((tab: TabItem) => tab.key === key);
                    if (tab) {
                        Object.assign(tab, update);
                    }
                }),
            clearAllTabs: () => {
                set((state) => {
                    state.tabs = state.tabs.filter((tab: TabItem) => tab.key === 'home');
                    state.activeKey = 'home';
                });
            },
            clearOtherTabs: (key: string) => {
                set((state) => {
                    state.tabs = state.tabs.filter((tab: TabItem) => tab.key === 'home' || tab.key === key);
                    state.activeKey = key;
                });
            },
            getActiveTab() {
                const tab = get().tabs.find((tab) => tab.key === get().activeKey);
                return tab || null;
            },
            getTabByKey: (key: string) => {
                const tab = get().tabs.find((tab) => tab.key === key);
                return tab || null;
            },
        })),
        {
            name: 'tab-store',
            partialize: (state) => ({
                tabs: state.tabs,
                activeKey: state.activeKey,
            }),
        },
    ),
);
