
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;
    const isAuth = Boolean(token);
    const isLoginPage = request.nextUrl.pathname === '/get-started';

    if (!isAuth && !isLoginPage) {
        return NextResponse.redirect(new URL('/get-started', request.url));
    }

    if (isAuth && isLoginPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        /*
          Match all routes except:
          - static files (_next)
          - login page
          - public APIs if needed
        */
        '/((?!_next/static|_next/image|favicon.ico|login|api/public).*)',
    ],
};
