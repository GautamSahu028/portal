import { NextResponse, type NextRequest } from "next/server";
import {
  getUserFromSession,
  updateUserSessionExpiration,
} from "./auth/core/session";

// const privateRoutes = ["/faculty", "/student"];
// const facultyRoutes = ["/admin"];
// const studentRoutes = ["/student"];

export async function middleware(request: NextRequest) {
  const response = (await middlewareAuth(request)) ?? NextResponse.next();

  await updateUserSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value });
    },
    get: (key) => request.cookies.get(key),
  });
  return response;
}

async function middlewareAuth(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isFacultyRoute =
    path.startsWith("/faculty") || path.startsWith("/onboarding/faculty");
  const isStudentRoute =
    path.startsWith("/student") || path.startsWith("/onboarding/student");
  const isPrivateRoute = isFacultyRoute || isStudentRoute;

  if (isPrivateRoute) {
    const user = await getUserFromSession(request.cookies);
    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
  if (isFacultyRoute) {
    const user = await getUserFromSession(request.cookies);
    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (user.role !== "FACULTY") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (isStudentRoute) {
    const user = await getUserFromSession(request.cookies);
    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (user.role !== "STUDENT") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/faculty/:path*",
    "/student/:path*",
  ],
};
