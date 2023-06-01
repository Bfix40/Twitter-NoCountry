import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";
export async function middleware(request) {
  const { data: session, status } = await useSession()
  if (status === "authenticated") {
    return NextResponse.next()
  } else {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}
export const config = {
  matcher: ["/profile", "/login", "/register"],
};
