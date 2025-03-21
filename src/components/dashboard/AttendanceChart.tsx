import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

interface AttendanceData {
  date: string;
  present: number;
  absent: number;
  total: number;
}

interface AttendanceChartProps {
  data?: AttendanceData[];
  classrooms?: string[];
}

const defaultClassrooms = [
  "Toddlers",
  "Preschool",
  "Kindergarten",
  "After School",
];

const defaultData: AttendanceData[] = [
  { date: "Mon", present: 42, absent: 8, total: 50 },
  { date: "Tue", present: 45, absent: 5, total: 50 },
  { date: "Wed", present: 40, absent: 10, total: 50 },
  { date: "Thu", present: 46, absent: 4, total: 50 },
  { date: "Fri", present: 38, absent: 12, total: 50 },
  { date: "Sat", present: 0, absent: 0, total: 0 },
  { date: "Sun", present: 0, absent: 0, total: 0 },
];

const AttendanceChart = ({
  data = defaultData,
  classrooms = defaultClassrooms,
}: AttendanceChartProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedClassroom, setSelectedClassroom] = useState("all");

  // Calculate the highest value for scaling the chart
  const maxAttendance = Math.max(...data.map((day) => day.total));

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">
          Attendance Overview
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Select
            value={selectedClassroom}
            onValueChange={setSelectedClassroom}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select classroom" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classrooms</SelectItem>
              {classrooms.map((classroom) => (
                <SelectItem key={classroom} value={classroom.toLowerCase()}>
                  {classroom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Tabs
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            className="w-[200px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {/* Chart visualization */}
          <div className="flex h-[250px] items-end space-x-2">
            {data.map((day) => {
              const presentPercentage =
                day.total > 0 ? (day.present / day.total) * 100 : 0;
              const absentPercentage =
                day.total > 0 ? (day.absent / day.total) * 100 : 0;

              return (
                <div
                  key={day.date}
                  className="flex flex-1 flex-col items-center"
                >
                  <div className="relative w-full h-[200px] flex flex-col-reverse">
                    {/* Present bar */}
                    <div
                      className="w-full bg-green-500 rounded-t-sm"
                      style={{
                        height: `${(day.present / maxAttendance) * 200}px`,
                      }}
                    />
                    {/* Absent bar */}
                    <div
                      className="w-full bg-red-400 rounded-t-sm"
                      style={{
                        height: `${(day.absent / maxAttendance) * 200}px`,
                      }}
                    />
                  </div>
                  <div className="mt-2 text-xs font-medium">{day.date}</div>
                  {day.total > 0 && (
                    <div className="text-xs text-gray-500">
                      {presentPercentage.toFixed(0)}%
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
              <span className="text-xs">Present</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded-sm mr-1"></div>
              <span className="text-xs">Absent</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
