"use client";

import { CheckCircle } from "lucide-react";
import Image from "next/image";

export function VisionAndMissionSection() {
  return (
    <section className="py-20 px-6 sm:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            data-usal="fade-r duration-1000"
            className="order-2 md:order-1 text-center md:text-left"
          >
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
              Visi Kami
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Menjadi kota pintar (smart city) terdepan di Asia yang berwawasan
              lingkungan, berdaya saing global, dan berakar pada kearifan lokal
              untuk kesejahteraan seluruh warganya.
            </p>
          </div>

          <div
            data-usal="zoomin duration-1000 delay-200"
            className="order-1 md:order-2 flex justify-center"
          >
            <Image
              src="/images/visi-city.jpg"
              alt="Visi kota masa depan"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-usal="zoomin duration-1000" className="flex justify-center">
            <Image
              src="/images/misi-city.jpg"
              alt="Aksi warga kota"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div data-usal="fade-l duration-1000 delay-200">
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
              Misi Kami
            </h2>
            <ul className="mt-6 space-y-4 text-base sm:text-lg text-gray-600">
              {[
                "Meningkatkan kualitas SDM melalui pendidikan dan kesehatan yang terjangkau.",
                "Mengembangkan ekonomi kreatif dan digital sebagai pilar utama pertumbuhan.",
                "Mewujudkan infrastruktur hijau dan sistem transportasi publik yang terintegrasi.",
                "Melestarikan budaya lokal sebagai identitas dan daya tarik pariwisata.",
              ].map((text, i) => (
                <li
                  key={i}
                  data-usal={`fade-u duration-800 delay-${i * 200}`}
                  className="flex items-start"
                >
                  <CheckCircle className="flex-shrink-0 w-6 h-6 text-green-500 mt-1 mr-3" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
