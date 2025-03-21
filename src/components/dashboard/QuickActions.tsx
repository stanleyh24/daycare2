import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  PlusCircle,
  UserPlus,
  Calendar,
  ClipboardCheck,
  Bell,
  Settings,
} from "lucide-react";

interface QuickActionProps {
  actions?: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }>;
}

const QuickActions = ({ actions = [] }: QuickActionProps) => {
  // Default actions if none provided
  const defaultActions = [
    {
      title: "Add Child",
      description: "Register a new child in the system",
      icon: <UserPlus className="h-6 w-6 text-blue-500" />,
      onClick: () => console.log("Add child clicked"),
    },
    {
      title: "Record Attendance",
      description: "Mark today's attendance",
      icon: <ClipboardCheck className="h-6 w-6 text-green-500" />,
      onClick: () => console.log("Record attendance clicked"),
    },
    {
      title: "Create Event",
      description: "Schedule a new daycare event",
      icon: <Calendar className="h-6 w-6 text-purple-500" />,
      onClick: () => console.log("Create event clicked"),
    },
    {
      title: "Send Notification",
      description: "Send message to parents",
      icon: <Bell className="h-6 w-6 text-amber-500" />,
      onClick: () => console.log("Send notification clicked"),
    },
    {
      title: "Add Teacher",
      description: "Register a new staff member",
      icon: <UserPlus className="h-6 w-6 text-indigo-500" />,
      onClick: () => console.log("Add teacher clicked"),
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: <Settings className="h-6 w-6 text-slate-500" />,
      onClick: () => console.log("Settings clicked"),
    },
  ];

  // Use provided actions or default ones
  const displayActions = actions.length > 0 ? actions : defaultActions;

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          Quick Actions
        </CardTitle>
        <CardDescription>Frequently used tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto flex flex-col items-center justify-center p-4 gap-2 hover:bg-blue-50 transition-colors"
              onClick={action.onClick}
            >
              <div className="rounded-full bg-gray-100 p-3">{action.icon}</div>
              <div className="text-center">
                <h3 className="font-medium text-sm">{action.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {action.description}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
