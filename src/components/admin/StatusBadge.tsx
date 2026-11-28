import type { BookingStatus, PaymentStatus } from "@/types/adminTypes";

const badge =
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap";

export const bookingStatusStyles: Record<
  BookingStatus,
  { label: string; badge: string; dot: string }
> = {
  UNDER_REVIEW: {
    label: "Em análise",
    badge: "bg-amber-500/15 text-amber-800 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  AWAITING_PAYMENT: {
    label: "Pendente",
    badge: "bg-sky-500/15 text-sky-800 dark:text-sky-300",
    dot: "bg-sky-500",
  },
  APPROVED: {
    label: "Aprovada",
    badge: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  REJECTED: {
    label: "Recusada",
    badge: "bg-red-500/15 text-red-800 dark:text-red-300",
    dot: "bg-red-500",
  },
  EXPIRED: {
    label: "Expirada",
    badge: "bg-muted text-muted-foreground",
    dot: "bg-neutral-400",
  },
  CANCELLED: {
    label: "Cancelada",
    badge: "bg-muted text-muted-foreground",
    dot: "bg-neutral-400",
  },
};

const paymentStyles: Record<PaymentStatus, { label: string; badge: string }> = {
  PAID: {
    label: "Pago",
    badge: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300",
  },
  PENDING: {
    label: "A aguardar",
    badge: "bg-sky-500/15 text-sky-800 dark:text-sky-300",
  },
  EXPIRED: { label: "Expirado", badge: "bg-muted text-muted-foreground" },
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const { label, badge: style } = bookingStatusStyles[status];
  return <span className={`${badge} ${style}`}>{label}</span>;
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const { label, badge: style } = paymentStyles[status];
  return <span className={`${badge} ${style}`}>{label}</span>;
}
