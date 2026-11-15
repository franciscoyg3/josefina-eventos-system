"use client";

import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import ServiceCard from "@/components/layout/ServiceCard";
import Hero from "../components/layout/Hero";
import type { ServiceCardProps } from "@/types/cardServiceType";
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

  const services: ServiceCardProps[] = [
    {
      src: "/images/services/catering.jpg",
      alt: "Prato de carne servido num evento",
      title: "Catering",
      description:
        "Menus elaborados com ingredientes frescos e apresentação cuidada, desde cocktails e buffets a jantares volantes, adaptados ao tema e ao número de convidados.",
      href: "/servicos/catering",
    },
    {
      src: "/images/services/decoracao.jpg",
      alt: "Mesa decorada com arranjos florais e detalhes dourados",
      title: "Decoração",
      description:
        "Ambientes pensados ao detalhe, com flores, iluminação e mobiliário que dão vida ao conceito do seu evento e criam uma atmosfera inesquecível.",
      href: "/servicos/decoracao",
    },
    {
      src: "/images/services/aluguer.jpg",
      alt: "Salão amplo com mesas e cadeiras vermelhas",
      title: "Aluguer do Espaço",
      description:
        "Salões amplos e versáteis, desenhados para acomodar desde reuniões intimistas a grandes galas corporativas e casamentos, com acústica e iluminação premium.",
      href: "/servicos/aluguer",
    },
    {
      src: "/images/services/fotografia.jpg",
      alt: "Fotógrafo a registar momentos de uma celebração",
      title: "Fotografia e Filmagens",
      description:
        "Registamos cada momento importante com um olhar artístico, entregando fotografias e vídeos que preservam a emoção da sua celebração para sempre.",
      href: "/servicos/fotografia",
    },
  ];

  return (
    <main>
      <Hero
        title="Celebrações Inesquecíveis Elegância Intemporal"
        description="Descubra o refúgio ideal para os momentos mais importantes da sua vida. Um espaço desenhado com precisão arquitetónica e hospitalidade de excelência para casamentos e eventos corporativos de prestígio."
        src="/images/0hero.jpg"
      />
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center"
      >
        <motion.span variants={item} className="text-xl text-[#8a7226]">
          &#9670;
        </motion.span>

        <motion.h2
          variants={item}
          className={`${cormorant.className} mt-6 text-4xl text-[#a68f2e] md:text-5xl`}
        >
          Bem-vindo à Luzia Eventos
        </motion.h2>

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
      <section className="mx-auto my-20 max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`${cormorant.className} text-4xl text-[#a68f2e] md:text-5xl`}
        >
          Nossos Serviços
        </motion.h2>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid justify-items-center gap-8 md:grid-cols-2"
        >
          {services.map((serv) => (
            <motion.div key={serv.title} variants={item} className="w-full max-w-sm">
              <ServiceCard
                src={serv.src}
                alt={serv.alt}
                title={serv.title}
                description={serv.description}
                href={serv.href}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="flex flex-col items-center justify-center text-center gap-5 my-20"
      >
        <motion.h1
          variants={item}
          className={`${cormorant.className} mt-6 text-4xl md:text-5xl text-[#a68f2e]`}
        >
          Comece a planear a experiência do seu evento.
        </motion.h1>
        <motion.div variants={item} className="mt-6">
          <Link
            href="/reservations"
            className="inline-block bg-neutral-700 mt-6 px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#a68f2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a68f2e]"
          >
            Agendar uma consulta.
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );
}
