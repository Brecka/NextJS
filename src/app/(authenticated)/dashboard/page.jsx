"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import {
  AlertTriangle,
  Bell,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileCheck,
  FilePlus,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Plus,
  Truck,
  Upload,
  UserPlus,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  // In a real app, this would come from your auth system
  const user = {
    name: "Sarah Johnson",
    role: "HR Manager",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Role-based content (in a real app, this would be fetched based on the user's role)
  const [userRole, setUserRole] = useState("hr") // Options: hr, training, operations, admin

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Greeting Panel */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-primary/10">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user.name}</h1>
            <p className="text-muted-foreground">
              {user.role} • {currentDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="relative">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
          </Button>
          <Button variant="outline" size="sm">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Full Dashboard
          </Button>
        </div>
      </div>

      {/* Role Selector (for demo purposes - in a real app, this would be determined by the user's role) */}
      <div className="inline-flex p-1 bg-muted rounded-lg">
        <Button
          variant={userRole === "hr" ? "default" : "ghost"}
          size="sm"
          onClick={() => setUserRole("hr")}
          className="rounded-md"
        >
          HR View
        </Button>
        <Button
          variant={userRole === "training" ? "default" : "ghost"}
          size="sm"
          onClick={() => setUserRole("training")}
          className="rounded-md"
        >
          Training View
        </Button>
        <Button
          variant={userRole === "operations" ? "default" : "ghost"}
          size="sm"
          onClick={() => setUserRole("operations")}
          className="rounded-md"
        >
          Operations View
        </Button>
        <Button
          variant={userRole === "admin" ? "default" : "ghost"}
          size="sm"
          onClick={() => setUserRole("admin")}
          className="rounded-md"
        >
          Admin View
        </Button>
      </div>

      {/* Role-Based Content */}
      <div className="space-y-6">
        {/* Compliance Overview */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Your Compliance Overview</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Complete</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRole === "hr" ? "42" : userRole === "training" ? "78" : userRole === "operations" ? "56" : "176"}
                </div>
                <p className="text-xs text-muted-foreground">Documents up to date</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Incomplete</CardTitle>
                <FileText className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRole === "hr" ? "7" : userRole === "training" ? "5" : userRole === "operations" ? "8" : "20"}
                </div>
                <p className="text-xs text-muted-foreground">Documents needing attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                <Clock className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRole === "hr" ? "5" : userRole === "training" ? "3" : userRole === "operations" ? "4" : "12"}
                </div>
                <p className="text-xs text-muted-foreground">Expiring in next 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRole === "hr" ? "3" : userRole === "training" ? "0" : userRole === "operations" ? "2" : "5"}
                </div>
                <p className="text-xs text-muted-foreground">Requires immediate action</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* HR Quick Actions */}
            {(userRole === "hr" || userRole === "admin") && (
              <>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-2">
                      <Upload className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Upload Document</h3>
                    <p className="text-xs text-muted-foreground mb-4">Add new staff documentation</p>
                    <Button size="sm" className="w-full">
                      Upload
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">View Staff</h3>
                    <p className="text-xs text-muted-foreground mb-4">Manage staff records</p>
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/staff">View</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-2">
                      <UserPlus className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Add New Staff</h3>
                    <p className="text-xs text-muted-foreground mb-4">Create new staff record</p>
                    <Button size="sm" className="w-full">
                      Add
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-2">
                      <FileCheck className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Background Checks</h3>
                    <p className="text-xs text-muted-foreground mb-4">Review background check status</p>
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/hr-tracking">Review</Link>
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Training Quick Actions */}
            {(userRole === "training" || userRole === "admin") && (
              <>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Schedule Training</h3>
                    <p className="text-xs text-muted-foreground mb-4">Create new training session</p>
                    <Button size="sm" className="w-full">
                      Schedule
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-2">
                      <FilePlus className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Log Training Hours</h3>
                    <p className="text-xs text-muted-foreground mb-4">Record completed training</p>
                    <Button size="sm" className="w-full">
                      Log Hours
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Training Reports</h3>
                    <p className="text-xs text-muted-foreground mb-4">View training completion</p>
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/training">View</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-2">
                      <CalendarClock className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Certification Calendar</h3>
                    <p className="text-xs text-muted-foreground mb-4">View upcoming renewals</p>
                    <Button size="sm" className="w-full">
                      View Calendar
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Operations Quick Actions */}
            {(userRole === "operations" || userRole === "admin") && (
              <>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-2">
                      <ClipboardCheck className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Compliance Tasks</h3>
                    <p className="text-xs text-muted-foreground mb-4">Manage compliance tasks</p>
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/operations">View</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-2">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Vehicle Records</h3>
                    <p className="text-xs text-muted-foreground mb-4">Manage transportation records</p>
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/transportation">View</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-2">
                      <Plus className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">New Compliance Task</h3>
                    <p className="text-xs text-muted-foreground mb-4">Create new compliance task</p>
                    <Button size="sm" className="w-full">
                      Create
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-2">
                      <FileCheck className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Audit Checklist</h3>
                    <p className="text-xs text-muted-foreground mb-4">Complete compliance audit</p>
                    <Button size="sm" className="w-full">
                      Start Audit
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {/* HR Recent Activity */}
                {userRole === "hr" &&
                  [
                    {
                      action: "Background check completed",
                      subject: "Emily Davis",
                      time: "2 hours ago",
                      icon: CheckCircle2,
                      iconColor: "text-green-500",
                    },
                    {
                      action: "New staff file uploaded",
                      subject: "Robert Wilson",
                      time: "Yesterday at 4:30 PM",
                      icon: Upload,
                      iconColor: "text-blue-500",
                    },
                    {
                      action: "Staff training certification expiring",
                      subject: "Jennifer Lee",
                      time: "Yesterday at 2:15 PM",
                      icon: Clock,
                      iconColor: "text-amber-500",
                    },
                    {
                      action: "Background check flagged for review",
                      subject: "Michael Brown",
                      time: "2 days ago",
                      icon: AlertTriangle,
                      iconColor: "text-red-500",
                    },
                    {
                      action: "Staff file updated",
                      subject: "Sarah Johnson",
                      time: "3 days ago",
                      icon: FileText,
                      iconColor: "text-slate-500",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4">
                      <div className={`p-2 rounded-full bg-muted ${activity.iconColor}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.subject}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}

                {/* Training Recent Activity */}
                {userRole === "training" &&
                  [
                    {
                      action: "Training session completed",
                      subject: "Safety Orientation - 5 attendees",
                      time: "1 hour ago",
                      icon: CheckCircle2,
                      iconColor: "text-green-500",
                    },
                    {
                      action: "New training scheduled",
                      subject: "Compliance Workshop - June 15",
                      time: "Yesterday at 3:45 PM",
                      icon: CalendarClock,
                      iconColor: "text-blue-500",
                    },
                    {
                      action: "Training certification expiring",
                      subject: "First Aid - 3 staff members",
                      time: "Yesterday at 10:30 AM",
                      icon: Clock,
                      iconColor: "text-amber-500",
                    },
                    {
                      action: "Training hours logged",
                      subject: "John Smith - 8 hours",
                      time: "2 days ago",
                      icon: FileText,
                      iconColor: "text-slate-500",
                    },
                    {
                      action: "Training materials updated",
                      subject: "Safety Procedures Manual",
                      time: "3 days ago",
                      icon: FileText,
                      iconColor: "text-slate-500",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4">
                      <div className={`p-2 rounded-full bg-muted ${activity.iconColor}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.subject}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}

                {/* Operations Recent Activity */}
                {userRole === "operations" &&
                  [
                    {
                      action: "Compliance task completed",
                      subject: "Quarterly Safety Audit",
                      time: "3 hours ago",
                      icon: CheckCircle2,
                      iconColor: "text-green-500",
                    },
                    {
                      action: "Vehicle inspection due",
                      subject: "Vehicle #103 - Maintenance Required",
                      time: "Yesterday at 2:15 PM",
                      icon: Truck,
                      iconColor: "text-amber-500",
                    },
                    {
                      action: "New compliance procedure added",
                      subject: "Emergency Response Protocol",
                      time: "Yesterday at 11:30 AM",
                      icon: FilePlus,
                      iconColor: "text-blue-500",
                    },
                    {
                      action: "Compliance task overdue",
                      subject: "Monthly Fire Extinguisher Check",
                      time: "2 days ago",
                      icon: AlertTriangle,
                      iconColor: "text-red-500",
                    },
                    {
                      action: "Checklist completed",
                      subject: "Daily Vehicle Inspection - 5 vehicles",
                      time: "3 days ago",
                      icon: ClipboardCheck,
                      iconColor: "text-green-500",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4">
                      <div className={`p-2 rounded-full bg-muted ${activity.iconColor}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.subject}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}

                {/* Admin sees all activity */}
                {userRole === "admin" &&
                  [
                    {
                      action: "Background check completed",
                      subject: "Emily Davis - HR",
                      time: "2 hours ago",
                      icon: CheckCircle2,
                      iconColor: "text-green-500",
                    },
                    {
                      action: "Training session completed",
                      subject: "Safety Orientation - Training",
                      time: "3 hours ago",
                      icon: GraduationCap,
                      iconColor: "text-blue-500",
                    },
                    {
                      action: "Compliance task overdue",
                      subject: "Monthly Fire Extinguisher Check - Operations",
                      time: "Yesterday",
                      icon: AlertTriangle,
                      iconColor: "text-red-500",
                    },
                    {
                      action: "Vehicle inspection due",
                      subject: "Vehicle #103 - Transportation",
                      time: "Yesterday",
                      icon: Truck,
                      iconColor: "text-amber-500",
                    },
                    {
                      action: "New staff added",
                      subject: "Robert Wilson - HR",
                      time: "2 days ago",
                      icon: UserPlus,
                      iconColor: "text-green-500",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4">
                      <div className={`p-2 rounded-full bg-muted ${activity.iconColor}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.subject}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 text-center">
              <Button variant="ghost" size="sm">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
