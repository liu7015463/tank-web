import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { TabItem, TabStore } from '@/types/entity';

export const useTabStore = create<TabStore>()(
    immer((set, get) => ({
        tabs: [
            {
                key: 'Home',
                title: '首页-1',
                path: '/workbench',
                closable: false,
                component: 'Home',
            },
        ],
        activeKey: 'Home',
        reloadPath: null,
        addTab: (tab: TabItem) => {
            set((state) => {
                const idx = state.tabs.findIndex((item: TabItem) => item.key === tab.key);
                if (idx > -1) {
                    state.tabs[idx] = { ...state.tabs[idx], ...tab };
                } else {
                    state.tabs.push(tab);
                }
                state.activeKey = tab.key;
            });
        },
        setActiveTab: (key: string) => {
            set((state) => {
                state.activeKey = key;
            });
        },
        setReloadPath: (path: string | null) => {
            set((state) => {
                state.reloadPath = path;
            });
        },
        removeTab: (key: string) =>
            set((state) => {
                const idx = state.tabs.findIndex((tab: TabItem) => tab.key === key);
                if (idx === -1 || key === 'Home') {
                    return;
                }
                state.tabs.splice(idx, 1);
                if (state.activeKey === key) {
                    state.activeKey = state.tabs[Math.max(idx - 1, 0)]?.key || 'Home';
                }
            }),
        updateTab: (key: string, update: Partial<TabItem>) =>
            set((state) => {
                const tab = state.tabs.find((tab: TabItem) => tab.key === key);
                if (tab) {
                    Object.assign(tab, update);
                }
            }),
        clearAllTabs: () => {
            set((state) => {
                state.tabs = state.tabs.filter((tab: TabItem) => tab.key === 'Home');
                state.activeKey = 'Home';
            });
        },
        clearOtherTabs: (key: string) => {
            set((state) => {
                state.tabs = state.tabs.filter((tab: TabItem) => tab.key === 'Home' || tab.key === key);
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
);
