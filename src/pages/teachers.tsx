import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  Calendar,
  Award,
  School,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import MainLayout from "@/components/layout/MainLayout";

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  avatar: string;
  status: "active" | "on leave" | "training";
  classrooms: string[];
  qualifications: string[];
  hireDate: string;
}

const TeachersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Mock data for teachers
  const mockTeachers: Teacher[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@kidscare.com",
      phone: "(555) 123-4567",
      position: "Lead Teacher",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      status: "active",
      classrooms: ["Sunshine Room", "Rainbow Room"],
      qualifications: [
        "Early Childhood Education",
        "First Aid Certified",
        "Child Development Associate",
      ],
      hireDate: "2020-03-15",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.c@kidscare.com",
      phone: "(555) 234-5678",
      position: "Assistant Teacher",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      status: "active",
      classrooms: ["Butterfly Room"],
      qualifications: ["Elementary Education", "CPR Certified"],
      hireDate: "2021-06-10",
    },
    {
      id: "3",
      name: "Jessica Williams",
      email: "jessica.w@kidscare.com",
      phone: "(555) 345-6789",
      position: "Preschool Teacher",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
      status: "on leave",
      classrooms: ["Star Room"],
      qualifications: ["Child Psychology", "Montessori Certified"],
      hireDate: "2019-09-22",
    },
    {
      id: "4",
      name: "David Rodriguez",
      email: "david.r@kidscare.com",
      phone: "(555) 456-7890",
      position: "Special Needs Coordinator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      status: "active",
      classrooms: ["Rainbow Room", "Moon Room"],
      qualifications: [
        "Special Education",
        "Behavioral Therapy",
        "Sign Language",
      ],
      hireDate: "2018-11-05",
    },
    {
      id: "5",
      name: "Emily Thompson",
      email: "emily.t@kidscare.com",
      phone: "(555) 567-8901",
      position: "Infant Care Specialist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      status: "training",
      classrooms: ["Cloud Room"],
      qualifications: ["Infant Development", "Nutrition"],
      hireDate: "2022-01-20",
    },
  ];

  // Filter teachers based on search query and status
  const filteredTeachers = mockTeachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.position.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || teacher.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsViewDialogOpen(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "on leave":
        return "bg-amber-100 text-amber-800";
      case "training":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout title="Teachers ">

    
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Teacher
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search teachers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on leave">On Leave</SelectItem>
                <SelectItem value="training">Training</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Teachers Table */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50 py-4">
            <CardTitle>Teachers Directory</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Classrooms</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={teacher.avatar}
                              alt={teacher.name}
                            />
                            <AvatarFallback>
                              {teacher.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{teacher.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {teacher.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{teacher.position}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusBadgeColor(teacher.status)}
                        >
                          {teacher.status.charAt(0).toUpperCase() +
                            teacher.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.classrooms.map((classroom, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {classroom}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{teacher.phone}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewTeacher(teacher)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No teachers found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add Teacher Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription>
              Enter the details of the new teacher to add them to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="position" className="text-sm font-medium">
                  Position
                </label>
                <Input id="position" placeholder="Enter position" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on leave">On Leave</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="classrooms" className="text-sm font-medium">
                Assigned Classrooms
              </label>
              <Select>
                <SelectTrigger id="classrooms">
                  <SelectValue placeholder="Select classrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunshine">Sunshine Room</SelectItem>
                  <SelectItem value="rainbow">Rainbow Room</SelectItem>
                  <SelectItem value="star">Star Room</SelectItem>
                  <SelectItem value="butterfly">Butterfly Room</SelectItem>
                  <SelectItem value="moon">Moon Room</SelectItem>
                  <SelectItem value="cloud">Cloud Room</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="qualifications" className="text-sm font-medium">
                Qualifications
              </label>
              <Input
                id="qualifications"
                placeholder="Enter qualifications (comma separated)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button>Save Teacher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Teacher Dialog */}
      {selectedTeacher && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Teacher Profile</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-6">
              {/* Teacher Header */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={selectedTeacher.avatar}
                    alt={selectedTeacher.name}
                  />
                  <AvatarFallback className="text-xl">
                    {selectedTeacher.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{selectedTeacher.name}</h2>
                  <p className="text-muted-foreground">
                    {selectedTeacher.position}
                  </p>
                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className={getStatusBadgeColor(selectedTeacher.status)}
                    >
                      {selectedTeacher.status.charAt(0).toUpperCase() +
                        selectedTeacher.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Teacher Details Tabs */}
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Basic Info</TabsTrigger>
                  <TabsTrigger value="qualifications">
                    Qualifications
                  </TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedTeacher.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedTeacher.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Hire Date</p>
                      <p className="font-medium">
                        {new Date(
                          selectedTeacher.hireDate,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Assigned Classrooms
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedTeacher.classrooms.map((classroom, index) => (
                          <Badge key={index} variant="secondary">
                            {classroom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="qualifications" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Certifications & Qualifications
                    </h3>
                    <ul className="space-y-2">
                      {selectedTeacher.qualifications.map(
                        (qualification, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Award className="h-5 w-5 text-primary" />
                            <span>{qualification}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="schedule" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Weekly Schedule</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Day</TableHead>
                            <TableHead>Morning</TableHead>
                            <TableHead>Afternoon</TableHead>
                            <TableHead>Classroom</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                          ].map((day) => (
                            <TableRow key={day}>
                              <TableCell className="font-medium">
                                {day}
                              </TableCell>
                              <TableCell>8:00 AM - 12:00 PM</TableCell>
                              <TableCell>1:00 PM - 4:00 PM</TableCell>
                              <TableCell>
                                {
                                  selectedTeacher.classrooms[
                                    Math.floor(
                                      Math.random() *
                                        selectedTeacher.classrooms.length,
                                    )
                                  ]
                                }
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
              >
                Close
              </Button>
              <Button variant="default">
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
    </MainLayout>
  );
};

export default TeachersPage;
