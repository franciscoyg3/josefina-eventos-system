"use client";

import { HeroProps } from "@/types/heroPropsType";
import { Cormorant_Garamond } from "next/font/google";
import { motion, type Variants } from "motion/react";
import Image from "next/image";

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
    srcVideo,
    variant = "full",
    srcImg
}: HeroProps ) {
    const isFull = variant == "full";

    return (
      <div
        className={`relative flex items-center overflow-hidden px-6 md:px-22 ${
          isFull ? "h-[calc(100svh-70px)]" : "h-[50svh] min-h-70"
        }`}
      >
        {srcVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={srcImg}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={srcVideo} type="video/mp4" />
          </video>
        ) : (
          <Image src={srcImg} alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
        )}

        <div
          className={`absolute inset-0 ${
            isFull ? "bg-black/50" : "bg-linear-to-t from-black/80 to-black/50"
          }`}
          aria-hidden
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="relative z-10 w-full max-w-6xl"
        >
          <motion.h1
            variants={item}
            className={`${cormorant.className} max-w-3xl font-normal leading-[1.1] text-white ${
              isFull ? "text-5xl lg:text-7xl" : "text-4xl lg:text-5xl"
            }`}
          >
            {title}
          </motion.h1>

          {isFull && description && (
            <motion.p
              variants={item}
              className="mt-6 max-w-2xl text-base leading-7 text-white/85"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    );
}