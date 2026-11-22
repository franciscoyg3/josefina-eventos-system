"use client";

import type { GalleryImage } from "@/types/galleryImageType";
import { motion, type Variants } from "motion/react";
import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import Hero from "@/components/layout/Hero";
import Gallery from "@/components/layout/Gallery";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function AboutPage() {
  const stats = [
    {
      value: "25+",
      label: "Anos de experiência",
      description:
        "Uma paixão que nasceu numa cozinha e hoje vive no nosso salão.",
    },
    {
      value: "1 200+",
      label: "Eventos realizados",
      description:
        "Casamentos, aniversários e celebrações corporativas.",
    },
    {
      value: "200",
      label: "Convidados",
      description:
        "Capacidade máxima, com conforto, acústica e iluminação premium.",
    },
    {
      value: "98%",
      label: "Clientes satisfeitos",
      description: "Famílias e empresas que voltam e nos recomendam.",
    },
  ];

  const galleryImages: GalleryImage[] = [
    {
      src: "/images/gallery/7.jpg",
      alt: "Convidados a celebrar na pista de dança",
      category: "Festas",
    },
    {
      src: "/images/gallery/3.jpg",
      alt: "Noivos a posar com um convidado de honra",
      category: "Casamentos",
    },
    {
      src: "/images/gallery/10.jpg",
      alt: "Mesa de catering com copos e decoração",
      category: "Catering",
    },
    {
      src: "/images/gallery/1.jpg",
      alt: "DJ a actuar com os pratos em primeiro plano",
      category: "Festas",
    },
    {
      src: "/images/gallery/9.jpg",
      alt: "Mesa de bolo com decoração em tons azuis",
      category: "Festas",
    },
    {
      src: "/images/gallery/5.jpg",
      alt: "Convidados a dançar sob luzes coloridas",
      category: "Festas",
    },
    {
      src: "/images/gallery/11.jpg",
      alt: "Brinde com taças durante a celebração",
      category: "Catering",
    },
    {
      src: "/images/gallery/4.jpg",
      alt: "Casal de noivos no salão",
      category: "Casamentos",
    },
    {
      src: "/images/gallery/8.jpg",
      alt: "Momento animado entre convidados",
      category: "Festas",
    },
    {
      src: "/images/gallery/2.jpg",
      alt: "Grupo de convidados a conviver",
      category: "Festas",
    },
    {
      src: "/images/gallery/6.jpg",
      alt: "Festa com iluminação vibrante e convidados a sorrir",
      category: "Festas",
    },
    {
      src: "/images/gallery/12.jpg",
      alt: "Celebração de Festa de Casal",
      category: "Casamentos"
    }
  ];

  return (
    <main>
      <Hero
        title="Uma receita de família, um sonho, e o lugar onde os seus momentos ganham vida."
        srcVideo="/videos/hero-video2.mp4"
        srcImg="/images/hero/1hero.jpg"
        variant="compact"
      />

      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2"
      >
        <div>
          <motion.h2
            variants={item}
            className={`${cormorant.className} text-4xl text-[#a68f2e] md:text-5xl`}
          >
            Conheça a nossa história
          </motion.h2>

          <motion.div
            variants={item}
            className="my-6 w-12 border-b border-[#a68f2e]"
          />

          <motion.p
            variants={item}
            className="text-sm leading-7 text-neutral-600"
          >
            Josefina Eventos nasceu de um bolo de casamento e de uma convicção:
            cada celebração merece um lugar à sua altura. Fundada em Luanda por
            Josefina Mateus, que organizava festas há mais de uma década antes
            de abrir o seu próprio salão, a casa reúne a calorosa hospitalidade
            de uma festa em família com a elegância de um espaço pensado ao
            milímetro. Aqui, cada detalhe é tratado como se o evento fosse o
            nosso.
          </motion.p>
        </div>

        <motion.div variants={item}>
          <Image
            src="/images/about1.jpg"
            alt="Josefina a preparar um evento no salão"
            width={600}
            height={450}
            className="h-auto w-full rounded-lg object-cover"
          />
        </motion.div>
      </motion.section>

      <section className="bg-[#8a7226] py-20 text-amber-50">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-6xl px-6"
        >
          <motion.div variants={item} className="mb-14 text-center">
            <h2 className={`${cormorant.className} mt-4 text-4xl md:text-5xl`}>
              A confiança de quem celebra connosco
            </h2>
          </motion.div>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="flex flex-col items-center px-6 text-center lg:border-l lg:border-white/30 lg:first:border-l-0"
              >
                <p
                  className={`${cormorant.className} text-6xl font-medium md:text-7xl`}
                >
                  {stat.value}
                </p>
                <h3 className="mt-3 text-xs font-medium uppercase tracking-[0.2em]">
                  {stat.label}
                </h3>
                <p className="mt-3 max-w-56 text-sm leading-6 text-muted">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      <section className="bg-[#fcfafa] py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-6xl px-6"
        >
          <motion.div
            variants={item}
            className="mb-12 flex flex-col items-center text-center"
          >
            <h2
              className={`${cormorant.className} mt-4 text-4xl text-[#a68f2e] md:text-5xl`}
            >
              Momentos que ficam
            </h2>
            <div className="my-6 w-12 border-b border-[#a68f2e]" />
            <p className="max-w-xl text-sm leading-7 text-neutral-600">
              Um olhar sobre as celebrações que já viveram no nosso salão.
            </p>
          </motion.div>

          <motion.div variants={item}>
            <Gallery images={galleryImages} />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
