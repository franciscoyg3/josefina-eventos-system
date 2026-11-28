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
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Suspense
          fallback={
            <div className="h-96 w-full animate-pulse rounded-lg border" />
          }
        >
          <AvailabilityCalendar mode="public" />
        </Suspense>
      </div>
    </main>
  );
}
