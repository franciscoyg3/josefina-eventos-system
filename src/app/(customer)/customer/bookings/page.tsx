"use client";

import { useState } from "react";
import Link from "next/link";
import { ClipboardList } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookingCard,
  formatDate,
  type Booking,
  type Status,
} from "@/components/bookings/BookingCard";
import { cn } from "@/lib/utils";

const initialBookings: Booking[] = [
  {
    id: "b1",
    eventType: "Casamento",
    date: "2026-12-20",
    startTime: "15:00",
    endTime: "23:00",
    services: ["Catering", "DJ", "Decoração"],
    total: 850000,
    status: "pendente",
    expiresAt: "2026-11-29T09:30:00+01:00",
  },
  {
    id: "b2",
    eventType: "Aniversário",
    date: "2027-01-09",
    startTime: "16:00",
    endTime: "22:00",
    services: ["DJ", "Decoração"],
    total: 320000,
    status: "em_analise",
    expiresAt: "2026-11-29T01:00:00+01:00",
  },
  {
    id: "b3",
    eventType: "Batizado",
    date: "2026-12-06",
    startTime: "11:00",
    endTime: "16:00",
    services: ["Catering"],
    total: 410000,
    status: "aprovada",
  },
  {
    id: "b4",
    eventType: "Aniversário",
    date: "2026-12-12",
    startTime: "18:00",
    endTime: "23:00",
    services: ["Piscina"],
    total: 180000,
    status: "recusada",
    rejectionReason: "O espaço estará indisponível nessa data por manutenção.",
  },
  {
    id: "b5",
    eventType: "Festa de empresa",
    date: "2026-11-30",
    startTime: "19:00",
    endTime: "23:00",
    services: ["Catering", "DJ"],
    total: 560000,
    status: "expirada",
  },
];

type Filter = "todas" | "em_analise" | "pendente" | "aprovada" | "encerradas";

const filters: {
  value: Filter;
  label: string;
  match: (s: Status) => boolean;
}[] = [
  { value: "todas", label: "Todas", match: () => true },
  {
    value: "em_analise",
    label: "Em análise",
    match: (s) => s === "em_analise",
  },
  { value: "pendente", label: "Pendentes", match: (s) => s === "pendente" },
  { value: "aprovada", label: "Aprovadas", match: (s) => s === "aprovada" },
  {
    value: "encerradas",
    label: "Encerradas",
    match: (s) => s === "recusada" || s === "expirada" || s === "cancelada",
  },
];

function EmptyState({ hasBookings }: { hasBookings: boolean }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
        <ClipboardList className="size-8 text-muted-foreground" aria-hidden />
        {hasBookings ? (
          <p className="text-sm text-muted-foreground">
            Não tem reservas neste estado.
          </p>
        ) : (
          <>
            <div>
              <h2 className="font-serif text-xl">Ainda não tem reservas</h2>
              <p className="text-sm text-muted-foreground">
                Escolha uma data livre e envie o seu primeiro pedido.
              </p>
            </div>
            <Link
              href="/reservations/new"
              className={cn(
                buttonVariants({ size: "sm" }),
                "bg-[#8a7226] text-white hover:bg-[#a68f2e]",
              )}
            >
              Nova reserva
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [filter, setFilter] = useState<Filter>("todas");
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);

  const activeFilter = filters.find((f) => f.value === filter) ?? filters[0];
  const visible = bookings.filter((b) => activeFilter.match(b.status));

  function confirmCancel() {
    if (!cancelTarget) return;
    setBookings((current) =>
      current.map((b) =>
        b.id === cancelTarget.id
          ? { ...b, status: "cancelada", expiresAt: undefined }
          : b,
      ),
    );
    setCancelTarget(null);
  }

  function handlePay(bookingId: string) {
    void bookingId;
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
      <header>
        <h1 className="font-serif text-3xl text-[#8a7226]">
          As minhas reservas
        </h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe o estado dos seus pedidos.
        </p>
      </header>

      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as Filter)}
      >
        <TabsList className="h-auto flex-wrap justify-start">
          {filters.map((f) => (
            <TabsTrigger key={f.value} value={f.value}>
              {f.label}
              <span className="ml-1.5 text-muted-foreground">
                {bookings.filter((b) => f.match(b.status)).length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {visible.length === 0 ? (
        <EmptyState hasBookings={bookings.length > 0} />
      ) : (
        <ul className="space-y-4">
          {visible.map((booking) => (
            <li key={booking.id}>
              <BookingCard
                booking={booking}
                onCancel={() => setCancelTarget(booking)}
                onPay={() => handlePay(booking.id)}
              />
            </li>
          ))}
        </ul>
      )}

      <AlertDialog
        open={cancelTarget !== null}
        onOpenChange={(open) => {
          if (!open) setCancelTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar este pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              {cancelTarget
                ? `O pedido de ${cancelTarget.eventType} para ${formatDate(cancelTarget.date)} será cancelado e a data ficará livre para outros clientes. Esta ação não pode ser revertida.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Manter pedido</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={confirmCancel}
            >
              Cancelar pedido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
