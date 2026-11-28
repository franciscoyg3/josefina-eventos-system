"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const weekdays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const MIN_NOTICE_DAYS = 2;
const NO_DATES: string[] = [];

type DayState = "past" | "soon" | "booked" | "free";

const pad = (n: number) => String(n).padStart(2, "0");
const toKey = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

const monthFormat = new Intl.DateTimeFormat("pt-PT", {
  month: "long",
  year: "numeric",
});
const dayFormat = new Intl.DateTimeFormat("pt-PT", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

type AvailabilityCalendarProps = {
  bookedDates?: string[];
  mode?: "public" | "customer";
};

export default function AvailabilityCalendar({
  bookedDates = NO_DATES,
  mode,
}: AvailabilityCalendarProps) {
  const [today] = useState(() => {
    const now = new Date();
    const min = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + MIN_NOTICE_DAYS,
    );
    return {
      key: toKey(now.getFullYear(), now.getMonth(), now.getDate()),
      minKey: toKey(min.getFullYear(), min.getMonth(), min.getDate()),
    };
  });
  const [view, setView] = useState(() => ({
    year: Number(today.key.slice(0, 4)),
    month: Number(today.key.slice(5, 7)) - 1,
  }));
  const [selected, setSelected] = useState<string | null>(null);

  const booked = useMemo(() => new Set(bookedDates), [bookedDates]);

  const getState = (key: string): DayState => {
    if (key < today.key) return "past";
    if (key < today.minKey) return "soon";
    if (booked.has(key)) return "booked";
    return "free";
  };

  const { year, month } = view;
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const trailing = (7 - ((offset + daysInMonth) % 7)) % 7;
  const cells: (number | null)[] = [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...Array<null>(trailing).fill(null),
  ];

  const monthLabel = monthFormat.format(new Date(year, month, 1));
  const title = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);
  const atCurrentMonth = `${year}-${pad(month + 1)}` <= today.key.slice(0, 7);

  const goToMonth = (delta: number) => {
    setView(({ year: y, month: m }) => {
      const date = new Date(y, m + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
    setSelected(null);
  };

  const selectedState = selected ? getState(selected) : null;

  const bookingPath = `/customer/bookings/new?date=${selected}`;
  const bookingHref =
    mode === "customer"
      ? bookingPath
      : `/login?callbackUrl=${encodeURIComponent(bookingPath)}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <section aria-label="Calendário de disponibilidade" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-medium">{title}</h2>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => goToMonth(-1)}
              disabled={atCurrentMonth}
              aria-label="Mês anterior"
            >
              <ChevronLeft />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => goToMonth(1)}
              aria-label="Mês seguinte"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border bg-border">
          {weekdays.map((day) => (
            <div
              key={day}
              className="bg-muted/40 py-2 text-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}

          {cells.map((day, index) => {
            const cornerClass =
              index === cells.length - 7
                ? "rounded-bl-[inherit]"
                : index === cells.length - 1
                  ? "rounded-br-[inherit]"
                  : "";

            if (day === null) {
              return (
                <div
                  key={`empty-${index}`}
                  aria-hidden
                  className="min-h-20 bg-muted/30 sm:min-h-24"
                />
              );
            }

            const key = toKey(year, month, day);
            const state = getState(key);
            const isSelected = selected === key;
            const isToday = key === today.key;
            const disabled = state === "past" || state === "soon";

            const stateLabel = {
              past: "indisponível",
              soon: "indisponível, com menos de 48 horas de antecedência",
              booked: "ocupada",
              free: "livre",
            }[state];

            const stateClass = {
              past: "cursor-not-allowed bg-muted/30 text-muted-foreground/50",
              soon: "cursor-not-allowed bg-muted/30 text-muted-foreground/70",
              booked: "bg-red-500/10 hover:bg-red-500/15",
              free: "bg-card hover:bg-[#a68f2e]/10",
            }[state];

            return (
              <button
                key={key}
                type="button"
                disabled={disabled}
                onClick={() => setSelected(key)}
                aria-pressed={isSelected}
                aria-label={`Dia ${day}, ${stateLabel}`}
                className={`flex min-h-20 flex-col items-start gap-1 p-1.5 text-left transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#a68f2e] sm:min-h-24 sm:p-2 ${stateClass} ${cornerClass} ${
                  isSelected ? "ring-2 ring-[#a68f2e] ring-inset" : ""
                }`}
              >
                <span
                  className={`flex size-6 items-center justify-center rounded-full text-xs ${
                    isToday ? "bg-[#8a7226] font-medium text-white" : ""
                  }`}
                >
                  {day}
                </span>

                {state === "booked" && (
                  <span className="flex items-center gap-1 text-[11px] leading-5 text-red-800 dark:text-red-300">
                    <span className="size-2 shrink-0 rounded-full bg-red-500" />
                    <span className="hidden sm:inline">Ocupada</span>
                  </span>
                )}
                {state === "free" && (
                  <span className="flex items-center gap-1 text-[11px] leading-5 text-emerald-800 dark:text-emerald-300">
                    <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
                    <span className="hidden sm:inline">Livre</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <li className="flex items-center gap-2">
            <span
              className="size-2.5 rounded-full bg-emerald-500"
              aria-hidden
            />
            Livre
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-500" aria-hidden />
            Ocupada
          </li>
          <li className="flex items-center gap-2">
            <span
              className="size-2.5 rounded-full bg-neutral-400"
              aria-hidden
            />
            Indisponível
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#8a7226]" aria-hidden />
            Hoje
          </li>
        </ul>
        <p className="text-xs text-muted-foreground">
          Indisponível inclui as datas passadas e as que têm menos de 48 horas
          de antecedência.
        </p>
      </section>

      <aside aria-live="polite" className="h-fit rounded-xl border bg-card p-5">
        {selected === null || selectedState === null ? (
          <p className="text-sm text-muted-foreground">
            Escolha um dia para confirmar se está livre.
          </p>
        ) : (
          <>
            <h2 className="text-base font-medium">
              {dayFormat.format(new Date(`${selected}T00:00:00Z`))}
            </h2>

            {selectedState === "booked" ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Esta data já está reservada. Escolha outro dia.
              </p>
            ) : (
              <>
                <p className="mt-3 flex items-center gap-2 text-sm">
                  <span
                    className="size-2.5 rounded-full bg-emerald-500"
                    aria-hidden
                  />
                  Data livre
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {mode === "customer"
                    ? "Peça a reserva para este dia. Respondemos ao pedido em 24 horas."
                    : "Inicie sessão para pedir a reserva deste dia. Respondemos ao pedido em 24 horas."}
                </p>
                <Link
                  href={bookingHref}
                  className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-md bg-[#8a7226] px-4 text-sm font-medium text-white transition-colors hover:bg-[#a68f2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a68f2e]"
                >
                  {mode === "customer"
                    ? "Pedir reserva para este dia"
                    : "Iniciar sessão e reservar"}
                </Link>
              </>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
