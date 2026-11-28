import { Suspense } from "react";
import { CalendarCheck } from "lucide-react";
import CustomerCalendar from "@/components/calendar/CustomerCalendar";

const card = "rounded-xl border bg-card p-6";

function CalendarSkeleton() {
  return (
    <div className="m-auto h-96 w-96 max-w-full animate-pulse rounded-lg border" />
  );
}

export default function Calendar() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-[#8a7226] md:text-4xl">
          Disponibilidade
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Consulte as datas livres e escolha o dia do seu evento.
        </p>
      </header>

      <section className={card}>
        <Suspense fallback={<CalendarSkeleton />}>
          <CustomerCalendar />
        </Suspense>

        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t pt-4 text-xs text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="size-3 rounded-sm bg-[#a68f2e]/35" aria-hidden />
            Hoje
          </li>
          <li className="flex items-center gap-2">
            <span
              className="size-3 rounded-sm border-2 border-[#a68f2e]"
              aria-hidden
            />
            Selecionada
          </li>
          <li className="flex items-center gap-2">
            <span className="size-3 rounded-sm bg-red-500/10" aria-hidden />
            Ocupada
          </li>
        </ul>
      </section>

      <section className={`${card} flex gap-4`}>
        <CalendarCheck
          className="mt-0.5 size-5 shrink-0 text-[#8a7226]"
          aria-hidden
        />
        <div>
          <h2 className="font-medium">Antes de pedir a sua reserva</h2>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
            <li>As reservas exigem uma antecedência mínima de 48 horas.</li>
            <li>
              Os pedidos pendentes expiram automaticamente ao fim de 24 horas.
            </li>
            <li>Uma data ocupada não pode ser reservada por outro cliente.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
