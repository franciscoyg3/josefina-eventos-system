"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { sidebarButtonBase } from "@/lib/sidebarStyles";

export default function NewBookingButton() {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuButton
      tooltip="Nova reserva"
      className={`${sidebarButtonBase} justify-center bg-[#8a7226] font-medium text-white hover:bg-[#a68f2e]! hover:text-white! active:bg-[#a68f2e]! active:text-white!`}
      render={
        <Link href="/customer/calendar" onClick={() => setOpenMobile(false)} />
      }
    >
      <Plus />
      <span>Nova reserva</span>
    </SidebarMenuButton>
  );
}
