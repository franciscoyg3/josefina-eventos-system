import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  icon: ReactNode;
};

export default function StatCard({ label, value, hint, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span
          aria-hidden
          className="flex size-9 items-center justify-center rounded-lg bg-[#a68f2e]/15 text-[#8a7226] dark:text-[#c9b052] [&>svg]:size-5"
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 text-2xl font-medium">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
