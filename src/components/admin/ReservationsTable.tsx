"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingStatusBadge } from "@/components/admin/StatusBadge";
import { formatDate, formatDateTime, formatKwanza } from "@/lib/admin/format";
import type { AdminBooking, BookingStatus } from "@/types/adminTypes";

type Filter = "ALL" | BookingStatus;

const filters: { value: Filter; label: string }[] = [
  { value: "ALL", label: "Todas" },
  { value: "UNDER_REVIEW", label: "Em análise" },
  { value: "AWAITING_PAYMENT", label: "Pendentes" },
  { value: "APPROVED", label: "Aprovadas" },
  { value: "REJECTED", label: "Recusadas" },
  { value: "EXPIRED", label: "Expiradas" },
  { value: "CANCELLED", label: "Canceladas" },
];

const textareaClass =
  "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:border-[#a68f2e] focus-visible:ring-[3px] focus-visible:ring-[#a68f2e]/30";

function deadlineText(booking: AdminBooking) {
  if (!booking.deadline) return null;
  if (booking.status === "UNDER_REVIEW") {
    return `Responder até ${formatDateTime(booking.deadline)}`;
  }
  if (booking.status === "AWAITING_PAYMENT") {
    return `Pagar até ${formatDateTime(booking.deadline)}`;
  }
  return null;
}

export default function ReservationsTable({
  initialBookings,
}: {
  initialBookings: AdminBooking[];
}) {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [rejecting, setRejecting] = useState<AdminBooking | null>(null);
  const [reason, setReason] = useState("");

  const counts = useMemo(() => {
    const result: Record<string, number> = { ALL: bookings.length };
    for (const booking of bookings) {
      result[booking.status] = (result[booking.status] ?? 0) + 1;
    }
    return result;
  }, [bookings]);

  const visible =
    filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  const accept = (id: string) => {
    // call server action to acceptReservation(id) (with requireRole("ADMIN")):
    setBookings((current) =>
      current.map(
        (b): AdminBooking =>
          b.id === id
            ? {
                ...b,
                status: "AWAITING_PAYMENT",
                deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
              }
            : b,
      ),
    );
  };

  const closeReject = () => {
    setRejecting(null);
    setReason("");
  };

  const confirmReject = () => {
    if (!rejecting || reason.trim().length < 5) return;
    const id = rejecting.id;
    const rejectionReason = reason.trim();

    // call server action to reject and
    // sent rejection reason by email
    setBookings((current) =>
      current.map(
        (b): AdminBooking =>
          b.id === id
            ? { ...b, status: "REJECTED", deadline: undefined, rejectionReason }
            : b,
      ),
    );
    closeReject();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por estado">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            aria-pressed={filter === item.value}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a68f2e] ${
              filter === item.value
                ? "border-[#8a7226] bg-[#8a7226] text-white"
                : "text-muted-foreground hover:bg-[#a68f2e]/10 hover:text-foreground"
            }`}
          >
            {item.label}
            <span className="ml-1.5 text-xs opacity-80">{counts[item.value] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-232 text-sm">
          <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Pedido</th>
              <th scope="col" className="px-4 py-3 font-medium">Evento</th>
              <th scope="col" className="px-4 py-3 font-medium">Valor</th>
              <th scope="col" className="px-4 py-3 font-medium">Estado</th>
              <th scope="col" className="px-4 py-3 font-medium">Prazo</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  Não há reservas neste estado.
                </td>
              </tr>
            )}

            {visible.map((booking) => (
              <tr key={booking.id} className="align-top">
                <td className="px-4 py-4">
                  <p className="font-medium">{booking.customerName}</p>
                  <p className="text-xs text-muted-foreground">{booking.code}</p>
                </td>
                <td className="px-4 py-4">
                  <p>{booking.eventType}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(booking.eventDate)}, {booking.startTime}–{booking.endTime}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {booking.services.join(", ")}
                  </p>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{formatKwanza(booking.amount)}</td>
                <td className="px-4 py-4">
                  <BookingStatusBadge status={booking.status} />
                  {booking.rejectionReason && (
                    <p className="mt-1 max-w-48 text-xs text-muted-foreground">
                      {booking.rejectionReason}
                    </p>
                  )}
                </td>
                <td className="px-4 py-4 text-xs text-muted-foreground">
                  {deadlineText(booking) ?? "Sem prazo"}
                </td>
                <td className="px-4 py-4">
                  {booking.status === "UNDER_REVIEW" ? (
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        size="sm"
                        className="bg-[#8a7226] text-white hover:bg-[#a68f2e]"
                        onClick={() => accept(booking.id)}
                      >
                        Aceitar pedido
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setRejecting(booking)}
                      >
                        Recusar
                      </Button>
                    </div>
                  ) : (
                    <p className="text-right text-xs text-muted-foreground">Sem ações</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={rejecting !== null} onOpenChange={(open) => !open && closeReject()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Recusar pedido {rejecting?.code}</DialogTitle>
            <DialogDescription>
              O cliente recebe este motivo por e-mail e a data volta a ficar livre.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <label htmlFor="rejection-reason" className="text-sm font-medium">
              Motivo da recusa
            </label>
            <textarea
              id="rejection-reason"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explique ao cliente porque não é possível aceitar o pedido."
              className={textareaClass}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeReject}>
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={confirmReject}
              disabled={reason.trim().length < 5}
              className="bg-[#8a7226] text-white hover:bg-[#a68f2e]"
            >
              Recusar pedido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
