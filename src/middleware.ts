import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (token) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
};

export const config = {
  matcher: "/dashboard/:path*",
};
