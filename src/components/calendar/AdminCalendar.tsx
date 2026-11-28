"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BookingStatusBadge,
  bookingStatusStyles,
} from "@/components/admin/StatusBadge";
import { formatKwanza } from "@/lib/admin/format";
import type { AdminBooking, BookingStatus } from "@/types/adminTypes";

const weekdays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const visibleStatuses: BookingStatus[] = ["UNDER_REVIEW", "AWAITING_PAYMENT", "APPROVED"];

const pad = (n: number) => String(n).padStart(2, "0");
const toKey = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

const monthFormat = new Intl.DateTimeFormat("pt-PT", { month: "long", year: "numeric" });
const dayFormat = new Intl.DateTimeFormat("pt-PT", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function AdminCalendar({ bookings }: { bookings: AdminBooking[] }) {
  const [view, setView] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [todayKey] = useState(() => {
    const now = new Date();
    return toKey(now.getFullYear(), now.getMonth(), now.getDate());
  });
  const [selected, setSelected] = useState<string | null>(null);

  const byDate = useMemo(() => {
    const map = new Map<string, AdminBooking[]>();
    for (const booking of bookings) {
      if (!visibleStatuses.includes(booking.status)) continue;
      map.set(booking.eventDate, [...(map.get(booking.eventDate) ?? []), booking]);
    }
    return map;
  }, [bookings]);

  const { year, month } = view;
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthLabel = monthFormat.format(new Date(year, month, 1));
  const title = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);

  const goToMonth = (delta: number) => {
    setView(({ year: y, month: m }) => {
      const date = new Date(y, m + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
    setSelected(null);
  };

  const selectedBookings = selected ? (byDate.get(selected) ?? []) : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <section aria-label="Calendário de reservas" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-medium">{title}</h2>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="icon" onClick={() => goToMonth(-1)} aria-label="Mês anterior">
              <ChevronLeft />
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={() => goToMonth(1)} aria-label="Mês seguinte">
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border bg-border">
          {weekdays.map((day) => (
            <div key={day} className="bg-muted/40 py-2 text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}

          {cells.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} aria-hidden className="min-h-20 bg-muted/30 sm:min-h-24" />;
            }

            const key = toKey(year, month, day);
            const list = byDate.get(key) ?? [];
            const isSelected = selected === key;
            const isToday = key === todayKey;
            const label =
              list.length === 0
                ? `Dia ${day}, sem reservas`
                : `Dia ${day}, ${list.length} ${list.length === 1 ? "reserva" : "reservas"}`;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                aria-pressed={isSelected}
                aria-label={label}
                className={`flex min-h-20 flex-col items-start gap-1 bg-card p-1.5 text-left transition-colors hover:bg-[#a68f2e]/10 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a68f2e] sm:min-h-24 sm:p-2 ${
                  isSelected ? "ring-2 ring-[#a68f2e] ring-inset" : ""
                }`}
              >
                <span
                  className={`flex size-6 items-center justify-center rounded-full text-xs ${
                    isToday ? "bg-[#8a7226] font-medium text-white" : "text-muted-foreground"
                  }`}
                >
                  {day}
                </span>

                {list.slice(0, 2).map((booking) => (
                  <span key={booking.id} className="flex w-full items-center gap-1 text-[11px] leading-5">
                    <span className={`size-2 shrink-0 rounded-full ${bookingStatusStyles[booking.status].dot}`} />
                    <span className="hidden truncate sm:inline">{booking.customerName.split(" ")[0]}</span>
                  </span>
                ))}
                {list.length > 2 && (
                  <span className="text-[11px] text-muted-foreground">+{list.length - 2}</span>
                )}
              </button>
            );
          })}
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          {visibleStatuses.map((status) => (
            <li key={status} className="flex items-center gap-2">
              <span className={`size-2.5 rounded-full ${bookingStatusStyles[status].dot}`} aria-hidden />
              {bookingStatusStyles[status].label}
            </li>
          ))}
        </ul>
      </section>

      <aside aria-live="polite" className="h-fit rounded-xl border bg-card p-5">
        {selected === null ? (
          <p className="text-sm text-muted-foreground">
            Escolha um dia para ver as reservas e perceber se a data está livre.
          </p>
        ) : (
          <>
            <h2 className="text-base font-medium">
              {dayFormat.format(new Date(`${selected}T00:00:00Z`))}
            </h2>

            {selectedBookings.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Sem reservas neste dia. A data está livre.
              </p>
            ) : (
              <ul className="mt-4 space-y-4">
                {selectedBookings.map((booking) => (
                  <li key={booking.id} className="space-y-1 border-t pt-4 first:border-t-0 first:pt-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium">{booking.customerName}</p>
                      <BookingStatusBadge status={booking.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{booking.eventType}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.startTime}–{booking.endTime}
                    </p>
                    <p className="text-sm">{formatKwanza(booking.amount)}</p>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href="/admin/reservations"
              className="mt-5 inline-block text-sm text-[#8a7226] hover:text-[#a68f2e] dark:text-[#c9b052]"
            >
              Abrir lista de reservas
            </Link>
          </>
        )}
      </aside>
    </div>
  );
}
