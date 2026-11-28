import type { PageHeaderProps } from "@/types/pageHeaderPropsType";

export default function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-serif text-3xl text-[#8a7226] md:text-4xl dark:text-[#c9b052]">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </header>
  );
}
