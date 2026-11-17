"use client";

import { HeroProps } from "@/types/heroPropsType";
import { Cormorant_Garamond } from "next/font/google";
import { motion, type Variants } from "motion/react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Hero ( {
    title,
    description,
    src
}: HeroProps ) {
    return (
      <div className="relative flex h-[calc(100svh-70px)] items-center justify-left px-22 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero/0hero.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" aria-hidden />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="relative z-10 w-full max-w-6xl"
        >
          <motion.h1
            variants={item}
            className={`${cormorant.className} max-w-3xl text-5xl font-normal leading-[1.1] text-white lg:text-7xl`}
          >
            {title}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-base leading-7 text-[#f4d598]"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    );
}