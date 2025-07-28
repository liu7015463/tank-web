import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TabStat {
    curTab: string[];
    reloadPath: string;
    setTabs: (tabs: string[]) => void;
    setReloadPath: (path: string) => void;
    addTab: (tab: string) => void;
    removeTab: (tab: string) => void;
}

export const useTabStore = create<TabStat>()(
    persist(
        (set, get) => ({
            curTab: ['/'],
            reloadPath: '',
            setTabs: (tabs) => set({ curTab: tabs }),
            setReloadPath: (path) => set({ reloadPath: path }),
            addTab: (tab) => {
                const { curTab } = get();
                if (!curTab.includes(tab)) {
                    set({ curTab: [...curTab, tab] });
                }
            },
            removeTab: (tab) => {
                const { curTab } = get();
                set({ curTab: curTab.filter((item) => item !== tab) });
            },
        }),
        { name: 'tab-store' },
    ),
);
