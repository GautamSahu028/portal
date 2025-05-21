"use server";

import { z } from "zod";
import { signInSchema, signUpSchema } from "./schemas";
import db from "@/utils/db";
import {
  comparePasswords,
  generateRandomSalt,
  hashPassword,
} from "../core/passwordHasher";
import { cookies } from "next/headers";
import { createUserSession, removeUserSession } from "../core/session";
import { redirect } from "next/navigation";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);
  if (!success) return "Error while signing in";

  const user = await db.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!user) return "Error while signing in";

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "Invalid Credentials";

  await createUserSession(user, await cookies());

  const parsedRole = user.role;
  if (parsedRole == "FACULTY") redirect("/faculty/dashboard");
  else redirect("/student/dashboard");
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);
  if (!success) return "Invalid Credentials";
  const existingUser = await db.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (existingUser) return "User already exists";

  const parsedRole = data.role;

  try {
    const salt = generateRandomSalt();
    const hashedPassword = await hashPassword(data.password, salt);
    const newUser = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        salt: salt,
        role: data.role,
      },
    });
    const checkNewUser = await db.user.findFirst({
      where: { email: data.email },
    });
    if (newUser == null) return "Error occurred while registration";
    await createUserSession(
      { id: newUser.id, role: newUser.role },
      await cookies()
    );
  } catch (error) {
    console.error("Error ---->  ", error);
  }
  if (parsedRole == "FACULTY") redirect("/faculty/dashboard");
  else redirect("/student/dashboard");
}

export async function logOut() {
  await removeUserSession(await cookies());
  redirect("/");
}
