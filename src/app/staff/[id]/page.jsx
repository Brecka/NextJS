import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/Separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { ArrowLeft, Calendar, Download, Edit, Eye, File, FileText, Mail, Phone, Upload } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function StaffDetail({ params }) {
  const staffMember = {
    id: params.id,
    name: "John Smith",
    position: "Manager",
    department: "Operations",
    email: "john.smith@company.com",
    phone: "(555) 123-4567",
    hireDate: "January 15, 2020",
    status: "active",
    profileImage: "/placeholder.svg?height=200&width=200",
    files: [
      { id: "1", name: "Employment Contract", type: "PDF", category: "Employment", dateUploaded: "Jan 15, 2020", status: "current", expiryDate: "N/A" },
      { id: "2", name: "Background Check", type: "PDF", category: "Compliance", dateUploaded: "Jan 10, 2020", status: "current", expiryDate: "Jan 10, 2024" },
      { id: "3", name: "Driver's License", type: "Image", category: "Identification", dateUploaded: "Jan 12, 2020", status: "expiring", expiryDate: "Jun 15, 2023" },
      { id: "4", name: "Emergency Contact Form", type: "PDF", category: "Personal", dateUploaded: "Jan 15, 2020", status: "current", expiryDate: "N/A" },
      { id: "5", name: "Training Certificate - Safety", type: "PDF", category: "Training", dateUploaded: "Feb 20, 2020", status: "current", expiryDate: "Feb 20, 2024" },
      { id: "6", name: "Performance Review 2022", type: "PDF", category: "Performance", dateUploaded: "Dec 15, 2022", status: "current", expiryDate: "N/A" },
      { id: "7", name: "Medical Clearance", type: "PDF", category: "Health", dateUploaded: "Jan 20, 2020", status: "expired", expiryDate: "Jan 20, 2023" },
      { id: "8", name: "Tax Form W-4", type: "PDF", category: "Financial", dateUploaded: "Jan 15, 2020", status: "current", expiryDate: "N/A" },
      { id: "9", name: "Direct Deposit Authorization", type: "PDF", category: "Financial", dateUploaded: "Jan 15, 2020", status: "current", expiryDate: "N/A" },
      { id: "10", name: "Non-Disclosure Agreement", type: "PDF", category: "Legal", dateUploaded: "Jan 15, 2020", status: "current", expiryDate: "N/A" },
      { id: "11", name: "Employee Handbook Acknowledgment", type: "PDF", category: "Employment", dateUploaded: "Jan 16, 2020", status: "current", expiryDate: "N/A" },
      { id: "12", name: "Professional Certification", type: "PDF", category: "Qualification", dateUploaded: "Mar 10, 2020", status: "current", expiryDate: "Mar 10, 2025" },
    ],
    complianceStatus: { total: 12, complete: 12, expiring: 1, expired: 1 },
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/staff">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Directory
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-1/3">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>Staff Profile</CardTitle>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Image src={staffMember.profileImage} alt={staffMember.name} width={100} height={100} className="rounded-full border" />
                <Badge className={`absolute bottom-0 right-0 ${staffMember.status === "active" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"}`}>{staffMember.status === "active" ? "Active" : "Inactive"}</Badge>
              </div>
              <h3 className="text-xl font-bold">{staffMember.name}</h3>
              <p className="text-muted-foreground">{staffMember.position} • {staffMember.department}</p>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /><span>{staffMember.email}</span></div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /><span>{staffMember.phone}</span></div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span>Hired: {staffMember.hireDate}</span></div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Compliance Status</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center p-2 bg-muted rounded-md"><span className="text-sm text-muted-foreground">Complete</span><span className="text-xl font-bold text-green-600">{staffMember.complianceStatus.complete}</span></div>
                <div className="flex flex-col items-center p-2 bg-muted rounded-md"><span className="text-sm text-muted-foreground">Total</span><span className="text-xl font-bold">{staffMember.complianceStatus.total}</span></div>
                <div className="flex flex-col items-center p-2 bg-muted rounded-md"><span className="text-sm text-muted-foreground">Expiring</span><span className="text-xl font-bold text-amber-600">{staffMember.complianceStatus.expiring}</span></div>
                <div className="flex flex-col items-center p-2 bg-muted rounded-md"><span className="text-sm text-muted-foreground">Expired</span><span className="text-xl font-bold text-red-600">{staffMember.complianceStatus.expired}</span></div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1"><Phone className="h-4 w-4 mr-2" /> Contact</Button>
              <Button className="flex-1"><FileText className="h-4 w-4 mr-2" /> Report</Button>
            </div>
          </CardFooter>
        </Card>

        <div className="flex-1 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Staff Files</CardTitle>
                  <CardDescription>View and manage documentation for {staffMember.name}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Download All</Button>
                  <Button size="sm"><Upload className="h-4 w-4 mr-2" /> Upload File</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All Files</TabsTrigger>
                  <TabsTrigger value="employment">Employment</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="training">Training</TabsTrigger>
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {staffMember.files.map((file) => (
                    <Card key={file.id} className="overflow-hidden">
                      <CardHeader className="p-4 pb-2 flex flex-row items-start gap-2">
                        <div className={`p-2 rounded-md ${file.type === "PDF" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                          {file.type === "PDF" ? <FileText className="h-4 w-4" /> : <File className="h-4 w-4" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <CardTitle className="text-base">{file.name}</CardTitle>
                          <CardDescription className="text-xs">{file.category} • {file.type}</CardDescription>
                        </div>
                        <Badge className={file.status === "current" ? "bg-green-100 text-green-800" : file.status === "expiring" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}>{file.status}</Badge>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-xs text-muted-foreground space-y-1">
                        <div className="flex justify-between"><span>Uploaded:</span><span>{file.dateUploaded}</span></div>
                        <div className="flex justify-between"><span>Expires:</span><span>{file.expiryDate}</span></div>
                      </CardContent>
                      <CardFooter className="p-2 bg-muted/50 flex justify-between">
                        <Button variant="ghost" size="sm"><Eye className="h-3.5 w-3.5 mr-1" /> View</Button>
                        <Button variant="ghost" size="sm"><Download className="h-3.5 w-3.5 mr-1" /> Download</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
//     </div>
//   )