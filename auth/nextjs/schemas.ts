import { z } from "zod";

import { Role as PrismaRole } from "@prisma/client";

export type Role = PrismaRole;

// Sign-in schema
export const signInSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(1, { message: "Password cannot be empty" }),
});

// Sign-up schema
export const signUpSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, { message: "Name cannot be empty" }),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be at least 8 characters long" }),

  role: z.nativeEnum(PrismaRole, {
    required_error: "Role is required",
    invalid_type_error: "Role must be either ADMIN or USER",
  }),
});

// Session schema
export const sessionSchema = z.object({
  id: z.string({
    required_error: "Session ID is required",
    invalid_type_error: "Session ID must be a string",
  }),

  role: z.nativeEnum(PrismaRole, {
    required_error: "User role is required",
    invalid_type_error: "User role must be either ADMIN or USER",
  }),
});

export const FacultyOnboardingSchema = z.object({
  department: z.string().min(1, "Department is required"),
  designation: z.string().min(1, "Designation is required"),
  subjectId: z.string().min(1, "Subject is required"),
});
