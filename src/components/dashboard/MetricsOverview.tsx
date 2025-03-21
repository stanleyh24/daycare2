import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Users,
  School,
  Home,
  Calendar,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  bgColor?: string;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  icon = <Users className="h-8 w-8 text-primary" />,
  trend = { value: "0%", positive: true },
  bgColor = "bg-white",
}: MetricCardProps) => {
  return (
    <Card className={`${bgColor} overflow-hidden`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-full p-2 bg-primary/10">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center mt-1">
            {trend.positive ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-xs ${trend.positive ? "text-green-500" : "text-red-500"}`}
            >
              {trend.value} from last week
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface MetricsOverviewProps {
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
}

const MetricsOverview = ({
  metrics = {
    totalChildren: "156",
    totalTeachers: "24",
    totalClassrooms: "12",
    attendanceRate: "92%",
    childrenTrend: { value: "3%", positive: true },
    teachersTrend: { value: "1%", positive: true },
    classroomsTrend: { value: "0%", positive: true },
    attendanceTrend: { value: "2%", positive: true },
  },
}: MetricsOverviewProps) => {
  return (
    <div className="w-full bg-card p-4 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Children"
          value={metrics.totalChildren}
          icon={<Users className="h-8 w-8 text-blue-500" />}
          trend={metrics.childrenTrend}
          bgColor="bg-blue-50"
        />
        <MetricCard
          title="Total Teachers"
          value={metrics.totalTeachers}
          icon={<School className="h-8 w-8 text-purple-500" />}
          trend={metrics.teachersTrend}
          bgColor="bg-purple-50"
        />
        <MetricCard
          title="Total Classrooms"
          value={metrics.totalClassrooms}
          icon={<Home className="h-8 w-8 text-orange-500" />}
          trend={metrics.classroomsTrend}
          bgColor="bg-orange-50"
        />
        <MetricCard
          title="Attendance Rate"
          value={metrics.attendanceRate}
          icon={<Calendar className="h-8 w-8 text-green-500" />}
          trend={metrics.attendanceTrend}
          bgColor="bg-green-50"
        />
      </div>
    </div>
  );
};

export default MetricsOverview;
