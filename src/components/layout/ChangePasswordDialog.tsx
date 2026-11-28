"use client";

import { useState } from "react";
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

const labelClass = "text-xs text-muted-foreground";
const inputClass =
  "h-11 focus-visible:border-[#a68f2e] focus-visible:ring-[#a68f2e]/30";

export default function ChangePasswordDialog() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openDialog = () => setOpen(true);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const newPassword = String(data.get("newPassword"));
    const confirmPassword = String(data.get("confirmPassword"));

    if (newPassword !== confirmPassword) {
      setError("As palavras-passe não coincidem.");
      return;
    }

    form.reset();
    handleOpenChange(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="h-10"
        onClick={openDialog}
      >
        Alterar palavra-passe
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-[#8a7226]">
              Alterar palavra-passe
            </DialogTitle>
            <DialogDescription>
              Use pelo menos 8 caracteres. Não reutilize palavras-passe de
              outros sites.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field>
              <FieldLabel htmlFor="currentPassword" className={labelClass}>
                Palavra-passe atual
              </FieldLabel>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
                className={inputClass}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="newPassword" className={labelClass}>
                Nova palavra-passe
              </FieldLabel>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                className={inputClass}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword" className={labelClass}>
                Confirmar nova palavra-passe
              </FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                aria-invalid={!!error}
                className={inputClass}
              />
            </Field>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#8a7226] text-white hover:bg-[#a68f2e]"
              >
                Alterar palavra-passe
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
