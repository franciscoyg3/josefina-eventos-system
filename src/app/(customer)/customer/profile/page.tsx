import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
//import ChangePasswordDialog from "@/components/profile/ChangePasswordDialog";

const user = {
  name: "Ana Silva",
  email: "ana.silva@example.com",
  phone: "",
  address: "",
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const card = "rounded-xl border bg-card p-6";
const labelClass = "text-xs text-muted-foreground";
const inputClass =
  "h-11 focus-visible:border-[#a68f2e] focus-visible:ring-[#a68f2e]/30";

export default function Profile() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-[#8a7226] md:text-4xl">
          O meu perfil
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Faça a gestão dos seus dados e da sua conta.
        </p>
      </header>

      <section className={`${card} flex items-center gap-4`}>
        <div
          aria-hidden
          className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#f4e9cc] text-lg font-medium text-[#6b5a1e]"
        >
          {getInitials(user.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium">{user.name}</p>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
        </div>
      </section>

      <section className={card}>
        <h2 className="text-lg font-medium">Informações pessoais</h2>
        <p className="text-sm text-muted-foreground">Usadas nas suas reservas.</p>

        <form className="mt-6 space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="name" className={labelClass}>
                Nome completo
              </FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                defaultValue={user.name}
                required
                className={inputClass}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="phone" className={labelClass}>
                Número de Telefone
              </FieldLabel>
              <Input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+244 9XXXXXXXX"
                defaultValue={user.phone}
                className={inputClass}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email" className={labelClass}>
                E-mail
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={user.email}
                required
                className={inputClass}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="address" className={labelClass}>
                Morada (Opcional)
              </FieldLabel>
              <Input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                placeholder="Bairro, rua, número"
                defaultValue={user.address}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="reset" variant="outline" className="h-10">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="h-10 bg-[#8a7226] text-white hover:bg-[#a68f2e]"
            >
              Guardar alterações
            </Button>
          </div>
        </form>
      </section>
      
      <section
        className={`${card} flex flex-wrap items-center justify-between gap-4`}
      >
        <div>
          <h2 className="flex items-center gap-2 text-lg font-medium">
            <Lock className="size-4" aria-hidden />
            Segurança
          </h2>
          <p className="text-sm text-muted-foreground">
            Atualize a sua palavra-passe.
          </p>
        </div>

        {/* <ChangePasswordDialog /> */}
      </section>
    </div>
  );
}