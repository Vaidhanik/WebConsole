import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Separator } from "@radix-ui/react-separator"
export default function Layout({children} ) {
  return (
    <>
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main>
        {children}
      </main>
    </SidebarProvider>
    </>
  )
}
