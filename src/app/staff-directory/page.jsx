import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Badge } from "@/components/ui/Badge"
import { Download, FileText, Filter, Search, SlidersHorizontal, Upload, UserPlus } from "lucide-react"
import Link from "next/link"

export default function StaffDirectory() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Staff Directory</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search staff by name, position, or department..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Advanced
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="incomplete">Incomplete Files</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Staff Members</CardTitle>
              <CardDescription>Manage staff information and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Position</TableHeader>
                    <TableHeader>Department</TableHeader>
                    <TableHeader>Hire Date</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>erFiles</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Badge #</TableHeader>
                    <TableHeader className="text-right">Actions</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      id: "1",
                      name: "John Smith",
                      position: "Manager",
                      department: "Operations",
                      hireDate: "Jan 15, 2020",
                      status: "active",
                      files: { total: 12, complete: 12 },
                      email: "john.smith@company.com",
                      badgeNumber: "B-1001",
                    },
                    {
                      id: "2",
                      name: "Sarah Johnson",
                      position: "Supervisor",
                      department: "HR",
                      hireDate: "Mar 10, 2021",
                      status: "active",
                      files: { total: 12, complete: 12 },
                      email: "sarah.johnson@company.com",
                      badgeNumber: "B-1002",
                    },
                    {
                      id: "3",
                      name: "Michael Brown",
                      position: "Staff",
                      department: "Transportation",
                      hireDate: "May 22, 2022",
                      status: "active",
                      files: { total: 12, complete: 10 },
                      email: "michael.brown@company.com",
                      badgeNumber: "B-1003",
                    },
                    {
                      id: "4",
                      name: "Emily Davis",
                      position: "Staff",
                      department: "Operations",
                      hireDate: "Jun 5, 2022",
                      status: "active",
                      files: { total: 12, complete: 12 },
                      email: "emily.davis@company.com",
                      badgeNumber: "B-1004",
                    },
                    {
                      id: "5",
                      name: "Robert Wilson",
                      position: "Staff",
                      department: "Transportation",
                      hireDate: "Apr 30, 2023",
                      status: "active",
                      files: { total: 12, complete: 8 },
                      email: "robert.wilson@company.com",
                      badgeNumber: "B-1005",
                    },
                    {
                      id: "6",
                      name: "Jennifer Lee",
                      position: "Staff",
                      department: "HR",
                      hireDate: "Apr 15, 2023",
                      status: "active",
                      files: { total: 12, complete: 9 },
                      email: "jennifer.lee@company.com",
                      badgeNumber: "B-1006",
                    },
                    {
                      id: "7",
                      name: "David Martinez",
                      position: "Staff",
                      department: "Operations",
                      hireDate: "Mar 20, 2023",
                      status: "inactive",
                      files: { total: 12, complete: 12 },
                      badgeNumber: "B-1007",
                    },
                  ].map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">
                        <Link href={`/staff/${staff.id}`} className="hover:underline">
                          {staff.name}
                        </Link>
                      </TableCell>
                      <TableCell>{staff.position}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.hireDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            staff.status === "active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-slate-100 text-slate-800 hover:bg-slate-100"
                          }
                        >
                          {staff.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span
                            className={
                              staff.files.complete === staff.files.total
                                ? "text-green-600 font-medium"
                                : "text-amber-600 font-medium"
                            }
                          >
                            {staff.files.complete}/{staff.files.total}
                          </span>
                          {staff.files.complete !== staff.files.total && (
                            <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100">Incomplete</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {staff.email || `${staff.name.toLowerCase().replace(/\s+/g, ".")}@company.com`}
                      </TableCell>
                      <TableCell>
                        {staff.badgeNumber ? (
                          <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">{staff.badgeNumber}</span>
                        ) : (
                          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                            Missing
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/staff/${staff.id}`}>
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {/* Similar content as "all" tab but filtered for active staff */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Active Staff Members</CardTitle>
              <CardDescription>Currently active staff in the system</CardDescription>
            </CardHeader>
            <CardContent>{/* Table content similar to "all" tab but filtered */}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          {/* Similar content as "all" tab but filtered for inactive staff */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Inactive Staff Members</CardTitle>
              <CardDescription>Staff members who are no longer active</CardDescription>
            </CardHeader>
            <CardContent>{/* Table content similar to "all" tab but filtered */}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incomplete" className="space-y-4">
          {/* Similar content as "all" tab but filtered for staff with incomplete files */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Staff with Incomplete Files</CardTitle>
              <CardDescription>Staff members missing required documentation</CardDescription>
            </CardHeader>
            <CardContent>{/* Table content similar to "all" tab but filtered */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
