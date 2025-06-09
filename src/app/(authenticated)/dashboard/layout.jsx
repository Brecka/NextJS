"use client"

import React from "react"
import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider } from "@/components/ui/Sidebar"

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
      <AppSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  )
}
