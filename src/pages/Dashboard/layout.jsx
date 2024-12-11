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
            className=" h-screen w-full bg-white dark:bg-black"
            style={{
              borderRadius: "20px 10px",
            }}
          >
            <SidebarProvider>
              <div className="flex flex-row rounded-lg bg-white dark:bg-black">
                <AppSidebar />
                <div className="flex flex-col gap-2 mt-4 text-black dark:text-white bg-white dark:bg-black ">
                  <SidebarTrigger />
                  <ModeToggle />
                </div>
              </div>
              <main className="h-screen w-full py-2 bg-white dark:bg-black">{children}</main>
              <div className="mx-3"></div>
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}
