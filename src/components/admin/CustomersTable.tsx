"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { formatDate, formatKwanza, getInitials } from "@/lib/admin/format";
import type { AdminCustomer } from "@/types/adminTypes";

export default function CustomersTable({ customers }: { customers: AdminCustomer[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return customers;
    return customers.filter((c) =>
      `${c.name} ${c.email} ${c.phone}`.toLowerCase().includes(term),
    );
  }, [customers, query]);

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <label htmlFor="customer-search" className="sr-only">
          Pesquisar clientes
        </label>
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          id="customer-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar por nome, e-mail ou telefone"
          className="h-10 w-full rounded-md border bg-background pr-3 pl-9 text-sm outline-none focus-visible:border-[#a68f2e] focus-visible:ring-[3px] focus-visible:ring-[#a68f2e]/30"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-3xl text-sm">
          <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Cliente</th>
              <th scope="col" className="px-4 py-3 font-medium">Telefone</th>
              <th scope="col" className="px-4 py-3 font-medium">Reservas</th>
              <th scope="col" className="px-4 py-3 font-medium">Total pago</th>
              <th scope="col" className="px-4 py-3 font-medium">Última reserva</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {results.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  Nenhum cliente corresponde à pesquisa.
                </td>
              </tr>
            )}

            {results.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#a68f2e]/15 text-sm font-medium text-[#8a7226] dark:text-[#c9b052]"
                    >
                      {getInitials(customer.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{customer.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{customer.phone}</td>
                <td className="px-4 py-3">{customer.bookingsCount}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatKwanza(customer.totalPaid)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {customer.lastBookingDate ? formatDate(customer.lastBookingDate) : "Sem reservas"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
