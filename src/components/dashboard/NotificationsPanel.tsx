import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Filter, X } from "lucide-react";

type NotificationType = "alert" | "info" | "reminder";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

interface NotificationsPanelProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onClearAll?: () => void;
  onFilterChange?: (type: NotificationType | null) => void;
}

const NotificationsPanel = ({
  notifications = [
    {
      id: "1",
      title: "New Enrollment",
      message: "Emma Johnson has been enrolled in Butterfly classroom",
      time: "10 minutes ago",
      type: "info",
      read: false,
    },
    {
      id: "2",
      title: "Allergy Alert",
      message: "Please note that Noah Smith has peanut allergies",
      time: "1 hour ago",
      type: "alert",
      read: false,
    },
    {
      id: "3",
      title: "Parent Meeting",
      message: "Reminder: Parent-teacher meetings scheduled for Friday",
      time: "3 hours ago",
      type: "reminder",
      read: true,
    },
    {
      id: "4",
      title: "Staff Update",
      message: "Ms. Parker will be on leave next week",
      time: "Yesterday",
      type: "info",
      read: true,
    },
    {
      id: "5",
      title: "Emergency Drill",
      message: "Fire drill scheduled for tomorrow at 10:00 AM",
      time: "Yesterday",
      type: "alert",
      read: true,
    },
  ],
  onMarkAsRead = () => {},
  onClearAll = () => {},
  onFilterChange = () => {},
}: NotificationsPanelProps) => {
  const [activeFilter, setActiveFilter] = useState<NotificationType | null>(
    null,
  );
  const [localNotifications, setLocalNotifications] =
    useState<Notification[]>(notifications);

  const handleMarkAsRead = (id: string) => {
    setLocalNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
    onMarkAsRead(id);
  };

  const handleClearAll = () => {
    setLocalNotifications([]);
    onClearAll();
  };

  const handleFilterChange = (type: NotificationType | null) => {
    setActiveFilter(type === activeFilter ? null : type);
    onFilterChange(type === activeFilter ? null : type);
  };

  const filteredNotifications = activeFilter
    ? localNotifications.filter(
        (notification) => notification.type === activeFilter,
      )
    : localNotifications;

  const unreadCount = localNotifications.filter(
    (notification) => !notification.read,
  ).length;

  const getTypeColor = (type: NotificationType) => {
    switch (type) {
      case "alert":
        return "destructive";
      case "info":
        return "default";
      case "reminder":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFilterChange("alert")}
              className={activeFilter === "alert" ? "bg-red-100" : ""}
            >
              <Badge variant="destructive">Alerts</Badge>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFilterChange("info")}
              className={activeFilter === "info" ? "bg-blue-100" : ""}
            >
              <Badge variant="default">Info</Badge>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFilterChange("reminder")}
              className={activeFilter === "reminder" ? "bg-purple-100" : ""}
            >
              <Badge variant="secondary">Reminders</Badge>
            </Button>
            {activeFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFilterChange(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{notification.title}</h4>
                      <Badge variant={getTypeColor(notification.type)}>
                        {notification.type.charAt(0).toUpperCase() +
                          notification.type.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {notification.time}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <Bell className="h-10 w-10 mb-2 opacity-30" />
            <p>No notifications to display</p>
            {activeFilter && (
              <Button
                variant="link"
                size="sm"
                onClick={() => handleFilterChange(null)}
              >
                Clear filter
              </Button>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-3">
        <div className="flex justify-between w-full">
          <Button variant="outline" size="sm" onClick={handleClearAll}>
            Clear all
          </Button>
          <Button variant="ghost" size="sm">
            View all notifications
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NotificationsPanel;
