import type { NextRequest } from 'next/server';

import { redirect } from 'next/navigation';

export default function middleware(req: NextRequest) {
    const cookie = req.cookies.get('theme');
    console.log(cookie);
    redirect(cookie?.value === 'dark' ? '/dark' : '/light');
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
