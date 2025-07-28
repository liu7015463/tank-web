import type { FC } from 'react';

import { Alert, Dropdown, Menu, Tabs } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useTabStore } from '@/store/tab-store';
import { getKeyName } from '@/utils';

const { TabPane } = Tabs;

const initPane = [{ title: '首页', key: 'home', content: 'home', closable: false, path: '/' }];

interface Props {
    defaultActiveKey: string;
    panesItem: {
        title: string;
        content: string;
        key: string;
        closable: boolean;
        path: string;
    };
    tabActiveKey: string;
}

const TabPanes: FC<Props> = (props) => {
    const curTab = useTabStore((state) => state.curTab);
    const reloadPath = useTabStore((state) => state.reloadPath);
    const setTabs = useTabStore((state) => state.setTabs);
    const setReloadPath = useTabStore((state) => state.setReloadPath);

    const [activeKey, setActiveKey] = useState<string>('');
    const [panes, setPanes] = useState(initPane);
    const [isReload, setIsReload] = useState(false);
    const [selectedPane, setSelectedPane] = useState(initPane[0]);
    const pathRef = useRef('');

    const { defaultActiveKey, panesItem, tabActiveKey } = props;

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const search = searchParams.toString();

    const fullPath = pathname + (search ? `?${search}` : '');

    // 记录当前打开的tab
    const storeTabs = useCallback(
        (p: any): void => {
            const pathArr = p.map((item: any) => item.path);
            setTabs(pathArr);
        },
        [setTabs],
    );

    // 从本地存储中恢复已打开的tab列表
    const resetTabs = useCallback((): void => {
        const initPanes = curTab.reduce((acc: any, cur: any) => {
            const { title, tabKey, component } = getKeyName(cur.path);
            return [...acc, { title, key: tabKey, component, closable: tabKey !== 'home', path: cur.path }];
        }, []);
        const { tabKey } = getKeyName(pathname);
        setTabs(initPanes);
        setActiveKey(tabKey as string);
    }, [curTab, pathname]);

    // 初始化页面
    useEffect(() => {
        resetTabs();
    }, [resetTabs]);

    // tab切换
    const onChange = (key: string): void => {
        setActiveKey(key);
    };

    const remove = (key: string): void => {
        const delIndex = panes.findIndex((item) => item.key === key);
        panes.slice(delIndex, 1);

        // 删除非当前tab
        if (key !== activeKey) {
            const next = activeKey;
            setPanes(panes);
            setActiveKey(next);
            storeTabs(panes);
            return;
        }
        // 删除当前tab，地址往前推
        const next = curTab[delIndex - 1];
        router.push(next);
        setPanes(panes);
        storeTabs(panes);
    };

    // tab点击
    const onTabClick = (key: string) => {
        const { path } = panes.filter((item) => item.key === key)[0];
        router.push(path);
    };

    // 刷新当前 tab
    const refreshTab = (): void => {
        setIsReload(true);
        setTimeout(() => {
            setIsReload(false);
        }, 1000);

        setReloadPath(fullPath);
        setTimeout(() => {
            setReloadPath('');
        }, 1000);
    };

    // 关闭其他或关闭所有
    const removeAll = async (isCloseAll: boolean = false) => {
        const { path, key } = selectedPane;
        router.push(isCloseAll ? '/workbench' : path);
        const homePane = initPane;
        const nowPane = key !== 'home' && !isCloseAll ? [...homePane, selectedPane] : homePane;
        setPanes(nowPane);
        setActiveKey(isCloseAll ? 'home' : key);
        storeTabs(nowPane);
    };

    useEffect(() => {
        removeAll();
        const newPath = fullPath;
        if (!panesItem.path || panesItem.path === pathRef.current) {
            return;
        }
        pathRef.current = newPath;
        const index = panes.findIndex((item) => item.key === panesItem.key);
        if (!panesItem.key || (index > -1 && panes[index].path === newPath)) {
            setActiveKey(tabActiveKey);
            return;
        }
        if (index > -1) {
            panes[index].path = newPath;
            setPanes(panes);
            setActiveKey(tabActiveKey);
            return;
        }
        panes.push(panesItem);
        setPanes(panes);
        setActiveKey(tabActiveKey);
        storeTabs(panes);
    }, [panes, panesItem, pathname, search, resetTabs, storeTabs, tabActiveKey]);

    const isDisabled = selectedPane.key === 'home';
    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={() => refreshTab()} disabled={selectedPane.path !== fullPath}>
                刷新
            </Menu.Item>
            <Menu.Item
                key="2"
                onClick={(e) => {
                    e.domEvent.stopPropagation();
                    remove(selectedPane.key);
                }}
                disabled={isDisabled}
            >
                关闭
            </Menu.Item>
            <Menu.Item
                key="3"
                onClick={(e) => {
                    e.domEvent.stopPropagation();
                    removeAll();
                }}
            >
                关闭其他
            </Menu.Item>
            <Menu.Item
                key="4"
                onClick={(e) => {
                    e.domEvent.stopPropagation();
                    removeAll(true);
                }}
                disabled={isDisabled}
            >
                关闭所有
            </Menu.Item>
        </Menu>
    );

    // 阻止右键默认事件
    const preventDefault = (e: { preventDefault: () => void }, panel: object) => {
        e.preventDefault();
        setSelectedPane(panel as any);
    };
    return (
        <div>
            <Tabs
                defaultActiveKey={defaultActiveKey}
                hideAdd={true}
                onChange={onChange}
                onTabClick={onTabClick}
                type="editable-card"
                size="small"
            >
                {panes.map((pane) => (
                    <TabPane
                        key={pane.key}
                        closable={pane.closable}
                        tab={
                            <Dropdown menu={menu as any} placement="bottomLeft" trigger={['contextMenu']}>
                                <span onContextMenu={(e) => preventDefault(e, pane)}>
                                    {isReload && pane.path === fullPath && pane.path !== '/403' && '↻'}
                                    {pane.title}
                                </span>
                            </Dropdown>
                        }
                    >
                        {reloadPath !== pane.path ? (
                            pane.content
                        ) : (
                            <div style={{ height: '100vh' }}>
                                <Alert message="刷新中..." type="info" />
                            </div>
                        )}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
};
