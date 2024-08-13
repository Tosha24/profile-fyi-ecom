"use server";

import { CookieData } from "@/types";
import { cookies } from "next/headers";

export const getSession = async () => {
  const session = cookies().get("authcookie");
  return session;
};

export const setSession = async ({ userId }: CookieData) => {
  cookies().set({
    name: "authcookie",
    value: JSON.stringify({ userId }),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
  });
};
export const removeSession = async () => {
  cookies().delete("authcookie");
};
