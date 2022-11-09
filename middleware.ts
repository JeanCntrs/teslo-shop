import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import * as jose from 'jose';


export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token');

    try {
        await jose.jwtVerify(token || '', new TextEncoder().encode(process.env.JWT_SECRET_SEED || ''));
        return NextResponse.next();
    } catch (error) {
        const { origin, pathname } = req.nextUrl.clone()
        return NextResponse.redirect(`${origin}/auth/sign-in?p=${pathname}`);
    }
}

// Only the paths declared in here will run the middleware
export const config = {
    matcher: ["/checkout/:path*"],
};