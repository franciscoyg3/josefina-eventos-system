"use client";

import Link from "next/link";
import { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit() {
    setSent(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        <Link href="/" className="font-serif text-2xl text-[#8a7226]">
          Josefina Eventos
        </Link>

        <h1 className="mt-8 text-2xl font-semibold text-neutral-900">
          Esqueceu a sua palavra-passe?
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          Insira o e-mail associado à sua conta e enviaremos um link para
          redefinir a palavra-passe.
        </p>

        {sent ? (
          <div role="status" className="mt-8 rounded-md border border-[#8a7226]/30 bg-[#fcfafa] p-4 text-sm text-neutral-700">
            Se existir uma conta com o e-mail <strong>{email}</strong>, vai
            receber as instruções em breve. Verifique também a pasta de spam.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 text-left">
            <Field>
              <FieldLabel
                htmlFor="email"
                className="text-xs uppercase tracking-widest text-[#8a7226]"
              >
                E-mail
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Insira o seu e-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 bg-[#fcfafa] focus-visible:border-[#a68f2e] focus-visible:ring-[#a68f2e]/30"
              />
            </Field>

            <button
              type="submit"
              className="mt-6 h-11 w-full rounded-md bg-[#8a7226] text-sm font-medium text-white transition-colors duration-300 hover:bg-[#a68f2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a68f2e]"
            >
              Enviar instruções de redefinição
            </button>
          </form>
        )}

        <Link
          href="/login"
          className="mt-6 inline-block text-xs text-[#8a7226] underline-offset-4 transition-colors hover:text-[#a68f2e] hover:underline"
        >
          Voltar ao início de sessão
        </Link>
      </div>
    </main>
  );
}