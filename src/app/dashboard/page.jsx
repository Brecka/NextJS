"use client"

export function DashboardPage() {
  return (
    <MainLayout>
      <ComplianceSummaryCards />
    </MainLayout>
  )
}

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/Card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { BadgeCheck, Clock, AlertTriangle } from "lucide-react"
import MainLayout from "@/components/MainLayout"
import { Button } from "@/components/ui/Button"
import { Separator } from "@/components/ui/Separator"
const documents = [
  { name: "W-4 Form", status: "complete", staff: "John Smith", date: "2024-01-15" },
  { name: "Driver's License", status: "expiring", staff: "Sarah Johnson", date: "2024-06-01" },
  { name: "FBI Clearance", status: "overdue", staff: "Emily Davis", date: "2023-12-31" }
]

export default function ComplianceSummaryCards() {
  const [selectedStatus, setSelectedStatus] = useState("complete")

  const statusConfig = {
    complete: {
      icon: <BadgeCheck className="text-green-500 h-5 w-5" />, title: "Complete Documents", filter: "complete"
    },
    expiring: {
      icon: <Clock className="text-amber-500 h-5 w-5" />, title: "Expiring Soon", filter: "expiring"
    },
    overdue: {
      icon: <AlertTriangle className="text-red-500 h-5 w-5" />, title: "Overdue Documents", filter: "overdue"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Object.entries(statusConfig).map(([key, config]) => (
        <Dialog key={key}>
          <DialogTrigger asChild>
            <Card onClick={() => setSelectedStatus(key)} className="cursor-pointer hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{config.title}</CardTitle>
                {config.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {documents.filter(doc => doc.status === config.filter).length}
                </div>
                <p className="text-xs text-muted-foreground">Click to view</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{config.title}</DialogTitle>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Staff</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.filter(doc => doc.status === selectedStatus).map((doc, i) => (
                  <TableRow key={i}>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.staff}</TableCell>
                    <TableCell>{doc.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
