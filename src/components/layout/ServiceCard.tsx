import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import type { ServiceCardProps } from "@/types/ServiceCardPropsType";
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function ServiceCard({
  src,
  alt,
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <article className="group flex w-full max-w-sm flex-col overflow-hidden border border-gold/30 bg-surface transition-shadow duration-300 hover:shadow-lg">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className={`${cormorant.className} text-2xl text-[#a68f2e]`}>
          {title}
        </h3>

        <p className="mt-4 flex-1 text-sm leading-7 text-neutral-600">
          {description}
        </p>

        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-1 text-xs tracking-wide text-[#a68f2e] transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Detalhes <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
