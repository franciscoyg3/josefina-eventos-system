"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { GalleryImage } from "@/types/galleryImageType";

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3">
        {images.map((img) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(img)}
            aria-label={`Ampliar: ${img.alt}`}
            className="group relative mb-3 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={1000}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white">
                {img.category}
              </span>
              <Expand className="size-4 text-white" aria-hidden />
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-4xl gap-0 overflow-hidden border-0 bg-black p-0 sm:max-w-4xl [&>button]:text-white">
          <DialogTitle className="sr-only">{active?.alt}</DialogTitle>
          {active && (
            <>
              <Image
                src={active.src}
                alt={active.alt}
                width={1200}
                height={800}
                className="max-h-[75vh] w-full object-contain"
              />
              <div className="flex items-center justify-between gap-4 px-6 py-4">
                <p className="text-sm text-white/85">{active.alt}</p>
                <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-[#f4d598]">
                  {active.category}
                </span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
