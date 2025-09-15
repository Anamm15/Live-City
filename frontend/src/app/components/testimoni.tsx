"use client";

import { Quote } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Kota ini punya energi yang luar biasa. Perpaduan antara inovasi teknologi dan keramahan warganya membuat saya betah dan selalu ingin kembali.",
    name: "Sarah Widianto",
    role: "Digital Nomad",
    avatar: "/avatar-1.jpg",
  },
  {
    text: "Sebagai seorang investor, saya melihat potensi pertumbuhan yang sangat besar di sini. Ekosistem startup-nya hidup dan didukung penuh oleh pemerintah kota.",
    name: "Budi Hartono",
    role: "Investor Teknologi",
    avatar: "/avatar-2.jpg",
  },
  {
    text: "Saya lahir dan besar di sini. Saya bangga melihat kota ini terus berkembang tanpa kehilangan identitas budayanya. Kulinernya juga juara!",
    name: "Ayu Lestari",
    role: "Seniman Lokal",
    avatar: "/avatar-3.jpg",
  },
];

export default function TestimoniSection() {
  return (
    <section className="py-20 px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900">Apa Kata Mereka?</h2>
        <p className="mt-4 text-lg text-gray-600">
          Dengarkan langsung dari mereka yang telah merasakan kehangatan dan
          dinamika kota kami.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300"
            >
              <Quote className="text-cyan-400 w-10 h-10" />
              <p className="mt-4 text-gray-600 italic">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
