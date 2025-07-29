import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export default function middleware(_req: NextRequest) {
    // 暂时禁用主题重定向逻辑，让页面正常加载
    // const cookie = req.cookies.get('theme');
    // console.log(cookie);
    // redirect(cookie?.value === 'dark' ? '/dark' : '/light');

    // 直接返回，不做任何重定向
    console.log('middleware handle', _req.url);
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
