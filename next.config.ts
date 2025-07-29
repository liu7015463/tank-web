import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
        // 确保 Node.js 模块在客户端环境中被正确处理
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                crypto: false,
                stream: false,
                url: false,
                zlib: false,
                http: false,
                https: false,
                assert: false,
                os: false,
                path: false,
            };
        }
        return config;
    },
};

export default nextConfig;
