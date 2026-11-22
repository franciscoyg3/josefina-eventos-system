"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function PublicCalendar () {
    const [date, setDate] = useState<Date | undefined>(undefined);
    
    return (
      <main>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border [--cell-size:4rem] m-auto"
          classNames={{
            today: "rounded-md bg-[#a68f2e]/20 text-[#8a7226]",
          }}
        />
      </main>
    );
}