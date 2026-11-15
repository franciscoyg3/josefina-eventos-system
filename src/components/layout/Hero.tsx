import { HeroProps } from "@/types/heroPropsType";
import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Hero ( {
    title,
    description,
    src
}: HeroProps ) {
    return (
      <div className="relative flex h-[calc(100svh-70px)] items-center justify-left px-22 overflow-hidden">
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden />

        <div className="relative z-10 w-full max-w-6xl">
          <h1
            className={`${cormorant.className} max-w-3xl text-5xl font-normal leading-[1.1] text-white md:text-5xl lg:text-7xl`}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#f4d598]">
            {description}
          </p>
        </div>
      </div>
    );
}