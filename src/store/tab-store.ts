import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { TabItem, TabStore } from '@/types/entity';

// 简化的开发环境解决方案
const getStorageName = () => {
    if (process.env.NODE_ENV === 'development') {
        // 服务端渲染时返回临时名称
        if (typeof window === 'undefined') {
            return 'tab-store-dev-ssr';
        }

        // 客户端：清理旧数据并生成新的存储名称
        const DEV_SESSION_KEY = 'tab-store-dev-session';
        const CLEAN_FLAG_KEY = 'tab-store-cleaned';

        // 获取或生成会话ID
        let sessionId = window.sessionStorage.getItem(DEV_SESSION_KEY);
        if (!sessionId) {
            sessionId = Date.now().toString();
            window.sessionStorage.setItem(DEV_SESSION_KEY, sessionId);

            // 新会话：清理所有旧的 tab-store 数据
            const keysToRemove: string[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('tab-store')) {
                    keysToRemove.push(key);
                }
            }
            if (keysToRemove.length > 0) {
                console.log('🧹 [DEV] 清理旧的 tab-store 数据:', keysToRemove);
                keysToRemove.forEach((key) => localStorage.removeItem(key));
            }

            // 标记已清理
            window.sessionStorage.setItem(CLEAN_FLAG_KEY, 'true');
            console.log('🆕 [DEV] 新开发会话，会话ID:', sessionId);
        } else {
            console.log('♻️ [DEV] 继续现有会话，会话ID:', sessionId);
        }

        const storageName = `tab-store-dev-${sessionId}`;
        console.log('🔧 [DEV] 使用开发环境存储名称:', storageName);
        return storageName;
    }

    console.log('🚀 [PROD] 使用生产环境存储名称: tab-store');
    return 'tab-store';
};

export const useTabStore = create<TabStore>()(
    persist(
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
            // 清除持久化数据的方法（用于调试）
            clearPersistedData: () => {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('tab-store');
                    window.location.reload();
                }
            },
        })),
        {
            name: getStorageName(),
            version: 1, // 生产环境版本号
            partialize: (state) => ({
                tabs: state.tabs,
                activeKey: state.activeKey,
            }),
        },
    ),
);
