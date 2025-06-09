"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Checkbox } from "@/components/ui/Checkbox"
import { AlertCircle, CheckCircle2, Clock, Download, FileCheck, FileText, Filter, History, Mail, RefreshCw, Search, Upload, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { Separator } from "@/components/ui/Separator"
import { toast } from "@/hooks/use-toast"

export default function DocumentReview() {
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [renewDialogOpen, setRenewDialogOpen] = useState(false)
  const [bulkReminderDialogOpen, setBulkReminderDialogOpen] = useState(false)

  // Bulk actions state
  const [selectedDocuments, setSelectedDocuments] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  // Mock document data
  const documents = [
    {
      id: "DOC-001",
      name: "Driver's License",
      staff: "John Smith",
      department: "Operations",
      dateReceived: "2023-05-15",
      validThrough: "2027-05-15",
      status: "approved",
      reviewedBy: "Sarah Johnson",
      reviewDate: "2023-05-16",
      renewalCycle: "4 years",
      documentType: "identification",
      email: "john.smith@company.com",
      versions: [
        {
          id: "v1",
          dateReceived: "2019-05-10",
          validThrough: "2023-05-10",
          status: "archived",
          reviewedBy: "Michael Brown",
          reviewDate: "2019-05-12",
        },
      ],
    },
    {
      id: "DOC-002",
      name: "Background Check",
      staff: "Emily Davis",
      department: "HR",
      dateReceived: "2023-01-20",
      validThrough: "2024-01-20",
      status: "approved",
      reviewedBy: "Sarah Johnson",
      reviewDate: "2023-01-22",
      renewalCycle: "1 year",
      documentType: "compliance",
      email: "emily.davis@company.com",
      versions: [
        {
          id: "v1",
          dateReceived: "2022-01-15",
          validThrough: "2023-01-15",
          status: "archived",
          reviewedBy: "Sarah Johnson",
          reviewDate: "2022-01-17",
        },
      ],
    },
    {
      id: "DOC-003",
      name: "TB Test Results",
      staff: "Michael Brown",
      department: "Operations",
      dateReceived: "2023-03-10",
      validThrough: "2024-03-10",
      status: "approved",
      reviewedBy: "Robert Wilson",
      reviewDate: "2023-03-12",
      renewalCycle: "1 year",
      documentType: "medical",
      email: "michael.brown@company.com",
      versions: [
        {
          id: "v1",
          dateReceived: "2022-03-05",
          validThrough: "2023-03-05",
          status: "archived",
          reviewedBy: "Sarah Johnson",
          reviewDate: "2022-03-07",
        },
      ],
    },
    {
      id: "DOC-004",
      name: "Safety Training Certificate",
      staff: "Jennifer Lee",
      department: "Operations",
      dateReceived: "2023-06-01",
      validThrough: "2024-06-01",
      status: "pending",
      reviewedBy: null,
      reviewDate: null,
      renewalCycle: "1 year",
      documentType: "training",
      email: "jennifer.lee@company.com",
      versions: [],
    },
    {
      id: "DOC-005",
      name: "Employment Contract",
      staff: "David Martinez",
      department: "HR",
      dateReceived: "2023-02-15",
      validThrough: null, // No expiry
      status: "approved",
      reviewedBy: "Sarah Johnson",
      reviewDate: "2023-02-17",
      renewalCycle: "none",
      documentType: "employment",
      email: "david.martinez@company.com",
      versions: [],
    },
    {
      id: "DOC-006",
      name: "Driver's License",
      staff: "Robert Wilson",
      department: "Transportation",
      dateReceived: "2022-07-10",
      validThrough: "2023-07-10",
      status: "approved",
      reviewedBy: "Sarah Johnson",
      reviewDate: "2022-07-12",
      renewalCycle: "1 year",
      documentType: "identification",
      email: "robert.wilson@company.com",
      versions: [],
    },
    {
      id: "DOC-007",
      name: "Background Check",
      staff: "Sarah Johnson",
      department: "HR",
      dateReceived: "2023-04-05",
      validThrough: "2024-04-05",
      status: "rejected",
      reviewedBy: "Robert Wilson",
      reviewDate: "2023-04-07",
      renewalCycle: "1 year",
      documentType: "compliance",
      email: "sarah.johnson@company.com",
      versions: [],
    },
  ]

  // Calculate document status based on expiry date
  const getDocumentStatus = (doc) => {
    if (doc.status === "rejected") return "rejected"
    if (doc.status === "pending") return "pending"

    if (!doc.validThrough) return "valid" // Documents without expiry

    const today = new Date()
    const expiryDate = new Date(doc.validThrough)
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)

    if (expiryDate < today) return "expired"
    if (expiryDate <= thirtyDaysFromNow) return "expiring"
    return "valid"
  }

  // Get status badge based on review status and expiry
  const getStatusBadge = (doc) => {
    const reviewStatus = doc.status
    const expiryStatus = getDocumentStatus(doc)

    if (reviewStatus === "rejected") {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
    }

    if (reviewStatus === "pending") {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending Review</Badge>
    }

    if (expiryStatus === "expired") {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Expired</Badge>
    }

    if (expiryStatus === "expiring") {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Expiring Soon</Badge>
    }

    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Valid</Badge>
  }

  // Handle document review
  const handleReviewDocument = (doc) => {
    setSelectedDocument(doc)
    setReviewDialogOpen(true)
  }

  // Handle document history view
  const handleViewHistory = (doc) => {
    setSelectedDocument(doc)
    setHistoryDialogOpen(true)
  }

  // Handle document renewal
  const handleRenewDocument = (doc) => {
    setSelectedDocument(doc)
    setRenewDialogOpen(true)
  }

  // Bulk actions handlers
  const handleSelectDocument = (documentId, checked) => {
    if (checked) {
      setSelectedDocuments([...selectedDocuments, documentId])
    } else {
      setSelectedDocuments(selectedDocuments.filter((id) => id !== documentId))
      setSelectAll(false)
    }
  }

  const handleSelectAll = (checked) => {
    setSelectAll(checked)
    if (checked) {
      setSelectedDocuments(documents.map((doc) => doc.id))
    } else {
      setSelectedDocuments([])
    }
  }

  const handleBulkExport = () => {
    const selectedDocs = documents.filter((doc) => selectedDocuments.includes(doc.id))
    toast({
      title: "Export Started",
      description: `Exporting ${selectedDocs.length} documents...`,
    })
    // In a real app, this would trigger the export process
    console.log("Exporting documents:", selectedDocs)
  }

  const handleBulkReminder = () => {
    setBulkReminderDialogOpen(true)
  }

  const sendBulkReminders = () => {
    const selectedDocs = documents.filter((doc) => selectedDocuments.includes(doc.id))
    toast({
      title: "Reminders Sent",
      description: `Sent renewal reminders to ${selectedDocs.length} staff members.`,
    })
    setBulkReminderDialogOpen(false)
    setSelectedDocuments([])
    setSelectAll(false)
  }

  const clearSelection = () => {
    setSelectedDocuments([])
    setSelectAll(false)
  }

  // Filter documents for different tabs
  const getFilteredDocuments = (filter) => {
    switch (filter) {
      case "pending":
        return documents.filter((doc) => doc.status === "pending")
      case "expiring":
        return documents.filter((doc) => getDocumentStatus(doc) === "expiring" && doc.status === "approved")
      case "rejected":
        return documents.filter((doc) => doc.status === "rejected")
      case "expired":
        return documents.filter((doc) => getDocumentStatus(doc) === "expired" && doc.status === "approved")
      default:
        return documents
    }
  }

  const DocumentTable = ({ docs, showBulkActions = false }) => (
    <Table>
      <TableHead>
        <TableRow>
          {showBulkActions && (
            <TableHeader className="w-[50px]">
              <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} aria-label="Select all documents" />
            </TableHeader>
          )}
          <TableHeader>Document</TableHeader>
          <TableHeader>Staff Member</TableHeader>
          <TableHeader>Department</TableHeader>
          <TableHeader>Date Received</TableHeader>
          <TableHeader>Valid Through</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Renewal Cycle</TableHeader>
          <TableHeader className="text-right">Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {docs.map((doc) => (
          <TableRow key={doc.id}>
            {showBulkActions && (
              <TableCell>
                <Checkbox
                  checked={selectedDocuments.includes(doc.id)}
                  onCheckedChange={(checked) => handleSelectDocument(doc.id, checked)}
                  aria-label={`Select ${doc.name}`}
                />
              </TableCell>
            )}
            <TableCell className="font-medium">{doc.name}</TableCell>
            <TableCell>{doc.staff}</TableCell>
            <TableCell>{doc.department}</TableCell>
            <TableCell>{new Date(doc.dateReceived).toLocaleDateString()}</TableCell>
            <TableCell>{doc.validThrough ? new Date(doc.validThrough).toLocaleDateString() : "No Expiry"}</TableCell>
            <TableCell>{getStatusBadge(doc)}</TableCell>
            <TableCell>{doc.renewalCycle}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleReviewDocument(doc)} title="Review Document">
                  <FileCheck className="h-4 w-4" />
                </Button>
                {doc.versions.length > 0 && (
                  <Button variant="ghost" size="icon" onClick={() => handleViewHistory(doc)} title="View History">
                    <History className="h-4 w-4" />
                  </Button>
                )}
                {doc.renewalCycle !== "none" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRenewDocument(doc)}
                    title="Renew Document"
                    disabled={getDocumentStatus(doc) !== "expiring" && getDocumentStatus(doc) !== "expired"}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Document Review</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedDocuments.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {selectedDocuments.length} selected
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={clearSelection} className="h-6 w-6 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleBulkExport} className="bg-white">
                    <Download className="mr-2 h-4 w-4" />
                    Export Selected
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleBulkReminder} className="bg-white">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Reminders
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Select documents to perform bulk actions</div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search documents by name, staff, or type..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">In the system</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valid</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter((doc) => getDocumentStatus(doc) === "valid" && doc.status === "approved").length}
            </div>
            <p className="text-xs text-muted-foreground">Current documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter((doc) => getDocumentStatus(doc) === "expiring" && doc.status === "approved").length}
            </div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                documents.filter(
                  (doc) =>
                    doc.status === "pending" || doc.status === "rejected" || getDocumentStatus(doc) === "expired",
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Pending, rejected or expired</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>Review and manage all documents in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentTable docs={getFilteredDocuments("all")} showBulkActions={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review</CardTitle>
              <CardDescription>Documents awaiting review and approval</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentTable docs={getFilteredDocuments("pending")} showBulkActions={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expiring Soon</CardTitle>
              <CardDescription>Documents that will expire within 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentTable docs={getFilteredDocuments("expiring")} showBulkActions={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Documents</CardTitle>
              <CardDescription>Documents that have been rejected and need to be resubmitted</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentTable docs={getFilteredDocuments("rejected")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expired Documents</CardTitle>
              <CardDescription>Documents that have expired and need immediate renewal</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentTable docs={getFilteredDocuments("expired")} showBulkActions={true} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bulk Reminder Dialog */}
      <Dialog open={bulkReminderDialogOpen} onOpenChange={setBulkReminderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Bulk Reminders</DialogTitle>
            <DialogDescription>Send renewal reminders to {selectedDocuments.length} staff members</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Selected Documents</Label>
              <div className="max-h-40 overflow-y-auto border rounded-md p-3 bg-muted/50">
                {documents
                  .filter((doc) => selectedDocuments.includes(doc.id))
                  .map((doc) => (
                    <div key={doc.id} className="flex justify-between items-center py-1">
                      <span className="text-sm">
                        {doc.name} - {doc.staff}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {doc.validThrough ? new Date(doc.validThrough).toLocaleDateString() : "No Expiry"}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminder-message">Reminder Message</Label>
              <Textarea
                id="reminder-message"
                placeholder="Your document renewal is due soon. Please submit updated documentation..."
                defaultValue="Dear [Staff Name],

Your [Document Type] is expiring on [Expiry Date]. Please submit your updated documentation as soon as possible to maintain compliance.

If you have any questions, please contact the HR department.

Thank you,
HR Team"
                className="min-h-[120px]"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">Email Preview</p>
                  <p className="text-blue-700">
                    Reminders will be sent to:{" "}
                    {documents
                      .filter((doc) => selectedDocuments.includes(doc.id))
                      .map((doc) => doc.email)
                      .join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkReminderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendBulkReminders}>
              <Mail className="mr-2 h-4 w-4" />
              Send {selectedDocuments.length} Reminders
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Review Dialog */}
      {selectedDocument && (
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Document Review</DialogTitle>
              <DialogDescription>Review and update the status of this document</DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Document Name</Label>
                  <p className="font-medium">{selectedDocument.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Staff Member</Label>
                  <p className="font-medium">{selectedDocument.staff}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Department</Label>
                  <p className="font-medium">{selectedDocument.department}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Document Type</Label>
                  <p className="font-medium capitalize">{selectedDocument.documentType}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date Received</Label>
                  <p className="font-medium">{new Date(selectedDocument.dateReceived).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Valid Through</Label>
                  <p className="font-medium">
                    {selectedDocument.validThrough
                      ? new Date(selectedDocument.validThrough).toLocaleDateString()
                      : "No Expiry"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Renewal Cycle</Label>
                  <p className="font-medium">{selectedDocument.renewalCycle}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Current Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedDocument)}</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="document-preview">Document Preview</Label>
                <div className="border rounded-md p-4 flex items-center justify-center bg-muted/50 h-64">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                  <p className="ml-4 text-muted-foreground">Document preview would appear here</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-status">Review Status</Label>
                <Select defaultValue={selectedDocument.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">✅ Approved</SelectItem>
                    <SelectItem value="rejected">❌ Rejected</SelectItem>
                    <SelectItem value="pending">⏳ Pending Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-notes">Review Notes</Label>
                <Textarea
                  id="review-notes"
                  placeholder="Add notes about this document review..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setReviewDialogOpen(false)}>Save Review</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Document History Dialog */}
      {selectedDocument && (
        <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Document History</DialogTitle>
              <DialogDescription>View previous versions of this document</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Document</Label>
                <p className="font-medium">
                  {selectedDocument.name} - {selectedDocument.staff}
                </p>
              </div>

              <div className="space-y-4">
                <div className="border rounded-md p-4 bg-muted/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mr-2">Current</Badge>
                      <p className="font-medium">Version {selectedDocument.versions.length + 1}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Received: {new Date(selectedDocument.dateReceived).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Valid Through: </span>
                      {selectedDocument.validThrough
                        ? new Date(selectedDocument.validThrough).toLocaleDateString()
                        : "No Expiry"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status: </span>
                      {getStatusBadge(selectedDocument)}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reviewed By: </span>
                      {selectedDocument.reviewedBy || "Not reviewed"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Review Date: </span>
                      {selectedDocument.reviewDate
                        ? new Date(selectedDocument.reviewDate).toLocaleDateString()
                        : "Not reviewed"}
                    </div>
                  </div>
                </div>

                {selectedDocument.versions.map((version, index) => (
                  <div key={version.id} className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          Archived
                        </Badge>
                        <p className="font-medium">Version {selectedDocument.versions.length - index}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Received: {new Date(version.dateReceived).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Valid Through: </span>
                        {version.validThrough ? new Date(version.validThrough).toLocaleDateString() : "No Expiry"}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status: </span>
                        <Badge variant="outline">Archived</Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reviewed By: </span>
                        {version.reviewedBy || "Not reviewed"}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Review Date: </span>
                        {version.reviewDate ? new Date(version.reviewDate).toLocaleDateString() : "Not reviewed"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setHistoryDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Document Renewal Dialog */}
      {selectedDocument && (
        <Dialog open={renewDialogOpen} onOpenChange={setRenewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Renew Document</DialogTitle>
              <DialogDescription>Upload a new version of this document to renew it</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Document</Label>
                  <p className="font-medium">{selectedDocument.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Staff Member</Label>
                  <p className="font-medium">{selectedDocument.staff}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Current Expiry</Label>
                  <p className="font-medium">
                    {selectedDocument.validThrough
                      ? new Date(selectedDocument.validThrough).toLocaleDateString()
                      : "No Expiry"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Renewal Cycle</Label>
                  <p className="font-medium">{selectedDocument.renewalCycle}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="upload-new">Upload New Document</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
                  <Button size="sm" variant="outline">
                    Select File
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-valid-through">New Valid Through Date</Label>
                <Input
                  id="new-valid-through"
                  type="date"
                  defaultValue={
                    selectedDocument.validThrough
                      ? new Date(
                          new Date(selectedDocument.validThrough).setFullYear(
                            new Date(selectedDocument.validThrough).getFullYear() +
                              (selectedDocument.renewalCycle === "4 years" ? 4 : 1),
                          ),
                        )
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="renewal-notes">Notes</Label>
                <Textarea id="renewal-notes" placeholder="Add any notes about this renewal..." />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setRenewDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setRenewDialogOpen(false)}>Submit Renewal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}