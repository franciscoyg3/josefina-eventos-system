import PageHeader from "@/components/admin/PageHeader";
import CustomersTable from "@/components/admin/CustomersTable";
import { customers } from "@/lib/admin/mockData";

export default function CustomersPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <PageHeader
        title="Clientes"
        description="Quem já fez pedidos de reserva no salão."
      />
      <CustomersTable customers={customers} />
    </div>
  );
}
