import { cookies } from "next/headers";
import { Cookies } from "@/utils/types";
import { sessionSchema } from "../nextjs/schemas";
import { z } from "zod";
import crypto from "crypto";
import { redisClient } from "@/redis/redis";
import {
  COOKIE_SESSION_KEY,
  SESSION_EXPIRES_IN_SECONDS,
} from "@/utils/constants";

type UserSession = z.infer<typeof sessionSchema>;

function setCookies(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRES_IN_SECONDS * 1000,
  });
}

export async function getUserSessionById(sessionId: string) {
  // console.log("sessionId from getUserSessionById : ", sessionId);
  const rawUser = await redisClient.get(`session:${sessionId}`);
  // console.log("rawUser : ", rawUser);
  const { success, data: user } = sessionSchema.safeParse(rawUser);
  // console.log("user : ", user);
  return success ? user : null;
}

export function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  // console.log("sessionId : ", sessionId);
  if (sessionId == null) return null;
  return getUserSessionById(sessionId);
}

export async function createUserSession(user: UserSession, cookies: Cookies) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  // we have created the session but we need to store it somewhere - redis;
  // console.log("sessionSchema : ", sessionSchema);

  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRES_IN_SECONDS, // will deleted automatically after SESSION_EXPIRES_IN_SECONDS
  });

  setCookies(sessionId, cookies);
}

export async function removeUserSession(
  cookies: Pick<Cookies, "get" | "delete">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;
  await redisClient.del(`session:${sessionId}`);
  cookies.delete(COOKIE_SESSION_KEY);
}

// incase you make some updates on User in the db - make user the update the session with the latest data
export async function updateUserSessionData(
  user: UserSession,
  cookies: Pick<Cookies, "get">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;
  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRES_IN_SECONDS, // will deleted automatically after SESSION_EXPIRES_IN_SECONDS
  });
}

export async function updateUserSessionExpiration(
  cookies: Pick<Cookies, "get" | "set">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;
  const user = await getUserSessionById(sessionId);
  if (!user) return null;
  await redisClient.set(`session:${sessionId}`, user, {
    ex: SESSION_EXPIRES_IN_SECONDS, // will deleted automatically after SESSION_EXPIRES_IN_SECONDS
  });
  setCookies(sessionId, cookies);
}
