import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ThemeMode";
export default function Layout({ children }) {
  return (
    <>
      <div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className=" h-screen w-full"
            style={{
              borderRadius: "20px 10px",
            }}
          >
            <SidebarProvider>
              <div className="flex flex-row rounded-lg">
                <AppSidebar />
                <div className="flex flex-col mt-4">
                  <SidebarTrigger />
                  <ModeToggle />
                </div>
              </div>
              <main className="h-screen w-full py-2">{children}</main>
              <div className="mx-3"></div>
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}
