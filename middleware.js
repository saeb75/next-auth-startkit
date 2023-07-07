import { NextResponse } from "next/server";

const protectedRoutes = ["/"];
const authRoutes = ["/login", "/register"];
export function middleware(request) {
  const currentUser = request.cookies.get("token");
  if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) {
    request.cookies.delete("currentUser");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("currentUser");
    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
