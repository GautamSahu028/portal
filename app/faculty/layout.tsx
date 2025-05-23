import { getCurrentUser } from "@/auth/nextjs/currentUser";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const fullUser = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });
  return <DashboardLayout user={fullUser}>{children}</DashboardLayout>;
};

export default layout;
