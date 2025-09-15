"use client";
import Hero from "./components/hero";
import Navbar from "@/components/semantic/Navbar";
import { VisionAndMissionSection } from "./components/vision";
import FeatureSection from "./components/feature";
import GallerySection from "./components/gallery";
import TestimoniSection from "./components/testimoni";
import CityInNumberSection from "./components/cityInNumber";
import CTASection from "./components/cta";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-50 text-gray-800 overflow-x-hidden">
      <Navbar />
      <Hero />
      <main>
        <VisionAndMissionSection />
        <FeatureSection />
        <GallerySection />
        <TestimoniSection />
        <CityInNumberSection />
        <CTASection />
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto py-8 px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Profil [Nama Kota]. Hak Cipta
            Dilindungi.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-cyan-600 transition-colors"
            >
              <Twitter />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-cyan-600 transition-colors"
            >
              <Instagram />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-cyan-600 transition-colors"
            >
              <Facebook />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
