"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { GraduationCap, Settings, LogOut, Menu, X, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { getFacultyNavItems, getStudentNavItems } from "./routes";

interface DashboardLayoutProps {
  user: User;
  children: React.ReactNode;
}

export default function DashboardLayout({
  user,
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isStudent = user?.role === "STUDENT";

  const handleLogout = async () => {
    await axios.post("/api/logout");
    toast("Logged out successfully");
    router.push("/");
  };

  const navItems = isStudent ? getStudentNavItems() : getFacultyNavItems();

  return (
    <div className="flex h-screen flex-col overflow-hiddenl">
      {/* Mobile Header */}
      <div className="border-b lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="mr-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <Link href="/" className="flex items-center">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold">EduManage</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserMenu user={user} onLogout={handleLogout} />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 bg-background p-6 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setSidebarOpen(false)}
              >
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="ml-2 text-xl font-bold">EduManage</span>
              </Link>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "transparent"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 border-r bg-background lg:block">
          <div className="flex flex-col h-full">
            <div className="flex h-16 items-center border-b px-6">
              <Link href="/" className="flex items-center">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="ml-2 text-xl font-bold">EduManage</span>
              </Link>
            </div>
            <nav className="flex-1 overflow-auto p-3">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "transparent"
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="border-t p-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {/* Fixed Search Bar */}
          <div className="hidden h-16 items-center gap-4 border-b px-6 lg:flex shrink-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md border pl-8 bg-background"
              />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserMenu user={user} onLogout={handleLogout} />
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

function UserMenu({
  user,
  onLogout,
}: {
  user: User | null;
  onLogout: () => void;
}) {
  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}&background=random`}
              alt={user.name}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/${user.role}/profile`} className="flex w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
