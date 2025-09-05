import Image from "next/image";
import Button from "@/components/buttons/Button";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-screen h-screen">
      <Image
        src="/images/cityscape.png"
        alt="Description of image"
        layout="fill"
        objectFit="cover"
      />
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 ms-28 mt-[25rem] text-white z-10 w-[45%]">
        <p className="text-6xl font-bold">
          Welcome to the First Sustainable City in The World
        </p>
        <Button className="mt-4">
          <Link href={"/login"} className="flex items-center gap-3">
            Login as Resident
            <FaArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
