import { NextResponse, NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    // 인증되지 않은 사용자의 api 요청인 경우 401 코드로 반환
    if (request.nextUrl.pathname.startsWith("/api")) {
      return new Response("Authentication Error", { status: 401 });
    }

    const { pathname, search, origin, basePath } = request.nextUrl;
    const signInUrl = new URL(`${basePath}/signin`, origin);
    signInUrl.searchParams.append(
      "callbackUrl",
      `${basePath}${pathname}${search}`
    );

    // 로그인하지 않는 사용자가 로그인이 필요한 페이지에 접근 시 로그인 페이지로 이동
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
