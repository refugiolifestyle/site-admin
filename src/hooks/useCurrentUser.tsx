"use client";
import { COOKIE_TOKEN_NAME } from "@/middleware";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"
import { CurrentUser } from "@/types/auth";

function useCurrentUser(): CurrentUser {
  let cookieValue = Cookies.get(COOKIE_TOKEN_NAME)
  let currentUser = jwtDecode<CurrentUser>(cookieValue!)

  return {
    user_id: currentUser.user_id,
    name: currentUser.name,
    nickname: currentUser.nickname,
    email: currentUser.email,
    picture: currentUser.picture
  }
}

export default useCurrentUser;
