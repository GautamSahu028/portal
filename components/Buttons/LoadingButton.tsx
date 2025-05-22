"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
}

export function LoadingButton({
  href,
  children,
  className,
  variant = "default",
  size = "default",
  disabled = false,
}: LoadingButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (disabled || isLoading || isPending) return;

    setIsLoading(true);
    startTransition(() => {
      router.push(href);
    });
  };

  const loading = isLoading || isPending;

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      className={cn(
        "relative transition-all duration-200 hover:cursor-pointer",
        loading && "cursor-not-allowed",
        className
      )}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      )}
      <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
        {children}
      </span>
    </Button>
  );
}
