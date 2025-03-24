import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  LayoutGrid,
  Users,
  Calendar,
  Info,
  Edit,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ClassroomProps {
  id: string;
  name: string;
  ageGroup: string;
  capacity: number;
  currentOccupancy: number;
  teachers: Teacher[];
  activities: Activity[];
  color: string;
}

interface Teacher {
  id: string;
  name: string;
  avatar?: string;
  role: string;
}

interface Activity {
  id: string;
  name: string;
  time: string;
  description: string;
}

const ClassroomsPage = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedClassroom, setSelectedClassroom] =
    useState<ClassroomProps | null>(null);
  const [isAddActivityDialogOpen, setIsAddActivityDialogOpen] = useState(false);
  const [isAddClassroomDialogOpen, setIsAddClassroomDialogOpen] =
    useState(false);

  // Mock data for classrooms
  const classrooms: ClassroomProps[] = [
    {
      id: "1",
      name: "Sunshine Room",
      ageGroup: "Toddlers (1-2 years)",
      capacity: 12,
      currentOccupancy: 10,
      color: "bg-yellow-100 border-yellow-300",
      teachers: [
        {
          id: "t1",
          name: "Sarah Johnson",
          role: "Lead Teacher",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        },
        {
          id: "t2",
          name: "Michael Chen",
          role: "Assistant",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        },
      ],
      activities: [
        {
          id: "a1",
          name: "Morning Circle",
          time: "9:00 AM",
          description: "Songs and greetings",
        },
        {
          id: "a2",
          name: "Snack Time",
          time: "10:30 AM",
          description: "Healthy snacks and social time",
        },
        {
          id: "a3",
          name: "Outdoor Play",
          time: "11:15 AM",
          description: "Playground activities",
        },
      ],
    },
    {
      id: "2",
      name: "Rainbow Room",
      ageGroup: "Preschool (3-4 years)",
      capacity: 15,
      currentOccupancy: 14,
      color: "bg-blue-100 border-blue-300",
      teachers: [
        {
          id: "t3",
          name: "Emily Rodriguez",
          role: "Lead Teacher",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        },
        {
          id: "t4",
          name: "David Kim",
          role: "Assistant",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        },
      ],
      activities: [
        {
          id: "a4",
          name: "Art Time",
          time: "9:30 AM",
          description: "Painting and crafts",
        },
        {
          id: "a5",
          name: "Story Time",
          time: "11:00 AM",
          description: "Reading and discussion",
        },
        {
          id: "a6",
          name: "Lunch",
          time: "12:00 PM",
          description: "Meal and cleanup",
        },
      ],
    },
    {
      id: "3",
      name: "Star Room",
      ageGroup: "Pre-K (4-5 years)",
      capacity: 18,
      currentOccupancy: 16,
      color: "bg-purple-100 border-purple-300",
      teachers: [
        {
          id: "t5",
          name: "Jessica Taylor",
          role: "Lead Teacher",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
        },
        {
          id: "t6",
          name: "Robert Wilson",
          role: "Assistant",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
        },
      ],
      activities: [
        {
          id: "a7",
          name: "Math Games",
          time: "9:00 AM",
          description: "Number recognition and counting",
        },
        {
          id: "a8",
          name: "Science Exploration",
          time: "10:30 AM",
          description: "Simple experiments",
        },
        {
          id: "a9",
          name: "Music & Movement",
          time: "1:30 PM",
          description: "Dancing and instruments",
        },
      ],
    },
    {
      id: "4",
      name: "Moon Room",
      ageGroup: "Infants (0-1 year)",
      capacity: 8,
      currentOccupancy: 6,
      color: "bg-green-100 border-green-300",
      teachers: [
        {
          id: "t7",
          name: "Amanda Lee",
          role: "Lead Teacher",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
        },
        {
          id: "t8",
          name: "Thomas Brown",
          role: "Assistant",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
        },
      ],
      activities: [
        {
          id: "a10",
          name: "Tummy Time",
          time: "9:30 AM",
          description: "Supervised floor play",
        },
        {
          id: "a11",
          name: "Sensory Play",
          time: "11:00 AM",
          description: "Texture exploration",
        },
        {
          id: "a12",
          name: "Nap Time",
          time: "12:30 PM",
          description: "Rest period",
        },
      ],
    },
  ];

  const handleClassroomClick = (classroom: ClassroomProps) => {
    setSelectedClassroom(classroom);
  };

  const handleCloseDetails = () => {
    setSelectedClassroom(null);
  };

  return (
    <MainLayout title="Classroms ">

    
    <div className="flex min-h-screen bg-background">
      {/* Main Layout would be imported here in a real implementation */}
      

      <div className="flex flex-1 flex-col">
        {/* Header would be imported here */}
        <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b bg-white px-6 shadow-sm">
          <h1 className="text-2xl font-bold text-primary">Classrooms</h1>

          <div className="flex items-center space-x-4">
            {/* Header content would be here */}
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold tracking-tight">Classrooms</h2>
              <Badge variant="outline" className="ml-2">
                {classrooms.length} Total
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg border p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`rounded-md p-2 ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`rounded-md p-2 ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  <Users className="h-5 w-5" />
                </button>
              </div>
              <Dialog
                open={isAddClassroomDialogOpen}
                onOpenChange={setIsAddClassroomDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Classroom
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Classroom</DialogTitle>
                    <DialogDescription>
                      Create a new classroom for your daycare center.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Classroom name"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="age-group" className="text-right">
                        Age Group
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select age group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infants">
                            Infants (0-1 year)
                          </SelectItem>
                          <SelectItem value="toddlers">
                            Toddlers (1-2 years)
                          </SelectItem>
                          <SelectItem value="preschool">
                            Preschool (3-4 years)
                          </SelectItem>
                          <SelectItem value="prek">
                            Pre-K (4-5 years)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="capacity" className="text-right">
                        Capacity
                      </Label>
                      <Input
                        id="capacity"
                        type="number"
                        placeholder="Maximum children"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddClassroomDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddClassroomDialogOpen(false)}>
                      Save Classroom
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {classrooms.map((classroom) => (
                <Card
                  key={classroom.id}
                  className={`cursor-pointer overflow-hidden transition-all hover:shadow-md ${classroom.color}`}
                  onClick={() => handleClassroomClick(classroom)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>{classroom.name}</CardTitle>
                      <Badge variant="outline">{classroom.ageGroup}</Badge>
                    </div>
                    <CardDescription>
                      Occupancy: {classroom.currentOccupancy}/
                      {classroom.capacity}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="mb-2 font-medium">Teachers</h4>
                      <div className="flex -space-x-2">
                        {classroom.teachers.map((teacher) => (
                          <TooltipProvider key={teacher.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Avatar className="border-2 border-background">
                                  <AvatarImage
                                    src={teacher.avatar}
                                    alt={teacher.name}
                                  />
                                  <AvatarFallback>
                                    {teacher.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{teacher.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {teacher.role}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium">Today's Activities</h4>
                      <ul className="space-y-1 text-sm">
                        {classroom.activities.slice(0, 2).map((activity) => (
                          <li key={activity.id} className="flex items-center">
                            <Calendar className="mr-2 h-3 w-3 text-muted-foreground" />
                            <span>{activity.time}</span>
                            <span className="mx-1">-</span>
                            <span>{activity.name}</span>
                          </li>
                        ))}
                        {classroom.activities.length > 2 && (
                          <li className="text-xs text-muted-foreground">
                            +{classroom.activities.length - 2} more activities
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3">
                    <Button variant="ghost" size="sm" className="w-full">
                      <Info className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border bg-card">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium">Name</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Age Group
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Occupancy
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Teachers
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Activities
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classrooms.map((classroom) => (
                    <tr
                      key={classroom.id}
                      className="border-b hover:bg-muted/50"
                    >
                      <td className="px-4 py-3">{classroom.name}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">{classroom.ageGroup}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        {classroom.currentOccupancy}/{classroom.capacity}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex -space-x-2">
                          {classroom.teachers.map((teacher) => (
                            <TooltipProvider key={teacher.id}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Avatar className="h-8 w-8 border-2 border-background">
                                    <AvatarImage
                                      src={teacher.avatar}
                                      alt={teacher.name}
                                    />
                                    <AvatarFallback>
                                      {teacher.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{teacher.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {teacher.role}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {classroom.activities.length} activities
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleClassroomClick(classroom)}
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Classroom Details Dialog */}
          {selectedClassroom && (
            <Dialog
              open={!!selectedClassroom}
              onOpenChange={(open) => !open && handleCloseDetails()}
            >
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-2xl">
                      {selectedClassroom.name}
                    </DialogTitle>
                    <Badge variant="outline">
                      {selectedClassroom.ageGroup}
                    </Badge>
                  </div>
                  <DialogDescription>
                    Occupancy: {selectedClassroom.currentOccupancy}/
                    {selectedClassroom.capacity} children
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="activities">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="activities">
                      Daily Activities
                    </TabsTrigger>
                    <TabsTrigger value="teachers">Teachers</TabsTrigger>
                    <TabsTrigger value="info">Classroom Info</TabsTrigger>
                  </TabsList>

                  <TabsContent value="activities" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Today's Schedule</h3>
                      <Dialog
                        open={isAddActivityDialogOpen}
                        onOpenChange={setIsAddActivityDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" /> Add Activity
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Activity</DialogTitle>
                            <DialogDescription>
                              Add a new activity to {selectedClassroom.name}'s
                              schedule.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="activity-name"
                                className="text-right"
                              >
                                Name
                              </Label>
                              <Input
                                id="activity-name"
                                placeholder="Activity name"
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="activity-time"
                                className="text-right"
                              >
                                Time
                              </Label>
                              <Input
                                id="activity-time"
                                placeholder="e.g. 9:00 AM"
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="activity-description"
                                className="text-right"
                              >
                                Description
                              </Label>
                              <Input
                                id="activity-description"
                                placeholder="Brief description"
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsAddActivityDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => setIsAddActivityDialogOpen(false)}
                            >
                              Add Activity
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="rounded-lg border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-3 text-left font-medium">
                              Time
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                              Activity
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                              Description
                            </th>
                            <th className="px-4 py-3 text-right font-medium">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedClassroom.activities.map((activity) => (
                            <tr
                              key={activity.id}
                              className="border-b hover:bg-muted/50"
                            >
                              <td className="px-4 py-3">{activity.time}</td>
                              <td className="px-4 py-3 font-medium">
                                {activity.name}
                              </td>
                              <td className="px-4 py-3">
                                {activity.description}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="teachers">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium">Assigned Teachers</h3>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" /> Assign Teacher
                      </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {selectedClassroom.teachers.map((teacher) => (
                        <Card key={teacher.id}>
                          <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={teacher.avatar}
                                alt={teacher.name}
                              />
                              <AvatarFallback>
                                {teacher.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">
                                {teacher.name}
                              </CardTitle>
                              <CardDescription>{teacher.role}</CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                View Profile
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive"
                              >
                                Remove
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="info">
                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-2 text-lg font-medium">
                          Classroom Details
                        </h3>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <Label>Name</Label>
                                <Input
                                  value={selectedClassroom.name}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Age Group</Label>
                                <Select
                                  defaultValue={
                                    selectedClassroom.ageGroup
                                      .toLowerCase()
                                      .split(" ")[0]
                                  }
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="infants">
                                      Infants (0-1 year)
                                    </SelectItem>
                                    <SelectItem value="toddlers">
                                      Toddlers (1-2 years)
                                    </SelectItem>
                                    <SelectItem value="preschool">
                                      Preschool (3-4 years)
                                    </SelectItem>
                                    <SelectItem value="prek">
                                      Pre-K (4-5 years)
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Capacity</Label>
                                <Input
                                  type="number"
                                  value={selectedClassroom.capacity}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Current Occupancy</Label>
                                <Input
                                  type="number"
                                  value={selectedClassroom.currentOccupancy}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between border-t px-6 py-4">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Changes</Button>
                          </CardFooter>
                        </Card>
                      </div>

                      <div>
                        <h3 className="mb-2 text-lg font-medium">
                          Danger Zone
                        </h3>
                        <Card className="border-destructive/50">
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-destructive">
                                  Delete Classroom
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  Permanently delete this classroom and all its
                                  data
                                </p>
                              </div>
                              <Button variant="destructive">Delete</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
    </MainLayout>
  );
};

export default ClassroomsPage;
