"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatKwanza } from "@/lib/admin/format";
import type { AdminService } from "@/types/adminTypes";

type Editing = AdminService | "new" | null;

const controlClass =
  "w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-[#a68f2e] focus-visible:ring-[3px] focus-visible:ring-[#a68f2e]/30";
const labelClass = "text-xs text-muted-foreground";
const inputClass = "h-11 focus-visible:border-[#a68f2e] focus-visible:ring-[#a68f2e]/30";

export default function ServicesManager({
  initialServices,
}: {
  initialServices: AdminService[];
}) {
  const [services, setServices] = useState(initialServices);
  const [editing, setEditing] = useState<Editing>(null);
  const current = editing && editing !== "new" ? editing : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const values: Omit<AdminService, "id" | "active"> = {
      name: String(data.get("name")).trim(),
      category: data.get("category") === "PRINCIPAL" ? "PRINCIPAL" : "EXTRA",
      price: Number(data.get("price")),
      unit: String(data.get("unit")).trim(),
      description: String(data.get("description")).trim(),
    };

    if (current) {
      setServices((list) =>
        list.map((s): AdminService => (s.id === current.id ? { ...s, ...values } : s)),
      );
    } else {
      setServices((list) => [
        ...list,
        { ...values, id: crypto.randomUUID(), active: true },
      ]);
    }
    setEditing(null);
  };

  const toggleActive = (id: string) => {
    // server action setServiceActive(id, active)
    setServices((list) =>
      list.map((s): AdminService => (s.id === id ? { ...s, active: !s.active } : s)),
    );
  };

  const remove = (service: AdminService) => {
    if (!window.confirm(`Eliminar o serviço "${service.name}"?`)) return;
    // server action deleteService(id)
    setServices((list) => list.filter((s) => s.id !== service.id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          type="button"
          className="bg-[#8a7226] text-white hover:bg-[#a68f2e]"
          onClick={() => setEditing("new")}
        >
          <Plus />
          Adicionar serviço
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-208 text-sm">
          <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Serviço</th>
              <th scope="col" className="px-4 py-3 font-medium">Categoria</th>
              <th scope="col" className="px-4 py-3 font-medium">Preço</th>
              <th scope="col" className="px-4 py-3 font-medium">Disponível</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {services.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  Ainda não há serviços. Adicione o primeiro para os clientes o poderem escolher.
                </td>
              </tr>
            )}

            {services.map((service) => (
              <tr key={service.id} className="align-top">
                <td className="px-4 py-4">
                  <p className="font-medium">{service.name}</p>
                  <p className="mt-0.5 max-w-sm text-xs text-muted-foreground">
                    {service.description}
                  </p>
                </td>
                <td className="px-4 py-4">
                  {service.category === "PRINCIPAL" ? "Principal" : "Extra"}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {formatKwanza(service.price)}
                  <span className="block text-xs text-muted-foreground">{service.unit}</span>
                </td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={service.active}
                    aria-label={`${service.name}: ${service.active ? "disponível" : "indisponível"}`}
                    onClick={() => toggleActive(service.id)}
                    className={`relative h-6 w-11 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a68f2e] ${
                      service.active ? "bg-[#8a7226]" : "bg-muted-foreground/30"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform ${
                        service.active ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Editar ${service.name}`}
                      onClick={() => setEditing(service)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Eliminar ${service.name}`}
                      onClick={() => remove(service)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{current ? "Editar serviço" : "Adicionar serviço"}</DialogTitle>
            <DialogDescription>
              Os clientes veem o nome, a descrição e o preço ao criar uma reserva.
            </DialogDescription>
          </DialogHeader>

          <form
            key={current?.id ?? "new"}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <Field>
              <FieldLabel htmlFor="service-name" className={labelClass}>Nome</FieldLabel>
              <Input
                id="service-name"
                name="name"
                defaultValue={current?.name}
                required
                className={inputClass}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="service-category" className={labelClass}>Categoria</FieldLabel>
                <select
                  id="service-category"
                  name="category"
                  defaultValue={current?.category ?? "EXTRA"}
                  className={`${controlClass} h-11`}
                >
                  <option value="PRINCIPAL">Principal</option>
                  <option value="EXTRA">Extra</option>
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="service-price" className={labelClass}>Preço (Kz)</FieldLabel>
                <Input
                  id="service-price"
                  name="price"
                  type="number"
                  min={0}
                  step={500}
                  defaultValue={current?.price}
                  required
                  className={inputClass}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="service-unit" className={labelClass}>Cobrança</FieldLabel>
              <Input
                id="service-unit"
                name="unit"
                placeholder="por evento, por convidado..."
                defaultValue={current?.unit ?? "por evento"}
                required
                className={inputClass}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="service-description" className={labelClass}>Descrição</FieldLabel>
              <textarea
                id="service-description"
                name="description"
                rows={3}
                defaultValue={current?.description}
                className={`${controlClass} py-2`}
              />
            </Field>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#8a7226] text-white hover:bg-[#a68f2e]">
                Guardar serviço
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
