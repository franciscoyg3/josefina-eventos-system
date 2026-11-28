import { Suspense } from "react";
import { CalendarCheck } from "lucide-react";
import AvailabilityCalendar from "@/components/calendar/AvailabilityCalendar";

const card = "rounded-xl border bg-card p-6";

function CalendarSkeleton() {
  return <div className="h-128 animate-pulse rounded-xl border bg-card" />;
}

export default function Calendar() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-[#8a7226] md:text-4xl dark:text-[#c9b052]">
          Disponibilidade
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Consulte as datas livres e escolha o dia do seu evento.
        </p>
      </header>

      <Suspense fallback={<CalendarSkeleton />}>
        <AvailabilityCalendar mode="customer" />
      </Suspense>

      <section className={`${card} flex gap-4`}>
        <CalendarCheck
          className="mt-0.5 size-5 shrink-0 text-[#8a7226] dark:text-[#c9b052]"
          aria-hidden
        />
        <div>
          <h2 className="font-medium">Antes de pedir a sua reserva</h2>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
            <li>As reservas exigem uma antecedência mínima de 48 horas.</li>
            <li>
              O pedido é analisado em 24 horas. Se for aceite, tem mais 24 horas
              para pagar; depois disso, expira.
            </li>
            <li>Uma data ocupada não pode ser reservada por outro cliente.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
