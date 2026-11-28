import { Suspense } from "react";
import PageHeader from "@/components/admin/PageHeader";
import AdminCalendar from "@/components/admin/AdminCalendar";
import { bookings } from "@/lib/admin/mockData";


function CalendarSkeleton() {
  return <div className="h-128 animate-pulse rounded-xl border bg-card" />;
}

export default function Calendar() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <PageHeader
        title="Calendário"
        description="Veja as datas ocupadas, os pedidos em curso e os dias livres."
      />
      <Suspense fallback={<CalendarSkeleton />}>
        <AdminCalendar bookings={bookings} />
      </Suspense>
    </div>
  );
}
