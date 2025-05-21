import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
                    <TableHeader>Files</TableHeader>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {["1","2","3","4","5","6","7"].map((id, i) => {
                    const staff = [
                      { name: "John Smith", position: "Manager", department: "Operations", hireDate: "Jan 15, 2020", status: "active", files: { total: 12, complete: 12 } },
                      { name: "Sarah Johnson", position: "Supervisor", department: "HR", hireDate: "Mar 10, 2021", status: "active", files: { total: 12, complete: 12 } },
                      { name: "Michael Brown", position: "Staff", department: "Transportation", hireDate: "May 22, 2022", status: "active", files: { total: 12, complete: 10 } },
                      { name: "Emily Davis", position: "Staff", department: "Operations", hireDate: "Jun 5, 2022", status: "active", files: { total: 12, complete: 12 } },
                      { name: "Robert Wilson", position: "Staff", department: "Transportation", hireDate: "Apr 30, 2023", status: "active", files: { total: 12, complete: 8 } },
                      { name: "Jennifer Lee", position: "Staff", department: "HR", hireDate: "Apr 15, 2023", status: "active", files: { total: 12, complete: 9 } },
                      { name: "David Martinez", position: "Staff", department: "Operations", hireDate: "Mar 20, 2023", status: "inactive", files: { total: 12, complete: 12 } },
                    ][i];
                    return (
                      <TableRow key={id}>
                        <TableCell className="font-medium">
                          <Link href={`/staff/${id}`} className="hover:underline">
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
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/staff/${id}`}>
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View details</span>
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents (active, inactive, incomplete) would go here */}
      </Tabs>
    </div>
  )
}
