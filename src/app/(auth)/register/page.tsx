import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const labelClass = "text-xs uppercase tracking-widest text-[#8a7226]";
const inputClass =
  "h-11 bg-[#fcfafa] focus-visible:border-[#a68f2e] focus-visible:ring-[#a68f2e]/30";

export default function Register() {
  return (
    <main className="grid min-h-screen md:grid-cols-2">
      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
            <Link href="/">
              <h1 className={`${cormorant.className} text-4xl text-[#8a7226]`}>
              Josefina Eventos
              </h1>
            </Link>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Crie a sua conta para consultar datas e pedir a sua reserva.
          </p>

          <form className="mt-8">
            <FieldSet>
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel htmlFor="name" className={labelClass}>
                    Nome completo
                  </FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Insira o seu nome"
                    required
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
                    placeholder="exemplo@email.com"
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
                    required
                    className={inputClass}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password" className={labelClass}>
                    Palavra-passe
                  </FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    placeholder="Mínimo 8 caracteres"
                    required
                    className={inputClass}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword" className={labelClass}>
                    Confirmar palavra-passe
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    placeholder="Repita a palavra-passe"
                    required
                    className={inputClass}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <button
              type="submit"
              className="mt-8 h-11 w-full rounded-md bg-[#8a7226] text-sm font-medium text-white transition-colors duration-300 hover:bg-[#a68f2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a68f2e]"
            >
              Criar Conta
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-neutral-600">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#8a7226] transition-colors hover:text-[#a68f2e]"
            >
              Iniciar Sessão
            </Link>
          </p>
        </div>
      </section>

      <section className="relative hidden md:block">
        <Image
          src="/images/auth/registercover.jpg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/30"
          aria-hidden
        />

        <div className="absolute inset-x-0 bottom-0 p-12 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-[#f4d598]">
            O início de um sonho
          </p>
          <p
            className={`${cormorant.className} mt-4 max-w-md text-4xl leading-[1.15] lg:text-5xl`}
          >
            Dê o primeiro passo para uma celebração memorável.
          </p>
        </div>
      </section>
    </main>
  );
}