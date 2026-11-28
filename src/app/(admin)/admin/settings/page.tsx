import PageHeader from "@/components/admin/PageHeader";
import SettingsForm from "@/components/admin/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <PageHeader
        title="Definições"
        description="Dados do salão e regras que o sistema aplica às reservas."
      />
      <SettingsForm />
    </div>
  );
}
