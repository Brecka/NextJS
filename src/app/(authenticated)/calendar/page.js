"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  AlertTriangle,
  FileText,
  GraduationCap,
  Shield,
  Clock,
  TrendingUp,
  Users,
  CheckCircle2,
} from "lucide-react"
import { ComplianceCalendar } from "@/components/compliance-calendar"
import { ComplianceTimeline } from "@/components/compliance-timeline"
import Link from "next/link"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedFilters, setSelectedFilters] = useState(["all"])
  const [view, setView] = useState("month") // month, week, day

  // Sample compliance events data
  const complianceEvents = [
    {
      id: 1,
      title: "Safety Training Renewal",
      type: "training",
      date: new Date(2024, 5, 15), // June 15, 2024
      dueDate: new Date(2024, 5, 15),
      priority: "high",
      assignedTo: ["John Smith", "Sarah Johnson"],
      status: "pending",
      description: "Annual safety training certification renewal required",
    },
    {
      id: 2,
      title: "Vehicle Inspection Audit",
      type: "audit",
      date: new Date(2024, 5, 20),
      dueDate: new Date(2024, 5, 20),
      priority: "medium",
      assignedTo: ["Michael Brown"],
      status: "scheduled",
      description: "Quarterly vehicle safety inspection",
    },
    {
      id: 3,
      title: "Background Check Expiration",
      type: "document",
      date: new Date(2024, 5, 25),
      dueDate: new Date(2024, 5, 25),
      priority: "high",
      assignedTo: ["Emily Davis"],
      status: "overdue",
      description: "Background check needs renewal",
    },
    {
      id: 4,
      title: "Fire Safety Drill",
      type: "compliance",
      date: new Date(2024, 5, 30),
      dueDate: new Date(2024, 5, 30),
      priority: "medium",
      assignedTo: ["All Staff"],
      status: "pending",
      description: "Monthly fire safety drill and evacuation procedure",
    },
    {
      id: 5,
      title: "Driver License Renewal",
      type: "document",
      date: new Date(2024, 6, 5), // July 5, 2024
      dueDate: new Date(2024, 6, 5),
      priority: "high",
      assignedTo: ["Robert Wilson"],
      status: "pending",
      description: "Commercial driver license renewal required",
    },
    {
      id: 6,
      title: "Compliance Audit Review",
      type: "audit",
      date: new Date(2024, 6, 10),
      dueDate: new Date(2024, 6, 10),
      priority: "high",
      assignedTo: ["HR Team"],
      status: "scheduled",
      description: "Quarterly compliance audit and documentation review",
    },
    {
      id: 7,
      title: "First Aid Certification",
      type: "training",
      date: new Date(2024, 6, 15),
      dueDate: new Date(2024, 6, 15),
      priority: "medium",
      assignedTo: ["Jennifer Lee", "David Martinez"],
      status: "pending",
      description: "First aid and CPR certification renewal",
    },
    {
      id: 8,
      title: "Annual Safety Review",
      type: "audit",
      date: new Date(2024, 7, 1), // August 1, 2024
      dueDate: new Date(2024, 7, 1),
      priority: "high",
      assignedTo: ["Safety Team"],
      status: "pending",
      description: "Annual comprehensive safety audit",
    },
    {
      id: 9,
      title: "Equipment Certification",
      type: "compliance",
      date: new Date(2024, 7, 15),
      dueDate: new Date(2024, 7, 15),
      priority: "medium",
      assignedTo: ["Operations Team"],
      status: "pending",
      description: "Heavy equipment certification renewal",
    },
    {
      id: 10,
      title: "DOT Physical Exams",
      type: "document",
      date: new Date(2024, 8, 1), // September 1, 2024
      dueDate: new Date(2024, 8, 1),
      priority: "high",
      assignedTo: ["All Drivers"],
      status: "pending",
      description: "Annual DOT physical examinations",
    },
    {
      id: 11,
      title: "Hazmat Training",
      type: "training",
      date: new Date(2024, 8, 20),
      dueDate: new Date(2024, 8, 20),
      priority: "high",
      assignedTo: ["Transport Team"],
      status: "pending",
      description: "Hazardous materials handling certification",
    },
    {
      id: 12,
      title: "Insurance Policy Review",
      type: "compliance",
      date: new Date(2024, 9, 1), // October 1, 2024
      dueDate: new Date(2024, 9, 1),
      priority: "medium",
      assignedTo: ["Admin Team"],
      status: "pending",
      description: "Annual insurance policy review and renewal",
    },
    {
      id: 13,
      title: "Winter Safety Training",
      type: "training",
      date: new Date(2024, 10, 15), // November 15, 2024
      dueDate: new Date(2024, 10, 15),
      priority: "medium",
      assignedTo: ["All Staff"],
      status: "pending",
      description: "Winter weather safety procedures training",
    },
    {
      id: 14,
      title: "Year-End Compliance Audit",
      type: "audit",
      date: new Date(2024, 11, 1), // December 1, 2024
      dueDate: new Date(2024, 11, 1),
      priority: "high",
      assignedTo: ["Management"],
      status: "pending",
      description: "Comprehensive year-end compliance review",
    },
  ]

  const eventTypes = [
    { value: "all", label: "All Events", icon: CalendarIcon, color: "bg-slate-500" },
    { value: "training", label: "Training", icon: GraduationCap, color: "bg-blue-500" },
    { value: "audit", label: "Audits", icon: Shield, color: "bg-purple-500" },
    { value: "document", label: "Documents", icon: FileText, color: "bg-green-500" },
    { value: "compliance", label: "Compliance", icon: AlertTriangle, color: "bg-orange-500" },
  ]

  const filteredEvents = selectedFilters.includes("all")
    ? complianceEvents
    : complianceEvents.filter((event) => selectedFilters.includes(event.type))

  const upcomingEvents = complianceEvents
    .filter((event) => event.dueDate >= new Date())
    .sort((a, b) => a.dueDate - b.dueDate)
    .slice(0, 5)

  const overdueEvents = complianceEvents.filter((event) => event.status === "overdue")

  // Today's events
  const todayEvents = complianceEvents.filter((event) => {
    const today = new Date()
    const eventDate = new Date(event.date)
    return eventDate.toDateString() === today.toDateString()
  })

  // This week's events
  const thisWeekEvents = complianceEvents.filter((event) => {
    const today = new Date()
    const weekFromNow = new Date()
    weekFromNow.setDate(weekFromNow.getDate() + 7)
    return event.dueDate >= today && event.dueDate <= weekFromNow
  })

  const toggleFilter = (filterValue) => {
    if (filterValue === "all") {
      setSelectedFilters(["all"])
    } else {
      const newFilters = selectedFilters.includes(filterValue)
        ? selectedFilters.filter((f) => f !== filterValue)
        : [...selectedFilters.filter((f) => f !== "all"), filterValue]

      setSelectedFilters(newFilters.length === 0 ? ["all"] : newFilters)
    }
  }

  const getEventIcon = (type) => {
    const eventType = eventTypes.find((t) => t.value === type)
    return eventType ? eventType.icon : CalendarIcon
  }

  const getEventColor = (type) => {
    const eventType = eventTypes.find((t) => t.value === type)
    return eventType ? eventType.color : "bg-slate-500"
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  // Get current date in a nice format
  const currentDateString = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Welcome Header with Today's Focus */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good morning! 👋</h1>
          <p className="text-muted-foreground">{currentDateString}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/roadmap">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Roadmap
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Today's Focus Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className={todayEvents.length > 0 ? "border-blue-200 bg-blue-50" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayEvents.length}</div>
            <p className="text-xs text-muted-foreground">
              {todayEvents.length === 0 ? "No events today" : "events due today"}
            </p>
          </CardContent>
        </Card>

        <Card className={thisWeekEvents.length > 0 ? "border-yellow-200 bg-yellow-50" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisWeekEvents.length}</div>
            <p className="text-xs text-muted-foreground">events due this week</p>
          </CardContent>
        </Card>

        <Card className={overdueEvents.length > 0 ? "border-red-200 bg-red-50" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueEvents.length}</div>
            <p className="text-xs text-muted-foreground">
              {overdueEvents.length === 0 ? "Nothing overdue!" : "items need attention"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Compliance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(((complianceEvents.length - overdueEvents.length) / complianceEvents.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">overall compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline View */}
      <ComplianceTimeline events={complianceEvents} startDate={new Date()} />

      {/* Alerts for overdue items */}
      {overdueEvents.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />🚨 Immediate Action Required ({overdueEvents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {overdueEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${getEventColor(event.type)} text-white`}>
                      {(() => {
                        const Icon = getEventIcon(event.type)
                        return <Icon className="h-3 w-3" />
                      })()}
                    </div>
                    <span className="font-medium">{event.title}</span>
                    <span className="text-sm text-muted-foreground">Due: {event.dueDate.toLocaleDateString()}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Resolve Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Event Type Filters */}
              <div className="flex flex-wrap gap-2 pt-4">
                {eventTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={selectedFilters.includes(type.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(type.value)}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-3 h-3 rounded-full ${type.color}`} />
                    <type.icon className="h-3 w-3" />
                    {type.label}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ComplianceCalendar events={filteredEvents} currentDate={currentDate} onDateChange={setCurrentDate} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Events */}
          {todayEvents.length > 0 && (
            <Card className="border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <CalendarIcon className="h-5 w-5" />
                  Today's Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-lg space-y-2 bg-blue-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${getEventColor(event.type)} text-white`}>
                          {(() => {
                            const Icon = getEventIcon(event.type)
                            return <Icon className="h-3 w-3" />
                          })()}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(event.priority)}>{event.priority}</Badge>
                    </div>
                    <Button size="sm" className="w-full">
                      Take Action
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Coming Up
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${getEventColor(event.type)} text-white`}>
                        {(() => {
                          const Icon = getEventIcon(event.type)
                          return <Icon className="h-3 w-3" />
                        })()}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.dueDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(event.priority)}>{event.priority}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {Array.isArray(event.assignedTo) ? event.assignedTo.join(", ") : event.assignedTo}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Navigation */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link href="/staff">
                  <Users className="mr-2 h-4 w-4" />
                  Staff Directory
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link href="/roadmap">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Compliance Roadmap
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link href="/documents">
                  <FileText className="mr-2 h-4 w-4" />
                  Document Review
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
