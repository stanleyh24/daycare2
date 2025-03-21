import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar as CalendarIcon, Info } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: "birthday" | "activity" | "holiday" | "meeting";
  description?: string;
}

interface EventsCalendarProps {
  events?: Event[];
  onAddEvent?: (date: Date) => void;
  onViewEvent?: (event: Event) => void;
}

const EventsCalendar = ({
  events = [
    {
      id: "1",
      title: "Sarah's Birthday",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
      type: "birthday",
      description: "Celebration planned in Butterfly classroom",
    },
    {
      id: "2",
      title: "Parent-Teacher Meeting",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
      type: "meeting",
      description: "Quarterly progress discussion",
    },
    {
      id: "3",
      title: "Field Trip",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
      type: "activity",
      description: "Visit to the Children's Museum",
    },
    {
      id: "4",
      title: "Staff Development Day",
      date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5),
      type: "holiday",
      description: "Daycare closed for staff training",
    },
  ],
  onAddEvent = () => {},
  onViewEvent = () => {},
}: EventsCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  // Get events for the selected month
  const eventsInSelectedMonth = events.filter((event) => {
    return (
      event.date.getMonth() === selectedMonth.getMonth() &&
      event.date.getFullYear() === selectedMonth.getFullYear()
    );
  });

  // Get events for the selected date
  const eventsOnSelectedDate = selectedDate
    ? events.filter((event) => {
        return (
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  // Function to get event indicator class based on event type
  const getEventTypeClass = (type: Event["type"]) => {
    switch (type) {
      case "birthday":
        return "bg-pink-500";
      case "activity":
        return "bg-green-500";
      case "holiday":
        return "bg-red-500";
      case "meeting":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  // Function to render event indicators on calendar
  const renderEventIndicator = (day: Date) => {
    const dayEvents = events.filter(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    );

    if (dayEvents.length === 0) return null;

    return (
      <div className="flex justify-center space-x-1 mt-1">
        {dayEvents.slice(0, 3).map((event, index) => (
          <div
            key={index}
            className={`h-1.5 w-1.5 rounded-full ${getEventTypeClass(event.type)}`}
          />
        ))}
        {dayEvents.length > 3 && (
          <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
        )}
      </div>
    );
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">Upcoming Events</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-800"
            onClick={() => onAddEvent(selectedDate || new Date())}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Event
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="calendar-container">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            onMonthChange={setSelectedMonth}
            className="rounded-md border"
            components={{
              DayContent: ({ date, ...props }) => (
                <div {...props}>
                  {date.getDate()}
                  {renderEventIndicator(date)}
                </div>
              ),
            }}
          />
        </div>
        <div className="events-list h-full overflow-auto">
          <h3 className="text-sm font-medium mb-2 text-gray-500 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {selectedDate ? (
              <span>
                Events on{" "}
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            ) : (
              <span>Select a date to view events</span>
            )}
          </h3>

          {eventsOnSelectedDate.length > 0 ? (
            <div className="space-y-3">
              {eventsOnSelectedDate.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onViewEvent(event)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <div
                          className={`h-3 w-3 rounded-full ${getEventTypeClass(event.type)} mr-2`}
                        />
                        <h4 className="font-medium">{event.title}</h4>
                      </div>
                      {event.description && (
                        <p className="text-sm text-gray-500 mt-1">
                          {event.description}
                        </p>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : selectedDate ? (
            <div className="text-center py-8 text-gray-500">
              <p>No events scheduled for this day</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => onAddEvent(selectedDate)}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Event
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Select a date to view events</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-pink-500 mr-1" />
            <span>Birthday</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-1" />
            <span>Activity</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-red-500 mr-1" />
            <span>Holiday</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-blue-500 mr-1" />
            <span>Meeting</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventsCalendar;
