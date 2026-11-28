import PageHeader from "@/components/admin/PageHeader";
import ReservationsTable from "@/components/admin/ReservationsTable";
import { bookings } from "@/lib/admin/mockData";

export default function ReservationsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <PageHeader
        title="Reservas"
        description="Analise os pedidos e acompanhe o estado de cada reserva."
      />
      <ReservationsTable initialBookings={bookings} />
    </div>
  );
}
