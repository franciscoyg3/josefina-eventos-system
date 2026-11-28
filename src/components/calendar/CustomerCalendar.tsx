"use client";

import { Calendar } from "@/components/ui/calendar";
import { pt } from "date-fns/locale";
import { useState } from "react";

export default function CustomerCalendar () {
    const [date, setDate] = useState<Date | undefined>(undefined);
    
    return (
      <main>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={pt}
          className="w-full max-w-fit m-auto rounded-lg border p-2 sm:p-4 capitalize
          [--cell-size:2.5rem] sm:[--cell-size:3rem] md:[--cell-size:4rem] lg:[--cell-size:5rem]
          **:data-[selected-single=true]:border-2
          **:data-[selected-single=true]:border-[#a68f2e]!
          **:data-[selected-single=true]:bg-transparent!
          **:data-[selected-single=true]:text-[#8a7226]!
          **:data-[selected-single=true]:outline-none!
          **:data-[selected-single=true]:ring-0!
          **:data-[selected-single=true]:hover:bg-[#a68f2e]/10!"
          classNames={{
            today:
              "rounded-md bg-[#a68f2e]/20 text-[#8a7226] data-[selected=true]:bg-transparent",
          }}
        />
      </main>
    );
}