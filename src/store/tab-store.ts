import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { TabItem, TabStore } from '@/types/entity';

export const useTabStore = create<TabStore>()(
    persist(
        (set, get) => ({
            tabs: [
                {
                    key: 'Home',
                    title: '首页',
                    path: '/workbench',
                    closable: false,
                    component: 'Home',
                },
            ],
            activeKey: 'Home',
            reloadPath: null,
            addTab: (tab: TabItem) => {
                console.log('addTab', tab);
                set((state) => {
                    const idx = state.tabs.findIndex((item: TabItem) => item.key === tab.key);
                    if (idx > -1) {
                        const newTabs = [...state.tabs];
                        newTabs[idx] = { ...newTabs[idx], ...tab };
                        return {
                            ...state,
                            tabs: newTabs,
                            activeKey: tab.key,
                        };
                    } else {
                        return {
                            ...state,
                            tabs: [...state.tabs, tab],
                            activeKey: tab.key,
                        };
                    }
                });
            },
            setActiveTab: (key: string) => {
                set((state) => ({ ...state, activeKey: key }));
            },
            setReloadPath: (path: string | null) => {
                set((state) => ({ ...state, reloadPath: path }));
            },
            removeTab: (key: string) =>
                set((state) => {
                    const idx = state.tabs.findIndex((tab: TabItem) => tab.key === key);
                    if (idx === -1 || key === 'home') {
                        return state;
                    }
                    const newTabs = state.tabs.filter((_, index) => index !== idx);
                    const newActiveKey =
                        state.activeKey === key ? newTabs[Math.max(idx - 1, 0)]?.key || 'home' : state.activeKey;
                    return {
                        ...state,
                        tabs: newTabs,
                        activeKey: newActiveKey,
                    };
                }),
            updateTab: (key: string, update: Partial<TabItem>) =>
                set((state) => {
                    const tabIndex = state.tabs.findIndex((tab: TabItem) => tab.key === key);
                    if (tabIndex !== -1) {
                        const newTabs = [...state.tabs];
                        newTabs[tabIndex] = { ...newTabs[tabIndex], ...update };
                        return {
                            ...state,
                            tabs: newTabs,
                        };
                    }
                    return state;
                }),
            clearAllTabs: () => {
                set((state) => ({
                    ...state,
                    tabs: state.tabs.filter((tab: TabItem) => tab.key === 'home'),
                    activeKey: 'home',
                }));
            },
            clearOtherTabs: (key: string) => {
                set((state) => ({
                    ...state,
                    tabs: state.tabs.filter((tab: TabItem) => tab.key === 'home' || tab.key === key),
                    activeKey: key,
                }));
            },
            getActiveTab() {
                const tab = get().tabs.find((tab) => tab.key === get().activeKey);
                return tab || null;
            },
            getTabByKey: (key: string) => {
                const tab = get().tabs.find((tab) => tab.key === key);
                return tab || null;
            },
        }),
        {
            name: 'tab-store',
            partialize: (state) => ({
                tabs: state.tabs,
                activeKey: state.activeKey,
            }),
        },
    ),
);
