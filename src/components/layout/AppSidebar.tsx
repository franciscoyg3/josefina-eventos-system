"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { sidebarButtonBase } from "@/components/layout/sidebarStyles";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type {
  AppSidebarPropsType,
  LinksType,
} from "@/types/appSidebarPropsType";

export default function AppSidebar( {
  links,
  action
}: AppSidebarPropsType ) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const isActive = (link: LinksType) =>
    link.exact
      ? pathname === link.href
      : pathname === link.href || pathname.startsWith(`${link.href}/`);

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        {action && (
          <SidebarGroup className="pt-4">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>{action}</SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8a7226]/80">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {links.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton
                    tooltip={link.title}
                    isActive={isActive(link)}
                    className={`${sidebarButtonBase} relative text-[15px] transition-colors duration-200 hover:bg-[#a68f2e]/10! hover:text-[#8a7226]! data-[active=true]:bg-[#a68f2e]/15! data-[active=true]:font-medium data-[active=true]:text-[#8a7226]! data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:h-5 data-[active=true]:before:w-0.5 data-[active=true]:before:rounded-full data-[active=true]:before:bg-[#a68f2e]`}
                    render={
                      <Link
                        href={link.href}
                        onClick={() => setOpenMobile(false)}
                      />
                    }
                  >
                    {link.icon}
                    <span>{link.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

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
              className={`${sidebarButtonBase} text-[15px] text-muted-foreground hover:text-red-700`}
            >
              <LogOut />
              <span>Terminar sessão</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
