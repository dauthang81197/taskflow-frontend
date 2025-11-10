"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  Home,
  RefreshCw,
  Settings,
  Users,
  FolderKanban,
  ChartLine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const navigation = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Dashboard",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Lifecycle",
    href: "/dashboard/lifecycle",
    icon: RefreshCw,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: ChartLine,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
];

const documents = [
  {
    title: "Data Library",
    href: "/dashboard/documents/data",
    icon: FileText,
  },
  {
    title: "Reports",
    href: "/dashboard/documents/reports",
    icon: FileText,
  },
  {
    title: "Word Assistant",
    href: "/dashboard/documents/assistant",
    icon: FileText,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BarChart3 className="size-4" />
          </div>
          <span className="font-semibold">Acme Inc.</span>
        </Link>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="size-4" />
                {item.title}
              </Link>
            );
          })}
        </div>

        <Separator />

        <div className="p-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Documents
          </p>
          <div className="space-y-1">
            {documents.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

        <Separator />

        <div className="p-4">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/dashboard/settings"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Settings className="size-4" />
            Settings
          </Link>
        </div>
      </ScrollArea>
    </div>
  );
}

