import AvailabilityCalendar from "@/components/calendar/AvailabilityCalendar";
import { Suspense } from "react";
import Hero from "@/components/layout/Hero";

export default function Reservations() {
  return (
    <main>
      <Hero
        title="Verifique a disponibilidade de datas no nosso Calendário de Reservas"
        variant="compact"
        srcImg="/images/hero/2hero.jpg"
      />
      <div className="py-28">
        <Suspense
          fallback={
            <div className="m-auto h-96 w-96 max-w-full animate-pulse rounded-lg border" />
          }
        >
          <AvailabilityCalendar />
        </Suspense>
      </div>
    </main>
  );
}
