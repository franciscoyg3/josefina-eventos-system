import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Área do Cliente",
    template: "Área do Cliente - %s",
  },
};

export default function CustomerLayout ({ children }: { children: React.ReactNode }) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur">
            <SidebarTrigger className="-ml-1 text-[#8a7226] hover:bg-[#a68f2e]/10 hover:text-[#8a7226]" />
            <span className="text-sm text-[#8a7226] md:hidden">
              Josefina Eventos
            </span>
          </header>

          <div className="flex-1 p-4 md:p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    );
}