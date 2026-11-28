import Link from "next/link";
import { BadgeCheck, ClipboardList, Clock, Wallet } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";
import { formatDate, formatDateTime, formatKwanza } from "@/lib/admin/format";
import { bookings, payments } from "@/lib/admin/mockData";

const card = "rounded-xl border bg-card p-6";
const link = "text-sm text-[#8a7226] hover:text-[#a68f2e] dark:text-[#c9b052]";

export default function DashboardPage() {
  const underReview = bookings
    .filter((b) => b.status === "UNDER_REVIEW")
    .sort((a, b) => (a.deadline ?? "").localeCompare(b.deadline ?? ""));
  const awaitingPayment = bookings.filter(
    (b) => b.status === "AWAITING_PAYMENT",
  );
  const approved = bookings
    .filter((b) => b.status === "APPROVED")
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate));
  const received = payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <PageHeader
        title="Dashboard"
        description="Resumo dos pedidos, dos pagamentos e da ocupação do salão."
      />

      <section
        aria-label="Resumo"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Pedidos para analisar"
          value={underReview.length}
          hint="Tem 24 horas para responder a cada um"
          icon={<ClipboardList />}
        />
        <StatCard
          label="A aguardar pagamento"
          value={awaitingPayment.length}
          hint="A data fica reservada até ao prazo"
          icon={<Clock />}
        />
        <StatCard
          label="Reservas aprovadas"
          value={approved.length}
          hint="Já pagas e confirmadas"
          icon={<BadgeCheck />}
        />
        <StatCard
          label="Total recebido"
          value={formatKwanza(received)}
          hint="Pagamentos confirmados"
          icon={<Wallet />}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className={card}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-medium">Pedidos para analisar</h2>
            <Link href="/admin/reservations" className={link}>
              Ver todas
            </Link>
          </div>

          {underReview.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Não há pedidos à espera de resposta.
            </p>
          ) : (
            <ul className="mt-4 divide-y">
              {underReview.map((b) => (
                <li
                  key={b.id}
                  className="flex items-start justify-between gap-4 py-3"
                >
                  <div>
                    <p className="font-medium">{b.customerName}</p>
                    <p className="text-sm text-muted-foreground">
                      {b.eventType}, {formatDate(b.eventDate)}
                    </p>
                  </div>
                  {b.deadline && (
                    <p className="text-right text-xs text-muted-foreground">
                      Responder até
                      <span className="block text-sm text-foreground">
                        {formatDateTime(b.deadline)}
                      </span>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={card}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-medium">Próximos eventos</h2>
            <Link href="/admin/calendar" className={link}>
              Abrir calendário
            </Link>
          </div>

          {approved.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Ainda não há eventos confirmados.
            </p>
          ) : (
            <ul className="mt-4 divide-y">
              {approved.map((b) => (
                <li
                  key={b.id}
                  className="flex items-start justify-between gap-4 py-3"
                >
                  <div>
                    <p className="font-medium">{b.eventType}</p>
                    <p className="text-sm text-muted-foreground">
                      {b.customerName}
                    </p>
                  </div>
                  <p className="text-right text-sm">
                    {formatDate(b.eventDate)}
                    <span className="block text-xs text-muted-foreground">
                      {b.startTime}–{b.endTime}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
