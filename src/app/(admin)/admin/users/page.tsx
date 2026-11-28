import PageHeader from "@/components/admin/PageHeader";
import InviteAdminDialog from "@/components/admin/InviteAdminDialog";
import { formatDateTime, getInitials } from "@/lib/admin/format";
import { adminUsers } from "@/lib/admin/mockData";

export default function UsersPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <PageHeader
        title="Utilizadores"
        description="Contas com acesso ao painel de administração."
        action={<InviteAdminDialog />}
      />

      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-160 text-sm">
          <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Utilizador</th>
              <th scope="col" className="px-4 py-3 font-medium">Perfil</th>
              <th scope="col" className="px-4 py-3 font-medium">Estado</th>
              <th scope="col" className="px-4 py-3 font-medium">Último acesso</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {adminUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#a68f2e]/15 text-sm font-medium text-[#8a7226] dark:text-[#c9b052]"
                    >
                      {getInitials(user.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">Administrador</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.status === "ACTIVE"
                        ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300"
                        : "bg-amber-500/15 text-amber-800 dark:text-amber-300"
                    }`}
                  >
                    {user.status === "ACTIVE" ? "Ativo" : "Convite pendente"}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {user.lastLogin ? formatDateTime(user.lastLogin) : "Ainda não entrou"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-muted-foreground">
        As contas de administrador só se criam por convite. O registo público cria sempre clientes.
      </p>
    </div>
  );
}