"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarRail,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  CalendarDays,
  ClipboardList,
  Home,
  LogOut,
  Plus,
  User,
} from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";
import { usePathname } from 'next/navigation';
import Link from "next/link";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const items = [
  { title: "Início", href: "/customer", icon: Home },
  { title: "Disponibilidade", href: "/customer/availability", icon: CalendarDays },
  { title: "As minhas reservas", href: "/customer/bookings", icon: ClipboardList },
  { title: "Perfil", href: "/customer/profile", icon: User },
];

export default function AppSidebar () {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

    return (
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader className="border-b border-sidebar-border px-4 py-5 group-data-[collapsible=icon]:px-2">
          <Link
            href="/"
            className="flex items-center gap-2 overflow-hidden group-data-[collapsible=icon]:justify-center"
          >
            <span
              className={`${cormorant.className} truncate text-xl text-[#8a7226] group-data-[collapsible=icon]:hidden`}
            >
              Josefina Eventos
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="pt-4">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Nova reserva"
                    className="h-10 justify-center bg-[#8a7226] font-medium text-white hover:bg-[#a68f2e]! hover:text-white! active:bg-[#a68f2e]! active:text-white!"
                    render={
                      <Link
                        href="/customer/availability"
                        onClick={() => setOpenMobile(false)}
                      />
                    }
                  >
                    <Plus />
                    <span>Nova reserva</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Navegação</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((link) => (
                  <SidebarMenuItem key={link.title}>
                    <SidebarMenuButton
                      tooltip={link.title}
                      isActive={pathname === link.href}
                      className="data-[active=true]:bg-[#a68f2e]/15 data-[active=true]:text-[#8a7226]"
                      render={
                        <Link
                          href={link.href}
                          onClick={() => setOpenMobile(false)}
                        />
                      }
                    >
                      <link.icon />
                      <span>{link.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarFooter className="border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-2 py-2 group-data-[collapsible=icon]:hidden">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#a68f2e]/15 text-sm font-medium text-[#8a7226]">
                CF
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Nome do cliente</p>
                <p className="truncate text-xs text-muted-foreground">
                  cliente@email.com
                </p>
              </div>
            </div>

            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Terminar sessão"
                  className="text-muted-foreground hover:text-red-700"
                >
                  <LogOut />
                  <span>Terminar sessão</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
}