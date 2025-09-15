"use client";

import { Plane, Rocket, TreePine, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function CityInNumberSection() {
  const stats = [
    { icon: Users, value: "1.2 Juta", label: "Penduduk Bahagia" },
    { icon: TreePine, value: "42%", label: "Ruang Terbuka Hijau" },
    { icon: Rocket, value: "500+", label: "Startup Digital" },
    { icon: Plane, value: "3 Juta", label: "Wisatawan/Tahun" },
  ];

  return (
    <section className="py-20 px-8 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold">Kota dalam Angka</h2>
        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
          Data berbicara. Lihat sekilas pencapaian dan potensi yang dimiliki
          [Nama Kota].
        </p>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <stat.icon size={40} className="text-cyan-400" />
              <p className="text-5xl font-extrabold mt-2">{stat.value}</p>
              <p className="text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
