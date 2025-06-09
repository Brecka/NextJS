"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileUp,
  ArrowLeft,
  FileCheck,
  Users,
  Building,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  Filter,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Department configuration
const departmentConfig = {
  hr: {
    name: "Human Resources",
    icon: Users,
    color: "bg-blue-100 text-blue-700",
    documentTypes: [
      "Employee Contracts",
      "Background Checks",
      "Medical Certificates",
      "Tax Forms",
      "Performance Reviews",
      "Benefit Enrollments",
    ],
  },
  operations: {
    name: "Operations",
    icon: Building,
    color: "bg-amber-100 text-amber-700",
    documentTypes: [
      "Safety Protocols",
      "Equipment Certifications",
      "Inspection Reports",
      "Maintenance Logs",
      "Incident Reports",
      "Standard Operating Procedures",
    ],
  },
  transportation: {
    name: "Transportation",
    icon: FileCheck,
    color: "bg-green-100 text-green-700",
    documentTypes: [
      "Vehicle Registrations",
      "Driver Licenses",
      "Insurance Documents",
      "Route Permits",
      "Maintenance Records",
      "Inspection Certificates",
    ],
  },
  training: {
    name: "Training & Development",
    icon: FileText,
    color: "bg-purple-100 text-purple-700",
    documentTypes: [
      "Training Certificates",
      "Course Completions",
      "Skill Assessments",
      "Continuing Education",
      "Training Materials",
      "Instructor Certifications",
    ],
  },
}

// Mock data for documents
const generateMockDocuments = (departmentId) => {
  const docTypes = departmentConfig[departmentId].documentTypes
  const statuses = ["Valid", "Expiring Soon", "Expired", "Missing"]
  const dates = ["2023-12-15", "2024-01-10", "2024-02-22", "2024-03-05", "2024-04-18", "2024-05-30"]

  return Array.from({ length: 20 }, (_, i) => ({
    id: `doc-${departmentId}-${i}`,
    name: `${docTypes[i % docTypes.length]} ${i + 1}`,
    type: docTypes[i % docTypes.length],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    uploadDate: dates[Math.floor(Math.random() * dates.length)],
    expiryDate: Math.random() > 0.3 ? dates[Math.floor(Math.random() * dates.length)] : null,
    assignedTo: `Person ${(i % 5) + 1}`,
    lastUpdated: `${Math.floor(Math.random() * 10) + 1} days ago`,
  }))
}

export default function DepartmentDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const departmentId = params.department 

  // Check if department exists
  useEffect(() => {
    if (!departmentConfig[departmentId]) {
      router.push("/department-management")
    }
  }, [departmentId, router])

  // If department doesn't exist in our config, show loading or redirect
  if (!departmentConfig[departmentId]) {
    return <div className="p-8 text-center">Loading...</div>
  }

  const department = departmentConfig[departmentId]
  const DepartmentIcon = department.icon

  // Generate mock data
  const documents = generateMockDocuments(departmentId)

  // Calculate statistics
  const validCount = documents.filter((doc) => doc.status === "Valid").length
  const expiringCount = documents.filter((doc) => doc.status === "Expiring Soon").length
  const expiredCount = documents.filter((doc) => doc.status === "Expired").length
  const missingCount = documents.filter((doc) => doc.status === "Missing").length
  const totalCount = documents.length
  const complianceRate = Math.round((validCount / totalCount) * 100)

  // Document type distribution
  const docTypeDistribution = {}
  department.documentTypes.forEach((type) => {
    docTypeDistribution[type] = documents.filter((doc) => doc.type === type).length
  })

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" onClick={() => router.push("/department-management")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-md ${department.color.split(" ")[0]}`}>
            <DepartmentIcon className={`h-5 w-5 ${department.color.split(" ")[1]}`} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{department.name} Dashboard</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceRate}%</div>
            <Progress value={complianceRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valid Documents</CardTitle>
          </CardHeader>
          <CardContent className="flex items-baseline justify-between">
            <div className="text-2xl font-bold">{validCount}</div>
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              <span className="text-sm">{Math.round((validCount / totalCount) * 100)}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent className="flex items-baseline justify-between">
            <div className="text-2xl font-bold">{expiringCount}</div>
            <div className="flex items-center text-amber-600">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{Math.round((expiringCount / totalCount) * 100)}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expired/Missing</CardTitle>
          </CardHeader>
          <CardContent className="flex items-baseline justify-between">
            <div className="text-2xl font-bold">{expiredCount + missingCount}</div>
            <div className="flex items-center text-red-600">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span className="text-sm">{Math.round(((expiredCount + missingCount) / totalCount) * 100)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Document Status</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  This Month
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
            </div>
            <CardDescription>Overview of all {department.name} documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left p-3 text-sm font-medium">Document Name</th>
                    <th className="text-left p-3 text-sm font-medium">Type</th>
                    <th className="text-left p-3 text-sm font-medium">Status</th>
                    <th className="text-left p-3 text-sm font-medium">Expiry Date</th>
                    <th className="text-left p-3 text-sm font-medium">Assigned To</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.slice(0, 5).map((doc) => (
                    <tr key={doc.id} className="border-b last:border-0">
                      <td className="p-3">{doc.name}</td>
                      <td className="p-3">{doc.type}</td>
                      <td className="p-3">
                        <Badge
                          variant={
                            doc.status === "Valid"
                              ? "success"
                              : doc.status === "Expiring Soon"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {doc.status}
                        </Badge>
                      </td>
                      <td className="p-3">{doc.expiryDate || "N/A"}</td>
                      <td className="p-3">{doc.assignedTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="outline" size="sm">
                View All Documents
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Types</CardTitle>
            <CardDescription>Distribution by document category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(docTypeDistribution).map(([type, count]) => (
                <div key={type}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{type}</span>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                  <Progress value={((count as number) / totalCount) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Expirations</CardTitle>
            <CardDescription>Documents expiring in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents
                .filter((doc) => doc.status === "Expiring Soon")
                .slice(0, 4)
                .map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">Expires: {doc.expiryDate}</p>
                    </div>
                    <Badge variant="outline">{doc.assignedTo}</Badge>
                  </div>
                ))}

              {documents.filter((doc) => doc.status === "Expiring Soon").length === 0 && (
                <div className="text-center py-4 text-muted-foreground">No upcoming expirations</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Action Items</CardTitle>
            <CardDescription>Required actions for compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiredCount > 0 && (
                <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-100 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800">Expired Documents</p>
                    <p className="text-sm text-red-600">
                      {expiredCount} document(s) have expired and need immediate attention.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2 border-red-200 text-red-700 hover:bg-red-50">
                      View Expired
                    </Button>
                  </div>
                </div>
              )}

              {missingCount > 0 && (
                <div className="flex items-start space-x-3 p-3 bg-amber-50 border border-amber-100 rounded-md">
                  <XCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">Missing Documents</p>
                    <p className="text-sm text-amber-600">
                      {missingCount} required document(s) are missing from the system.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 border-amber-200 text-amber-700 hover:bg-amber-50"
                    >
                      Upload Missing
                    </Button>
                  </div>
                </div>
              )}

              {expiringCount > 0 && (
                <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">Expiring Soon</p>
                    <p className="text-sm text-blue-600">
                      {expiringCount} document(s) will expire in the next 30 days.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2 border-blue-200 text-blue-700 hover:bg-blue-50">
                      Renew Documents
                    </Button>
                  </div>
                </div>
              )}

              {expiredCount === 0 && missingCount === 0 && expiringCount === 0 && (
                <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-100 rounded-md">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">All Compliant</p>
                    <p className="text-sm text-green-600">All documents are up to date and compliant. Great job!</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Link href={`/department-upload/${departmentId}`}>
          <Button>
            <FileUp className="mr-2 h-4 w-4" />
            Upload Documents
          </Button>
        </Link>
      </div>
    </div>
  )
}
