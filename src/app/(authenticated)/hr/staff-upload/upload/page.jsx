"use client"

import { useState } from "react"
import DocumentUploadTable from "@/components/DocumentUploadTable"
import DashboardLayout from "@/components/DashboardLayout"
import { ArrowLeft, ArrowRight, Check, FileUp, Upload, X } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import "./page.css"

const employees = [
  { id: "1", name: "Aisha Carter" },
  { id: "2", name: "David Stone" },
  { id: "3", name: "Mariah Diaz" },
]

export default function HRUploadPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadResults, setUploadResults] = useState([])

  const autoMatchFiles = (files) =>
    files.map((file) => {
      const fileName = file.name.toLowerCase().replace(/\.[^/.]+$/, "")
      const matchedEmployee = employees.find((emp) => {
        const normalized = emp.name.toLowerCase().replace(/\s+/g, "_")
        return fileName.includes(normalized)
      })
      return {
        file,
        fileName: file.name,
        matchedEmployee: matchedEmployee || null,
        docType: "",
        status: matchedEmployee ? "Matched" : "Unmatched",
      }
    })

  const handleFiles = (fileList) => {
    setIsProcessing(true)
    const newFiles = autoMatchFiles(Array.from(fileList))
    setFiles((prev) => [...prev, ...newFiles])
    setIsProcessing(false)
  }

  const handleFileUpload = (e) => handleFiles(e.target.files)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDelete = (index) => {
    const updated = [...files]
    updated.splice(index, 1)
    setFiles(updated)
  }

  const handleDocTypeChange = (index, value) => {
    setFiles((prev) => {
      const updated = [...prev]
      updated[index].docType = value
      return updated
    })
  }

  const handleEmployeeAssign = (index, employeeId) => {
    const employee = employees.find((e) => e.id === employeeId)
    setFiles((prev) => {
      const updated = [...prev]
      updated[index].matchedEmployee = employee
      updated[index].status = "Manually Assigned"
      return updated
    })
  }

  const handleConfirmUploads = async () => {
    setIsUploading(true)
    const results = []

    for (const fileEntry of files) {
      if (!fileEntry.file) continue

      const formData = new FormData()
      formData.append("file", fileEntry.file)
      formData.append(
        "metadata",
        JSON.stringify({
          employeeId: fileEntry.matchedEmployee?.id || null,
          employeeName: fileEntry.matchedEmployee?.name || null,
          fileName: fileEntry.fileName,
          documentType: fileEntry.docType,
          status: fileEntry.status,
          uploadedAt: new Date().toISOString(),
        })
      )

      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const result = { success: true, message: "File uploaded successfully" }

        results.push({
          fileName: fileEntry.fileName,
          success: true,
          message: result.message,
        })
      } catch (error) {
        results.push({
          fileName: fileEntry.fileName,
          success: false,
          message: error.message || "Upload failed",
        })
      }
    }

    setUploadResults(results)
    setIsUploading(false)
    setUploadComplete(true)
  }

  const handleNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))
  const handleReset = () => {
    setFiles([])
    setUploadComplete(false)
    setUploadResults([])
    setCurrentStep(1)
  }

  const canProceedToStep2 = files.length > 0
  const canProceedToStep3 = files.every((file) => file.matchedEmployee && file.docType.trim() !== "")

  return (
    <DashboardLayout>
      <div className="upload-container">
        <div className="steps-indicator mb-6">
          <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
            <div className="step-number">1</div>
            <div className="step-title">Upload Documents</div>
          </div>
          <div className="step-connector"></div>
          <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
            <div className="step-number">2</div>
            <div className="step-title">Review & Match</div>
          </div>
          <div className="step-connector"></div>
          <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
            <div className="step-number">3</div>
            <div className="step-title">Confirm & Upload</div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">📁 HR Document Upload</h1>

        {currentStep === 1 && (
          <div className="step-content">
            <label className="file-button" htmlFor="fileUpload">
              <FileUp className="mr-2 h-4 w-4" /> Choose Files
            </label>
            <input id="fileUpload" type="file" multiple onChange={handleFileUpload} style={{ display: "none" }} />

            <div
              className={`drop-zone ${isDragging ? "dragover" : ""}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}
            >
              <Upload className="h-12 w-12 text-gray-400 mb-2" />
              <p>Drag documents here or click "Choose Files"</p>
            </div>

            {isProcessing && <div className="processing-indicator">Processing files…</div>}

            {files.length > 0 && (
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Remove</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file, index) => (
                    <TableRow key={index}>
                      <TableCell>{file.fileName}</TableCell>
                      <TableCell>{file.status}</TableCell>
                      <TableCell className="text-right">
                        <button onClick={() => handleDelete(index)}>
                          <X className="h-4 w-4 text-red-500" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <div className="navigation-buttons">
              <button className="next-button" onClick={handleNextStep} disabled={!canProceedToStep2}>
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-content">
            <p className="mb-4">Review auto-matched files and make any necessary adjustments.</p>
            <DocumentUploadTable
              files={files}
              onDelete={handleDelete}
              onDocTypeChange={handleDocTypeChange}
              onEmployeeAssign={handleEmployeeAssign}
              employees={employees}
            />
            <div className="navigation-buttons">
              <button className="back-button" onClick={handlePrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </button>
              <button className="next-button" onClick={handleNextStep} disabled={!canProceedToStep3}>
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-content">
            <div className="confirmation-summary">
              <h3 className="font-medium mb-2">Ready to upload {files.length} document(s):</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file, index) => (
                    <TableRow key={index}>
                      <TableCell>{file.fileName}</TableCell>
                      <TableCell>{file.matchedEmployee?.name || "Unassigned"}</TableCell>
                      <TableCell>{file.docType || "Unspecified"}</TableCell>
                      <TableCell>{file.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {!uploadComplete ? (
                <div className="navigation-buttons">
                  <button className="back-button" onClick={handlePrevStep} disabled={isUploading}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </button>
                  <button className="confirm-button" onClick={handleConfirmUploads} disabled={isUploading}>
                    {isUploading ? "Uploading..." : (<><Check className="mr-2 h-4 w-4" /> Confirm Uploads</>)}
                  </button>
                </div>
              ) : (
                <div className="upload-complete">
                  <div className="success-message">
                    <Check className="h-6 w-6 text-green-500" />
                    <h3>Upload Complete!</h3>
                  </div>

                  <div className="upload-results">
                    {uploadResults.map((result, index) => (
                      <div key={index} className={`result-item ${result.success ? "success" : "error"}`}>
                        {result.success ? "✅" : "❌"} {result.fileName}: {result.message}
                      </div>
                    ))}
                  </div>

                  <button className="reset-button" onClick={handleReset}>
                    Upload More Documents
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
