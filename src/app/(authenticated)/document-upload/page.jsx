"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Progress } from "@/components/ui/Progress"
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Users,
  Building,
  ArrowRight,
  ArrowLeft,
  FileCheck,
} from "lucide-react"

export default function DocumentUploadPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const documentTypes = [
    { value: "hr", label: "HR Documents", icon: Users },
    { value: "training", label: "Training Records", icon: FileText },
    { value: "transportation", label: "Transportation", icon: Building },
    { value: "operations", label: "Operations", icon: CheckCircle2 },
    { value: "compliance", label: "Compliance", icon: AlertCircle },
  ]

  const departments = [
    { value: "hr", label: "Human Resources" },
    { value: "operations", label: "Operations" },
    { value: "transportation", label: "Transportation" },
    { value: "training", label: "Training" },
    { value: "safety", label: "Safety" },
  ]

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || [])
    const newFiles = files.map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      size: file.size,
      type: "",
      department: "",
      expiryDate: "",
      description: "",
      status: "pending",
    }))
    setUploadedFiles([...uploadedFiles, ...newFiles])
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    const newFiles = files.map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      size: file.size,
      type: "",
      department: "",
      expiryDate: "",
      description: "",
      status: "pending",
    }))
    setUploadedFiles([...uploadedFiles, ...newFiles])
  }

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
  }

  const updateFileConfig = (id, field, value) => {
    setUploadedFiles(uploadedFiles.map((file) => (file.id === id ? { ...file, [field]: value } : file)))
  }

  const bulkUpdateFiles = (field, value) => {
    setUploadedFiles(uploadedFiles.map((file) => ({ ...file, [field]: value })))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleUpload = async () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    // Mark all files as uploaded
    setUploadedFiles(uploadedFiles.map((file) => ({ ...file, status: "uploaded" })))
    setIsUploading(false)
    setCurrentStep(3)
  }

  const canProceedToStep2 = uploadedFiles.length > 0
  const canProceedToStep3 = uploadedFiles.every((file) => file.type && file.department)

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Upload Wizard</h1>
          <p className="text-muted-foreground">Upload and organize your compliance documents in 3 easy steps</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium
                ${
                  currentStep >= step
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-muted"
                }
              `}
            >
              {currentStep > step ? <CheckCircle2 className="h-5 w-5" /> : step}
            </div>
            {step < 3 && (
              <div
                className={`
                  w-16 h-0.5 mx-2
                  ${currentStep > step ? "bg-primary" : "bg-muted"}
                `}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Step 1: Upload Files
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Area */}
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
              <p className="text-muted-foreground mb-4">Support for PDF, DOC, DOCX, JPG, PNG files up to 10MB each</p>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Uploaded Files ({uploadedFiles.length})</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-end">
              <Button onClick={() => setCurrentStep(2)} disabled={!canProceedToStep2}>
                Next: Configure Documents
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Step 2: Configure Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bulk Actions */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-3">Bulk Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Document Type</Label>
                  <Select onValueChange={(value) => bulkUpdateFiles("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Apply to all" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Department</Label>
                  <Select onValueChange={(value) => bulkUpdateFiles("department", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Apply to all" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Expiry Date</Label>
                  <Input
                    type="date"
                    onChange={(e) => bulkUpdateFiles("expiryDate", e.target.value)}
                    placeholder="Apply to all"
                  />
                </div>
              </div>
            </div>

            {/* Individual File Configuration */}
            <div className="space-y-4">
              <h3 className="font-medium">Individual File Settings</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Document Type *</Label>
                        <Select value={file.type} onValueChange={(value) => updateFileConfig(file.id, "type", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {documentTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Department *</Label>
                        <Select
                          value={file.department}
                          onValueChange={(value) => updateFileConfig(file.id, "department", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept.value} value={dept.value}>
                                {dept.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Expiry Date</Label>
                        <Input
                          type="date"
                          value={file.expiryDate}
                          onChange={(e) => updateFileConfig(file.id, "expiryDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Input
                          value={file.description}
                          onChange={(e) => updateFileConfig(file.id, "description", e.target.value)}
                          placeholder="Optional description"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => setCurrentStep(3)} disabled={!canProceedToStep3}>
                Next: Complete Upload
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Step 3: Complete Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isUploading && uploadProgress === 0 && (
              <>
                {/* Upload Summary */}
                <div className="space-y-4">
                  <h3 className="font-medium">Upload Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">{uploadedFiles.length}</div>
                        <p className="text-sm text-muted-foreground">Total Files</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                          {formatFileSize(uploadedFiles.reduce((total, file) => total + file.size, 0))}
                        </div>
                        <p className="text-sm text-muted-foreground">Total Size</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                          {new Set(uploadedFiles.map((file) => file.department)).size}
                        </div>
                        <p className="text-sm text-muted-foreground">Departments</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">{new Set(uploadedFiles.map((file) => file.type)).size}</div>
                        <p className="text-sm text-muted-foreground">Document Types</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* File List Preview */}
                <div className="space-y-4">
                  <h3 className="font-medium">Files Ready for Upload</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline">{file.type}</Badge>
                              <Badge variant="outline">{file.department}</Badge>
                              {file.expiryDate && <span>Expires: {file.expiryDate}</span>}
                            </div>
                          </div>
                        </div>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={handleUpload} size="lg">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload All Files
                  </Button>
                </div>
              </>
            )}

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-4">
                <h3 className="font-medium">Uploading Files...</h3>
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-center text-muted-foreground">{uploadProgress}% Complete</p>
              </div>
            )}

            {/* Upload Complete */}
            {!isUploading && uploadProgress === 100 && (
              <div className="text-center space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
                <h3 className="text-xl font-bold">Upload Complete!</h3>
                <p className="text-muted-foreground">
                  Successfully uploaded {uploadedFiles.length} files to your compliance system.
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={() => window.location.reload()}>Upload More Files</Button>
                  <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
