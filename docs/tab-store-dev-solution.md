# Tab Store 开发环境解决方案

## 问题描述

在开发过程中，Zustand 的 `persist` 中间件会将 tab 数据保存到 `localStorage` 中，导致：
1. 开发时旧的 tab 数据会被保留
2. 每次重启开发服务器时，会看到之前的 tab 状态
3. 影响开发体验和调试

## 解决方案

### 核心思路

- **开发环境**：每次启动 `pnpm dev` 时自动清除旧的 tab 数据，使用新的存储 key
- **生产环境**：使用固定的存储 key 和版本号控制，保持用户数据持久化

### 实现细节

1. **环境检测**：通过 `process.env.NODE_ENV` 区分开发和生产环境

2. **开发环境策略**：
   - **服务端渲染**：使用临时名称 `tab-store-dev-ssr`
   - **客户端**：
     - 检查 `sessionStorage` 中的会话ID
     - 如果是新会话，清理所有旧的 `tab-store` 数据
     - 生成唯一的存储 key：`tab-store-dev-${sessionId}`
     - 使用 `sessionStorage` 确保同一浏览器会话的一致性

3. **生产环境策略**：
   - 使用固定的存储 key：`tab-store`
   - 通过 `version` 字段控制数据迁移

### 代码结构

```typescript
// 简化的开发环境解决方案
const getStorageName = () => {
    if (process.env.NODE_ENV === 'development') {
        // 服务端：返回临时名称
        if (typeof window === 'undefined') {
            return 'tab-store-dev-ssr';
        }

        // 客户端：会话管理和清理逻辑
        let sessionId = window.sessionStorage.getItem('tab-store-dev-session');
        if (!sessionId) {
            // 新会话：清理旧数据，生成新ID
            sessionId = Date.now().toString();
            // ... 清理逻辑
        }
        return `tab-store-dev-${sessionId}`;
    }
    return 'tab-store'; // 生产环境
};

// Zustand store 配置
export const useTabStore = create<TabStore>()(
    persist(
        immer((set, get) => ({ /* ... */ })),
        {
            name: getStorageName(), // 动态存储名称
            version: 1, // 生产环境版本控制
            partialize: (state) => ({ /* ... */ }),
        },
    ),
);
```

## 使用效果

### 开发环境
- 每次运行 `pnpm dev` 都会看到全新的 tab 状态
- 控制台会显示清理日志：`🧹 [DEV] 清理旧的 tab-store 数据`
- 使用动态存储名称：`🔧 [DEV] 使用开发环境存储名称`

### 生产环境
- 用户的 tab 状态会被正常保存和恢复
- 通过版本号控制数据迁移
- 控制台显示：`🚀 [PROD] 使用生产环境存储名称`

## 手动清理方法

如果需要手动清理持久化数据：

```javascript
// 在浏览器控制台中执行
useTabStore.getState().clearPersistedData();
```

## 注意事项

1. 开发环境的清理只在浏览器环境中执行（`typeof window !== 'undefined'`）
2. 使用 `sessionStorage` 确保同一浏览器会话中的一致性
3. 生产环境的版本号需要手动更新来触发数据迁移
