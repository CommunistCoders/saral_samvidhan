import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname.endsWith('.js.br')) {
        const response = NextResponse.next();
        response.headers.set('Content-Encoding', 'br');
        response.headers.set('Content-Type', 'application/javascript');
        return response;
    }

    return NextResponse.next();
}
