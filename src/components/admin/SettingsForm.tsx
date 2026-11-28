"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const card = "rounded-xl border bg-card p-6";
const labelClass = "text-xs text-muted-foreground";
const inputClass = "h-11 focus-visible:border-[#a68f2e] focus-visible:ring-[#a68f2e]/30";

export default function SettingsForm() {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => setSaved(false)}
      className="space-y-6"
    >
      <section className={card}>
        <h2 className="text-lg font-medium">Informações do espaço</h2>
        <p className="text-sm text-muted-foreground">
          Aparecem no site público e nos e-mails enviados aos clientes.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="space-name" className={labelClass}>Nome do espaço</FieldLabel>
            <Input id="space-name" name="spaceName" defaultValue="Josefina Eventos" required className={inputClass} />
          </Field>
          <Field>
            <FieldLabel htmlFor="capacity" className={labelClass}>Capacidade máxima (convidados)</FieldLabel>
            <Input id="capacity" name="capacity" type="number" min={1} defaultValue={200} required className={inputClass} />
          </Field>
          <Field>
            <FieldLabel htmlFor="contact-email" className={labelClass}>E-mail de contacto</FieldLabel>
            <Input id="contact-email" name="contactEmail" type="email" defaultValue="josefina_eventos@gmail.com" required className={inputClass} />
          </Field>
          <Field>
            <FieldLabel htmlFor="contact-phone" className={labelClass}>Telefone</FieldLabel>
            <Input id="contact-phone" name="contactPhone" type="tel" inputMode="tel" defaultValue="937 006 425" className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field>
              <FieldLabel htmlFor="address" className={labelClass}>Morada</FieldLabel>
              <Input id="address" name="address" defaultValue="Rua da Dona Chepa, Benfica, Luanda" className={inputClass} />
            </Field>
          </div>
        </div>
      </section>

      <section className={card}>
        <h2 className="text-lg font-medium">Regras de reserva</h2>
        <p className="text-sm text-muted-foreground">
          Aplicam-se aos novos pedidos. Todos os prazos são contados em horas.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="min-notice" className={labelClass}>Antecedência mínima</FieldLabel>
            <Input id="min-notice" name="minNoticeHours" type="number" min={0} defaultValue={48} required className={inputClass} />
          </Field>
          <Field>
            <FieldLabel htmlFor="review-window" className={labelClass}>Prazo de análise</FieldLabel>
            <Input id="review-window" name="reviewWindowHours" type="number" min={1} defaultValue={24} required className={inputClass} />
          </Field>
          <Field>
            <FieldLabel htmlFor="payment-window" className={labelClass}>Prazo de pagamento</FieldLabel>
            <Input id="payment-window" name="paymentWindowHours" type="number" min={1} defaultValue={24} required className={inputClass} />
          </Field>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          O prazo de análise conta desde a submissão. O prazo de pagamento conta desde que aceita o pedido.
        </p>
      </section>

      <div className="flex items-center justify-end gap-4">
        {saved && (
          <p role="status" className="text-sm text-muted-foreground">
            Alterações guardadas.
          </p>
        )}
        <Button type="reset" variant="outline" className="h-10" onClick={() => setSaved(false)}>
          Cancelar
        </Button>
        <Button type="submit" className="h-10 bg-[#8a7226] text-white hover:bg-[#a68f2e]">
          Guardar alterações
        </Button>
      </div>
    </form>
  );
}
