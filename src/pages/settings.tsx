import React from "react";
import { useForm } from "react-hook-form";
import {
  Bell,
  User,
  Shield,
  Mail,
  Moon,
  Sun,
  Globe,
  Volume2,
  VolumeX,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SettingsFormValues {
  name: string;
  email: string;
  password: string;
  notifications: boolean;
  darkMode: boolean;
  language: string;
  sound: boolean;
}

const SettingsPage = () => {
  const form = useForm<SettingsFormValues>({
    defaultValues: {
      name: "Admin User",
      email: "admin@daycaremanager.com",
      password: "",
      notifications: true,
      darkMode: false,
      language: "English",
      sound: true,
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    console.log("Settings updated:", data);
    // In a real app, this would save the settings to a backend
  };

  return (
    <div className="container mx-auto p-6 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User size={16} />
            Account
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell size={16} />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Sun size={16} />
            Appearance
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Your email"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          We'll use this email to contact you.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="notifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Email Notifications
                          </FormLabel>
                          <FormDescription>
                            Receive email notifications about important events
                            and updates.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Notification Types</h3>
                    <div className="grid gap-4">
                      {[
                        {
                          title: "Child Check-ins",
                          description: "When a child is checked in or out",
                        },
                        {
                          title: "Incident Reports",
                          description: "When a new incident report is filed",
                        },
                        {
                          title: "Calendar Events",
                          description: "Reminders about upcoming events",
                        },
                        {
                          title: "Staff Updates",
                          description:
                            "Changes to teacher schedules or assignments",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <Switch defaultChecked={i < 2} />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Change Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="New password"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Password must be at least 8 characters long and
                          include a number.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">
                          Enable Two-Factor Authentication
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="darkMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5 flex items-center gap-2">
                          {field.value ? <Moon size={18} /> : <Sun size={18} />}
                          <div>
                            <FormLabel className="text-base">
                              Dark Mode
                            </FormLabel>
                            <FormDescription>
                              Switch between light and dark theme
                            </FormDescription>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5 flex items-center gap-2">
                          <Globe size={18} />
                          <div>
                            <FormLabel className="text-base">
                              Language
                            </FormLabel>
                            <FormDescription>
                              Select your preferred language
                            </FormDescription>
                          </div>
                        </div>
                        <FormControl>
                          <select
                            className="h-9 w-40 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            {...field}
                          >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sound"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5 flex items-center gap-2">
                          {field.value ? (
                            <Volume2 size={18} />
                          ) : (
                            <VolumeX size={18} />
                          )}
                          <div>
                            <FormLabel className="text-base">
                              Sound Effects
                            </FormLabel>
                            <FormDescription>
                              Enable sound effects for notifications and actions
                            </FormDescription>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex justify-end">
              <Button type="submit" className="w-32">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
