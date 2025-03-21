import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  UserRound,
  LayoutGrid,
  Settings,
  LogOut,
  DollarSign,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const NavItem = ({ icon, label, href, active = false }: NavItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-primary/10",
              active
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground",
            )}
          >
            <div className="flex h-6 w-6 items-center justify-center">
              {icon}
            </div>
            <span>{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex h-full w-[280px] flex-col bg-card p-4 shadow-sm border-r">
      <div className="flex items-center gap-2 px-2 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M14.5 3.5c0 1.626 1.5 3 1.5 5h-8c0-2 1.5-3.374 1.5-5s-1.5-1.78-1.5-3c0 0 2 0 4 2 2-2 4-2 4-2 0 1.22-1.5 1.374-1.5 3Z" />
            <path d="M5 14c-1.25 0-2.5-.815-2.5-2.5 0-1.924 2.134-4.536 4.34-7.163.753-.904 1.844-1.282 3.16-1.282 1.657 0 3-.437 3-2.5 0 0 2 0 4 2 2-2 4-2 4-2 0 1.22-1.5 1.374-1.5 3s1.5 3 1.5 5-1.5 3-1.5 5c0 1.626 1.5 3.024 1.5 4.5 0 0-2 0-4-2-2 2-4 2-4 2 0-1.22 1.5-1.374 1.5-3a1.5 1.5 0 0 0-3 0c0 1.626 1.5 3 1.5 5h-8c0-2 1.5-3.374 1.5-5a1.5 1.5 0 0 0-3 0c0 1.626 1.5 2.78 1.5 4" />
            <path d="M5 21.5c0-1.626 1.5-3 1.5-5h8c0 2 1.5 3.374 1.5 5s-1.5 1.78-1.5 3c0 0-2 0-4-2-2 2-4 2-4 2 0-1.22 1.5-1.374 1.5-3Z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold">KidsCare</h1>
          <p className="text-xs text-muted-foreground">Daycare Management</p>
        </div>
      </div>

      <div className="mt-8 space-y-1">
        <NavItem
          icon={<Home className="h-5 w-5" />}
          label="Dashboard"
          href="/"
          active={currentPath === "/"}
        />
        <NavItem
          icon={<Users className="h-5 w-5" />}
          label="Children"
          href="/children"
          active={currentPath === "/children"}
        />
        <NavItem
          icon={<UserRound className="h-5 w-5" />}
          label="Teachers"
          href="/teachers"
          active={currentPath === "/teachers"}
        />
        <NavItem
          icon={<LayoutGrid className="h-5 w-5" />}
          label="Classrooms"
          href="/classrooms"
          active={currentPath === "/classrooms"}
        />
        <NavItem
          icon={<DollarSign className="h-5 w-5" />}
          label="Billing"
          href="/billing"
          active={currentPath === "/billing"}
        />
      </div>

      <div className="mt-auto space-y-1">
        <NavItem
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          href="/settings"
          active={currentPath === "/settings"}
        />
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive">
          <div className="flex h-6 w-6 items-center justify-center">
            <LogOut className="h-5 w-5" />
          </div>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
