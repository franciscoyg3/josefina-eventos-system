"use client";

import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import ServiceCard from "@/components/layout/ServiceCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
}

export default function Home() {
  const images = [
    {
      src: "/images/carousel/evento1.jpg",
      alt: "Photo of tree African women.",
      width: 700,
      height: 500,
    },
    {
      src: "/images/carousel/evento2.jpg",
      alt: "Photo of a married couple.",
      width: 700,
      height: 500,
    },
    {
      src: "/images/carousel/evento3.jpeg",
      alt: "Photo of a married couple, drinking.",
      width: 700,
      height: 500
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center text-center"
      >
        <motion.span variants={item} className="text-[#8a7226] text-xl">
          &#9670;
        </motion.span>

        <motion.h1
          variants={item}
          className={`${cormorant.className} mt-6 text-4xl md:text-5xl text-[#a68f2e]`}
        >
          Bem-vindo à Luzia Eventos
        </motion.h1>

        <motion.div
          variants={item}
          className="my-6 w-12 border-b border-[#a68f2e]"
        />

        <motion.p
          variants={item}
          className="max-w-xl text-sm leading-7 text-neutral-600"
        >
          A Luzia Eventos posiciona-se como um santuário para as celebrações
          mais significativas. O nosso compromisso com a hospitalidade
          intemporal e o luxo discreto garante que cada detalhe do seu evento
          seja tratado com a máxima dedicação e profissionalismo. Oferecemos um
          ambiente expansivo e sereno, onde o design moderno se encontra com a
          sofisticação clássica.
        </motion.p>
      </motion.section>
      <motion.section
        className="mx-auto w-full max-w-3xl px-12 py-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          variants={item}
          className={`${cormorant.className} mt-6 text-4xl md:text-5xl text-[#a68f2e]`}
        >
          Galeria Exclusiva
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-xl text-sm leading-7 text-neutral-600 py-5"
        >
          Momentos inesquecíveis capturados nos nossos espaços.
        </motion.p>
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={img.src}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  priority={index === 0}
                  className="h-auto w-full rounded-lg object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.section>
      <section className="flex flex-col items-center justify-center gap-5 my-20">
        <h1
          className={`${cormorant.className} mt-6 text-4xl md:text-5xl text-[#a68f2e]`}
        >
          Comece a planear a experiência do seu evento.
        </h1>
        <Link
          href="/reservations"
          className="inline-block bg-neutral-700 px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#a68f2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a68f2e]"
        >
          Agendar uma consulta.
        </Link>
      </section>
    </main>
  );
}
