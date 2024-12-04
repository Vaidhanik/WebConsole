import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
export default function Layout({children} ) {
  return (
    <>
    <SidebarProvider>
        <div className="flex flex-row">
        <AppSidebar />
        <SidebarTrigger />
        </div>
      <main>
      {children}
      </main>
    </SidebarProvider>
    </>
  )
}
