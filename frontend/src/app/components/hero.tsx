"use client";

import Image from "next/image";
import Button from "@/components/buttons/Button";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-screen h-[calc(100vh-5rem)] overflow-hidden mt-20">
      <Image
        src="/images/cityscape.png"
        alt="Description of image"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 lg:px-28 z-10 text-white">
        <h1
          data-usal="fade-u duration-1000"
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl drop-shadow-lg"
        >
          Welcome to the First <br className="hidden md:block" />
          Sustainable City in The World
        </h1>

        <p
          data-usal="fade-u delay-200 duration-1000"
          className="mt-4 text-base sm:text-lg md:text-2xl max-w-2xl drop-shadow-md"
        >
          Discover charm, culture, and innovation in the heart of the Indonesian
          archipelago. A city where tradition meets the future.
        </p>

        <Button
          data-usal="fade-u delay-400 duration-1000"
          className="mt-6 py-3 px-6 text-base sm:text-lg rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          <Link href={"/login"} className="flex items-center gap-3">
            Login as Resident
            <FaArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
