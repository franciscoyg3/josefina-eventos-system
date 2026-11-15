import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import type { ServiceCardProps } from "@/types/cardServiceType";
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function ServiceCard({
  image,
  alt,
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <article className="group flex w-full max-w-sm flex-col overflow-hidden border border-[#a68f2e]/30 bg-[#fcfafa] transition-shadow duration-300 hover:shadow-lg">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image}
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

        <p className="mt-4 flex-1 text-sm leading-7 text-slate-500">
          {description}
        </p>

        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-1 text-xs tracking-wide text-[#8a7226] transition-colors hover:text-[#a68f2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a68f2e]"
        >
          Detalhes <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
