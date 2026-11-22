"use client";

import { Calendar } from "@/components/ui/calendar";
import Hero from "@/components/layout/Hero";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function Reservations () {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <main>
      <Hero
        title="Verifique a disponibilidade de datas no nosso Calendário de Reservas"
        variant="compact"
        srcImg="/images/hero/2hero.jpg"
      />
      <div className="py-28">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border [--cell-size:3rem] m-auto"
        />
      </div>
    </main>
  );
}