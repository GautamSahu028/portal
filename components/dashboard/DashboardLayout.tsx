"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { GraduationCap, LogOut, Menu, X, Search } from "lucide-react";
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
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Mobile Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl lg:hidden relative z-10">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="mr-2 bg-white/10 border-white/20 hover:bg-white/20 text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  EduManage
                </span>
                <div className="text-xs text-blue-300 font-medium tracking-wide">
                  PROFESSIONAL
                </div>
              </div>
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
          <div className="fixed inset-y-0 left-0 w-80 bg-gradient-to-b from-slate-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl border-r border-white/10 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/"
                className="flex items-center gap-3 group"
                onClick={() => setSidebarOpen(false)}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                </div>
                <div>
                  <span className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    EduManage
                  </span>
                  <div className="text-xs text-blue-300 font-medium tracking-wide">
                    PROFESSIONAL
                  </div>
                </div>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 group",
                    pathname === item.href
                      ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20"
                      : "text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div
                    className={cn(
                      "transition-all duration-300",
                      pathname === item.href
                        ? "text-blue-300"
                        : "group-hover:text-blue-300"
                    )}
                  >
                    {item.icon}
                  </div>
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl lg:block relative">
          <div className="flex flex-col h-full">
            <div className="flex h-16 items-center border-b border-white/10 px-6">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                </div>
                <div>
                  <span className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    EduManage
                  </span>
                  <div className="text-xs text-blue-300 font-medium tracking-wide">
                    PROFESSIONAL
                  </div>
                </div>
              </Link>
            </div>
            <nav className="flex-1 overflow-auto p-3">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 group",
                      pathname === item.href
                        ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20"
                        : "text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm"
                    )}
                  >
                    <div
                      className={cn(
                        "transition-all duration-300",
                        pathname === item.href
                          ? "text-blue-300"
                          : "group-hover:text-blue-300"
                      )}
                    >
                      {item.icon}
                    </div>
                    {item.title}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="border-t border-white/10 p-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 bg-white/10 border-white/20 hover:bg-white/20 text-white hover:text-white transition-all duration-300"
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
          <div className="hidden h-16 items-center gap-4 border-b border-white/10 px-6 lg:flex shrink-0 bg-white/5 backdrop-blur-xl">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-xl border-white/20 pl-10 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-blue-400/50 focus:ring-blue-400/20"
              />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserMenu user={user} onLogout={handleLogout} />
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl min-h-full">
              {children}
            </div>
          </div>
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
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}&background=random`}
              alt={user.name}
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-slate-900/95 backdrop-blur-xl border-white/20 shadow-2xl"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">
              {user.name}
            </p>
            <p className="text-xs leading-none text-white/60">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20" />
        <DropdownMenuItem
          onClick={onLogout}
          className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
