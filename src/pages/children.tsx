import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChildProps {
  id: string;
  name: string;
  age: number;
  gender: string;
  classroom: string;
  guardians: string[];
  allergies: string[];
  attendanceRate: number;
  imageUrl?: string;
}

const ChildrenPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [showAddChildDialog, setShowAddChildDialog] = useState(false);

  // Mock data for children
  const childrenData: ChildProps[] = [
    {
      id: "1",
      name: "Emma Johnson",
      age: 4,
      gender: "Female",
      classroom: "Sunshine Room",
      guardians: ["Sarah Johnson", "Michael Johnson"],
      allergies: ["Peanuts", "Dairy"],
      attendanceRate: 95,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    },
    {
      id: "2",
      name: "Noah Williams",
      age: 3,
      gender: "Male",
      classroom: "Rainbow Room",
      guardians: ["Jennifer Williams", "David Williams"],
      allergies: [],
      attendanceRate: 88,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=noah",
    },
    {
      id: "3",
      name: "Olivia Davis",
      age: 5,
      gender: "Female",
      classroom: "Star Room",
      guardians: ["Emily Davis"],
      allergies: ["Eggs"],
      attendanceRate: 92,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
    },
    {
      id: "4",
      name: "Liam Brown",
      age: 2,
      gender: "Male",
      classroom: "Cloud Room",
      guardians: ["Jessica Brown", "Robert Brown"],
      allergies: [],
      attendanceRate: 85,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=liam",
    },
    {
      id: "5",
      name: "Ava Miller",
      age: 4,
      gender: "Female",
      classroom: "Sunshine Room",
      guardians: ["Amanda Miller", "John Miller"],
      allergies: ["Gluten"],
      attendanceRate: 90,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ava",
    },
    {
      id: "6",
      name: "Ethan Wilson",
      age: 3,
      gender: "Male",
      classroom: "Rainbow Room",
      guardians: ["Michelle Wilson"],
      allergies: [],
      attendanceRate: 94,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ethan",
    },
    {
      id: "7",
      name: "Sophia Martinez",
      age: 5,
      gender: "Female",
      classroom: "Star Room",
      guardians: ["Maria Martinez", "Carlos Martinez"],
      allergies: ["Shellfish"],
      attendanceRate: 97,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia",
    },
    {
      id: "8",
      name: "Mason Taylor",
      age: 2,
      gender: "Male",
      classroom: "Cloud Room",
      guardians: ["Lisa Taylor", "James Taylor"],
      allergies: ["Peanuts"],
      attendanceRate: 89,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mason",
    },
  ];

  // Filter children based on search query and selected tab
  const filteredChildren = childrenData.filter((child) => {
    const matchesSearch =
      child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.classroom.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "toddlers") return matchesSearch && child.age <= 3;
    if (selectedTab === "preschool") return matchesSearch && child.age > 3;

    return matchesSearch;
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b bg-white px-6 shadow-sm">
        <h1 className="text-2xl font-bold text-primary">Children</h1>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search children..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Add Child Button */}
          <Button onClick={() => setShowAddChildDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Child
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setSelectedTab}
          >
            <TabsList>
              <TabsTrigger value="all">All Children</TabsTrigger>
              <TabsTrigger value="toddlers">Toddlers (0-3)</TabsTrigger>
              <TabsTrigger value="preschool">Preschool (4-5)</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button variant="outline" className="ml-4">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        {filteredChildren.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No children found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
            <Button
              className="mt-6"
              onClick={() => setShowAddChildDialog(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Child
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredChildren.map((child) => (
              <ChildCard key={child.id} child={child} />
            ))}
          </div>
        )}
      </main>

      {/* Add Child Dialog */}
      <Dialog open={showAddChildDialog} onOpenChange={setShowAddChildDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Child</DialogTitle>
            <DialogDescription>
              Enter the child's information below. Required fields are marked
              with an asterisk (*).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </label>
                <Input id="name" placeholder="Enter child's full name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="dob" className="text-sm font-medium">
                  Date of Birth *
                </label>
                <Input id="dob" type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="gender" className="text-sm font-medium">
                  Gender *
                </label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="classroom" className="text-sm font-medium">
                  Classroom *
                </label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">Select classroom</option>
                  <option value="sunshine">Sunshine Room</option>
                  <option value="rainbow">Rainbow Room</option>
                  <option value="star">Star Room</option>
                  <option value="cloud">Cloud Room</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="allergies" className="text-sm font-medium">
                Allergies
              </label>
              <Input
                id="allergies"
                placeholder="Enter allergies separated by commas"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium">
                Guardian Information *
              </label>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Guardian name" />
                  <Input placeholder="Phone number" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Relationship" />
                  <Input placeholder="Email" type="email" />
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-2 w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Another Guardian
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddChildDialog(false)}
            >
              Cancel
            </Button>
            <Button>Save Child</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ChildCard = ({ child }: { child: ChildProps }) => {
  const [showChildDetails, setShowChildDetails] = useState(false);

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative">
            <div className="absolute right-2 top-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/80"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowChildDetails(true)}>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-col items-center bg-primary/10 p-6">
              <Avatar className="h-20 w-20 border-4 border-white">
                <AvatarImage src={child.imageUrl} alt={child.name} />
                <AvatarFallback className="text-lg">
                  {child.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{child.name}</h3>
              <p className="text-sm text-muted-foreground">
                {child.age} years old • {child.gender}
              </p>
              <div className="mt-2">
                <Badge variant="outline" className="bg-primary/5">
                  {child.classroom}
                </Badge>
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <div>
                  <p className="font-medium">Guardians</p>
                  <p className="text-muted-foreground">
                    {child.guardians.length}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Allergies</p>
                  <p className="text-muted-foreground">
                    {child.allergies.length || "None"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Attendance</p>
                  <p
                    className={cn(
                      child.attendanceRate >= 90
                        ? "text-green-600"
                        : child.attendanceRate >= 80
                          ? "text-amber-600"
                          : "text-red-600",
                    )}
                  >
                    {child.attendanceRate}%
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => setShowChildDetails(true)}
              >
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Child Details Dialog */}
      <Dialog open={showChildDetails} onOpenChange={setShowChildDetails}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Child Profile</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-[200px_1fr] gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 border-4 border-white shadow">
                <AvatarImage src={child.imageUrl} alt={child.name} />
                <AvatarFallback className="text-3xl">
                  {child.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">{child.name}</h2>
              <p className="text-muted-foreground">
                {child.age} years old • {child.gender}
              </p>
              <Badge className="mt-2">{child.classroom}</Badge>
              <div className="mt-4 w-full">
                <div className="rounded-lg bg-primary/5 p-3 text-center">
                  <p className="text-sm font-medium">Attendance Rate</p>
                  <p
                    className={cn(
                      "text-2xl font-bold",
                      child.attendanceRate >= 90
                        ? "text-green-600"
                        : child.attendanceRate >= 80
                          ? "text-amber-600"
                          : "text-red-600",
                    )}
                  >
                    {child.attendanceRate}%
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Basic Info</TabsTrigger>
                  <TabsTrigger value="guardians">Guardians</TabsTrigger>
                  <TabsTrigger value="health">Health & Safety</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Full Name
                      </h3>
                      <p>{child.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Date of Birth
                      </h3>
                      <p>January 15, 2019</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Age
                      </h3>
                      <p>{child.age} years old</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Gender
                      </h3>
                      <p>{child.gender}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Classroom
                      </h3>
                      <p>{child.classroom}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Enrollment Date
                      </h3>
                      <p>September 1, 2022</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="guardians" className="mt-4">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {child.guardians.map((guardian, index) => (
                        <div key={index} className="rounded-lg border p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback>
                                  {guardian
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{guardian}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {index === 0
                                    ? "Primary Guardian"
                                    : "Secondary Guardian"}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                          <Separator className="my-3" />
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="font-medium">Phone</p>
                              <p className="text-muted-foreground">
                                (555) 123-{4567 + index}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Email</p>
                              <p className="text-muted-foreground">
                                {guardian.toLowerCase().replace(" ", ".")}
                                @example.com
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Relationship</p>
                              <p className="text-muted-foreground">
                                {index % 2 === 0 ? "Mother" : "Father"}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Authorized Pickup</p>
                              <p className="text-muted-foreground">Yes</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="health" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Allergies
                      </h3>
                      {child.allergies.length > 0 ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {child.allergies.map((allergy, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-red-50 text-red-700"
                            >
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p>No known allergies</p>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Medical Conditions
                      </h3>
                      <p>None reported</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Medications
                      </h3>
                      <p>None</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Emergency Contact
                      </h3>
                      <p>{child.guardians[0]}</p>
                      <p className="text-sm text-muted-foreground">
                        (555) 123-4567
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Doctor Information
                      </h3>
                      <p>Dr. Sarah Thompson</p>
                      <p className="text-sm text-muted-foreground">
                        (555) 987-6543
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowChildDetails(false)}
            >
              Close
            </Button>
            <Button>
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChildrenPage;
