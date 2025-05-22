import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: "up" | "down";
  trendValue?: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2 mt-2">
          <CardDescription>{description}</CardDescription>
          {trend && trendValue && (
            <div
              className={cn(
                "flex items-center text-xs font-medium",
                trend === "up" ? "text-emerald-500" : "text-rose-500"
              )}
            >
              {trend === "up" ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {trendValue}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}