"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Status =
  | "em_analise"
  | "pendente"
  | "aprovada"
  | "recusada"
  | "expirada"
  | "cancelada";

export type Booking = {
  id: string;
  eventType: string;
  date: string; // AAAA-MM-DD
  startTime: string;
  endTime: string;
  services: string[];
  total: number;
  status: Status;
  expiresAt?: string;
  rejectionReason?: string; 
};

const statusConfig: Record<Status, { label: string; className: string }> = {
  em_analise: {
    label: "Em análise",
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  pendente: {
    label: "Pendente",
    className: "border-[#8a7226]/30 bg-[#f2ede0] text-[#8a7226]",
  },
  aprovada: {
    label: "Aprovada",
    className: "border-green-200 bg-green-50 text-green-800",
  },
  recusada: {
    label: "Recusada",
    className: "border-red-200 bg-red-50 text-red-800",
  },
  expirada: {
    label: "Expirada",
    className: "border-stone-200 bg-stone-100 text-stone-600",
  },
  cancelada: {
    label: "Cancelada",
    className: "border-stone-200 bg-stone-100 text-stone-600",
  },
};

const dateFormat = new Intl.DateTimeFormat("pt-PT", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Africa/Luanda",
});

const moneyFormat = new Intl.NumberFormat("pt-AO", {
  style: "currency",
  currency: "AOA",
  maximumFractionDigits: 0,
});

export function formatDate(date: string) {
  return dateFormat.format(new Date(`${date}T12:00:00+01:00`));
}

function subscribeToMinute(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

function useMinuteClock() {
  return useSyncExternalStore(
    subscribeToMinute,
    () => Math.floor(Date.now() / 60_000) * 60_000,
    () => null,
  );
}

function TimeLeft({ expiresAt }: { expiresAt: string }) {
  const now = useMinuteClock();
  if (now === null) return <span>…</span>;

  const minutes = Math.max(
    0,
    Math.floor((new Date(expiresAt).getTime() - now) / 60_000),
  );
  const hours = Math.floor(minutes / 60);

  return (
    <strong className="font-medium">
      {hours > 0 ? `${hours} h ${minutes % 60} min` : `${minutes} min`}
    </strong>
  );
}

function Note({ tone, children }: { tone: string; children: ReactNode }) {
  return <p className={cn("rounded-lg px-3 py-2 text-sm", tone)}>{children}</p>;
}

function StatusNote({ booking }: { booking: Booking }) {
  switch (booking.status) {
    case "em_analise":
      return (
        <Note tone="bg-amber-50 text-amber-900">
          A aguardar resposta da equipa.
          {booking.expiresAt && (
            <>
              {" "}
              O pedido expira em <TimeLeft expiresAt={booking.expiresAt} />.
            </>
          )}
        </Note>
      );
    case "pendente":
      return (
        <Note tone="bg-[#f2ede0] text-[#6b5a1d]">
          Pedido aceite.
          {booking.expiresAt && (
            <>
              {" "}
              Conclua o pagamento em <TimeLeft
                expiresAt={booking.expiresAt}
              />{" "}
              para confirmar a data.
            </>
          )}
        </Note>
      );
    case "aprovada":
      return (
        <Note tone="bg-green-50 text-green-900">
          Pagamento confirmado. A data está reservada para si.
        </Note>
      );
    case "recusada":
      return (
        <Note tone="bg-red-50 text-red-900">
          Motivo: {booking.rejectionReason ?? "não indicado."}
        </Note>
      );
    case "expirada":
      return (
        <Note tone="bg-stone-100 text-stone-700">
          O prazo terminou e a data foi libertada.
        </Note>
      );
    case "cancelada":
      return (
        <Note tone="bg-stone-100 text-stone-700">
          Cancelou este pedido e a data foi libertada.
        </Note>
      );
  }
}

type BookingCardProps = {
  booking: Booking;
  onCancel: () => void;
  onPay: () => void;
};

export function BookingCard({ booking, onCancel, onPay }: BookingCardProps) {
  const { label, className } = statusConfig[booking.status];
  const canCancel =
    booking.status === "em_analise" || booking.status === "pendente";

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <h2 className="font-serif text-xl">{booking.eventType}</h2>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="size-4 shrink-0" aria-hidden />
              <span className="first-letter:uppercase">
                {formatDate(booking.date)}
              </span>
            </p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4 shrink-0" aria-hidden />
              {booking.startTime} – {booking.endTime}
            </p>
          </div>
          <Badge variant="outline" className={className}>
            {label}
          </Badge>
        </div>

        {booking.services.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {booking.services.map((service) => (
              <li
                key={service}
                className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {service}
              </li>
            ))}
          </ul>
        )}

        <StatusNote booking={booking} />

        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Valor estimado{" "}
            <span className="ml-1 font-medium text-foreground">
              {moneyFormat.format(booking.total)}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {canCancel && (
              <Button variant="ghost" size="sm" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Link
              href={`/reservations/${booking.id}`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Ver detalhes
            </Link>
            {booking.status === "pendente" && (
              <Button
                size="sm"
                className="bg-[#8a7226] text-white hover:bg-[#a68f2e]"
                onClick={onPay}
              >
                Pagar agora
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}