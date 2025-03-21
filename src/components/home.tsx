import React from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import DashboardContent from "./dashboard/DashboardContent";

interface HomeProps {
  // Props can be added here if needed in the future
}

const Home: React.FC<HomeProps> = () => {
  // Sample metrics data
  const metrics = {
    totalChildren: "156",
    totalTeachers: "24",
    totalClassrooms: "12",
    attendanceRate: "92%",
    childrenTrend: { value: "3%", positive: true },
    teachersTrend: { value: "1%", positive: true },
    classroomsTrend: { value: "0%", positive: true },
    attendanceTrend: { value: "2%", positive: true },
  };

  // Sample attendance data
  const attendanceData = [
    { date: "Mon", present: 42, absent: 8, total: 50 },
    { date: "Tue", present: 45, absent: 5, total: 50 },
    { date: "Wed", present: 40, absent: 10, total: 50 },
    { date: "Thu", present: 46, absent: 4, total: 50 },
    { date: "Fri", present: 38, absent: 12, total: 50 },
    { date: "Sat", present: 0, absent: 0, total: 0 },
    { date: "Sun", present: 0, absent: 0, total: 0 },
  ];

  // Sample classrooms
  const classrooms = ["Toddlers", "Preschool", "Kindergarten", "After School"];

  // Sample events
  const events = [
    {
      id: "1",
      title: "Sarah's Birthday",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
      type: "birthday" as const,
      description: "Celebration planned in Butterfly classroom",
    },
    {
      id: "2",
      title: "Parent-Teacher Meeting",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
      type: "meeting" as const,
      description: "Quarterly progress discussion",
    },
    {
      id: "3",
      title: "Field Trip",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
      type: "activity" as const,
      description: "Visit to the Children's Museum",
    },
    {
      id: "4",
      title: "Staff Development Day",
      date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5),
      type: "holiday" as const,
      description: "Daycare closed for staff training",
    },
  ];

  // Sample notifications
  const notifications = [
    {
      id: "1",
      title: "New Enrollment",
      message: "Emma Johnson has been enrolled in Butterfly classroom",
      time: "10 minutes ago",
      type: "info" as const,
      read: false,
    },
    {
      id: "2",
      title: "Allergy Alert",
      message: "Please note that Noah Smith has peanut allergies",
      time: "1 hour ago",
      type: "alert" as const,
      read: false,
    },
    {
      id: "3",
      title: "Parent Meeting",
      message: "Reminder: Parent-teacher meetings scheduled for Friday",
      time: "3 hours ago",
      type: "reminder" as const,
      read: true,
    },
    {
      id: "4",
      title: "Staff Update",
      message: "Ms. Parker will be on leave next week",
      time: "Yesterday",
      type: "info" as const,
      read: true,
    },
    {
      id: "5",
      title: "Emergency Drill",
      message: "Fire drill scheduled for tomorrow at 10:00 AM",
      time: "Yesterday",
      type: "alert" as const,
      read: true,
    },
  ];

  // Sample quick actions
  const quickActions = [
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

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
          <DashboardContent
            metrics={metrics}
            attendanceData={attendanceData}
            classrooms={classrooms}
            events={events}
            notifications={notifications}
            quickActions={quickActions}
          />
        </div>
      </div>
      <Outlet />
    </MainLayout>
  );
};

export default Home;

// Import these at the top of the file
import {
  UserPlus,
  ClipboardCheck,
  Calendar,
  Bell,
  Settings,
} from "lucide-react";
