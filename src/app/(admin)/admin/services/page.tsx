import PageHeader from "@/components/admin/PageHeader";
import ServicesManager from "@/components/admin/ServicesManager";
import { services } from "@/lib/admin/mockData";

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <PageHeader
        title="Serviços"
        description="Os serviços e os preços que os clientes veem ao criar uma reserva."
      />
      <ServicesManager initialServices={services} />
    </div>
  );
}
