import { BadgeCheck, Clock, XCircle } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";
import { PaymentStatusBadge } from "@/components/admin/StatusBadge";
import { formatDateTime, formatKwanza } from "@/lib/admin/format";
import { payments } from "@/lib/admin/mockData";

export default function PaymentsPage() {
  const sum = (status: "PAID" | "PENDING" | "EXPIRED") =>
    payments
      .filter((p) => p.status === status)
      .reduce((total, p) => total + p.amount, 0);
  const count = (status: "PAID" | "PENDING" | "EXPIRED") =>
    payments.filter((p) => p.status === status).length;

  const sorted = [...payments].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <PageHeader
        title="Pagamentos"
        description="Acompanhe os pagamentos das reservas. A confirmação chega automaticamente do fornecedor."
      />

      <section aria-label="Resumo" className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Recebido"
          value={formatKwanza(sum("PAID"))}
          hint={`${count("PAID")} pagamentos confirmados`}
          icon={<BadgeCheck />}
        />
        <StatCard
          label="A aguardar"
          value={formatKwanza(sum("PENDING"))}
          hint={`${count("PENDING")} dentro do prazo de 24 horas`}
          icon={<Clock />}
        />
        <StatCard
          label="Expirados"
          value={formatKwanza(sum("EXPIRED"))}
          hint={`${count("EXPIRED")} não pagos a tempo`}
          icon={<XCircle />}
        />
      </section>

      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-208 text-sm">
          <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Referência
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Reserva
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Cliente
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Valor
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Método
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Estado
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sorted.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  Ainda não há pagamentos registados.
                </td>
              </tr>
            )}

            {sorted.map((payment) => (
              <tr key={payment.id}>
                <td className="px-4 py-3 font-medium">{payment.reference}</td>
                <td className="px-4 py-3">{payment.bookingCode}</td>
                <td className="px-4 py-3">{payment.customerName}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {formatKwanza(payment.amount)}
                </td>
                <td className="px-4 py-3">{payment.method}</td>
                <td className="px-4 py-3">
                  <PaymentStatusBadge status={payment.status} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {formatDateTime(payment.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}