import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
});

export default function middleware(req: NextRequest) {
    return intlMiddleware(req);
}

export const config = {
    matcher: ['/', '/(ru|en)/:path*'],
};
