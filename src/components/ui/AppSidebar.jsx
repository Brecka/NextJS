"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/AppSidebar {
  ClipboardCheck,
  FileCheck,
  GraduationCap,
  Home,
  Settings,
  ShieldCheck,
  Truck,
  User2,
  Users,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()

  // Simulated user role (replace with auth-based value)
  const userRole = "hr" // Example: "admin", "hr", "transportation", "training"

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
      roles: ["admin", "hr", "transportation", "training"]
    },
    {
      title: "Staff Directory",
      icon: Users,
      href: "/staff",
      roles: ["admin", "hr"]
    },
    {
      title: "HR Records",
      icon: User2,
      href: "/hr-tracking",
      roles: ["hr"]
    },
    {
      title: "Training Management",
      icon: GraduationCap,
      href: "/training",
      roles: ["training"]
    },
    {
      title: "Fleet Documents",
      icon: Truck,
      href: "/transportation",
      roles: ["transportation"]
    },
    {
      title: "Document Review",
      icon: FileText,
      href: "/documents",
      roles: ["admin", "hr", "training", "transportation"]
    },
    {
      title: "Document Upload",
      icon: FileCheck,
      href: "/uploads",
      roles: ["hr", "training", "transportation"]
    },
    {
      title: "Compliance Review",
      icon: ShieldCheck,
      href: "/review",
      roles: ["admin"]
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
      roles: ["admin"]
    },
  ]

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole))

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <FileCheck className="h-6 w-6" />
          <span>ComplianceHub</span>
        </Link>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {filteredMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                tooltip={item.title}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <User2 className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium text-foreground">Admin User</p>
            <p>admin@company.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
export default AppSidebar
