import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { isAuthenticated } = getKindeServerSession()

  const isAuth = await isAuthenticated()

  if (isAuth) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/auth', request.url))
}

export const config = {
  matcher: ['/dashboard/:path*', '/callback']
};
