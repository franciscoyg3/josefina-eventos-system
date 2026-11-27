import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  CalendarDays,
  Home,
} from "lucide-react";
import AppSidebar from "@/components/layout/AppSidebar";
import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import type { LinksType } from "@/types/appSidebarPropsType";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Área Administrativa",
    template: "Área Administrativa - %s",
  },
};

const customerLinks: LinksType[] = [
  { title: "Início", href: "/", icon: <Home />, exact: true },
  { title: "Dashboard", href: "/dashboard", icon: <CalendarDays /> },
];

export default function CustomerLayout ({ children }: { children: React.ReactNode }) {
    return (
      <SidebarProvider
        defaultOpen={false}
        style={
          {
            "--sidebar-width": "18rem",
            "--sidebar-width-icon": "3.75rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar links={customerLinks} />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur">
            <SidebarTrigger className="-ml-1 text-[#8a7226] hover:bg-[#a68f2e]/10 hover:text-[#8a7226]" />
            <Separator orientation="vertical" className="h-4" />
            <Link
              href="/"
              className={`${cormorant.className} flex items-center gap-2 text-xl text-[#8a7226]`}
            >
              Josefina Eventos
            </Link>
          </header>

          <div className="flex-1 p-4 md:p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    );
}