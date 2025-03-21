import React from "react";
import MetricsOverview from "./MetricsOverview";
import AttendanceChart from "./AttendanceChart";
import EventsCalendar from "./EventsCalendar";
import NotificationsPanel from "./NotificationsPanel";
import QuickActions from "./QuickActions";

interface DashboardContentProps {
  metrics?: {
    totalChildren: string;
    totalTeachers: string;
    totalClassrooms: string;
    attendanceRate: string;
    childrenTrend: { value: string; positive: boolean };
    teachersTrend: { value: string; positive: boolean };
    classroomsTrend: { value: string; positive: boolean };
    attendanceTrend: { value: string; positive: boolean };
  };
  attendanceData?: Array<{
    date: string;
    present: number;
    absent: number;
    total: number;
  }>;
  classrooms?: string[];
  events?: Array<{
    id: string;
    title: string;
    date: Date;
    type: "birthday" | "activity" | "holiday" | "meeting";
    description?: string;
  }>;
  notifications?: Array<{
    id: string;
    title: string;
    message: string;
    time: string;
    type: "alert" | "info" | "reminder";
    read: boolean;
  }>;
  quickActions?: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }>;
}

const DashboardContent = ({
  metrics,
  attendanceData,
  classrooms,
  events,
  notifications,
  quickActions,
}: DashboardContentProps) => {
  return (
    <div className="w-full h-full bg-gray-50 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Metrics Overview Section */}
        <section>
          <MetricsOverview metrics={metrics} />
        </section>

        {/* Charts and Calendar Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceChart data={attendanceData} classrooms={classrooms} />
          <EventsCalendar events={events} />
        </section>

        {/* Notifications and Quick Actions Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NotificationsPanel notifications={notifications} />
          <QuickActions actions={quickActions} />
        </section>
      </div>
    </div>
  );
};

export default DashboardContent;
