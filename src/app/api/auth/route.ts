import { COOKIE_TOKEN_NAME } from "@/middleware";
import { CurrentUser } from "@/types/auth";
import { jwtDecode } from "jwt-decode";
import jwtEncode from "jwt-encode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_TOKEN_EXPIRED = 1000 * 60 * 60 * 24 * 7

export async function POST(request: Request) {
  let { token } = await request.json()
  let currentUser = jwtDecode<CurrentUser>(token)

  let [nickname, ...lastName] = currentUser.name.split(" ")
  if (lastName.length) {
    nickname += ` ${lastName.pop()}`
  }

  let newUser: CurrentUser = {
    user_id: currentUser.user_id,
    name: currentUser.name,
    nickname: nickname,
    email: currentUser.email,
    picture: currentUser.picture,
    permissions: [
      '',
      "/",
      "/calendar",
      "/profile",
      "/forms/form-elements",
      "/forms/form-layout",
      "/tables",
      "/settings",
      "/chart",
      "/ui/alerts",
      "/ui/buttons",
      "/auth/signin",
      "/auth/signup",
    ]
  }

  let cookieJwt = jwtEncode(newUser, process.env.JWT_SECRET)

  const cookieStore = cookies()
  cookieStore.set(COOKIE_TOKEN_NAME, cookieJwt, {
    domain: process.env.NEXTAUTH_URL,
    expires: Date.now() + COOKIE_TOKEN_EXPIRED,
    maxAge: COOKIE_TOKEN_EXPIRED,
    secure: true
  })

  return NextResponse.json({ success: true }, {
    headers: { 'Set-Cookie': `${COOKIE_TOKEN_NAME}=${cookieJwt}; Expires=${new Date(Date.now() + COOKIE_TOKEN_EXPIRED).toString()}; Max-Age=${COOKIE_TOKEN_EXPIRED}; Secure` }
  })
}

export async function DELETE() {
  const cookieStore = cookies()
  cookieStore.set(COOKIE_TOKEN_NAME, '')

  return NextResponse.json({ success: true }, {
    headers: { 'Set-Cookie': `${COOKIE_TOKEN_NAME}=; Expires=0; Max-Age=0; Secure` }
  })
}