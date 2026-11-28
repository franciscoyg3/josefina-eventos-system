"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
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

export default function InviteAdminDialog() {
  const [open, setOpen] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) setSentTo(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email")).trim();
    
    form.reset();
    setSentTo(email);
  };

  return (
    <>
      <Button
        type="button"
        className="bg-[#8a7226] text-white hover:bg-[#a68f2e]"
        onClick={() => setOpen(true)}
      >
        <UserPlus />
        Convidar administrador
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          {sentTo ? (
            <>
              <DialogHeader>
                <DialogTitle>Convite enviado</DialogTitle>
                <DialogDescription>
                  Enviámos um link para {sentTo}. A pessoa define a própria
                  palavra-passe ao aceitar o convite.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  className="bg-[#8a7226] text-white hover:bg-[#a68f2e]"
                  onClick={() => handleOpenChange(false)}
                >
                  Concluir
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Convidar administrador</DialogTitle>
                <DialogDescription>
                  A pessoa recebe um link por e-mail para criar a conta com acesso ao painel.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Field>
                  <FieldLabel htmlFor="invite-email" className="text-xs text-muted-foreground">
                    E-mail
                  </FieldLabel>
                  <Input
                    id="invite-email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    placeholder="nome@exemplo.com"
                    required
                    className="h-11 focus-visible:border-[#a68f2e] focus-visible:ring-[#a68f2e]/30"
                  />
                </Field>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-[#8a7226] text-white hover:bg-[#a68f2e]">
                    Enviar convite
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
