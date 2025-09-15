import { Building, Palette, UtensilsCrossed } from "lucide-react";

export default function FeatureSection() {
  return (
    <section id="fitur" className="py-20 px-6 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Judul */}
        <h2
          data-usal="fade-d duration-800"
          className="text-3xl sm:text-4xl font-bold text-gray-900"
        >
          Mengapa <span className="text-cyan-600">[Nama Kota]</span>?
        </h2>
        <p
          data-usal="fade-d delay-200 duration-800"
          className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Tiga pilar utama yang menjadikan kota kami istimewa dan tak
          terlupakan.
        </p>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Card 1 */}
          <div
            data-usal="fade-u duration-800"
            className="group flex flex-col items-center p-8 border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white"
          >
            <div className="bg-cyan-100 text-cyan-600 p-5 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Building size={32} />
            </div>
            <h3 className="mt-6 text-xl sm:text-2xl font-bold text-gray-900">
              Wisata Ikonik
            </h3>
            <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
              Dari bangunan bersejarah hingga landmark modern yang menakjubkan,
              setiap sudut kota menawarkan cerita.
            </p>
          </div>

          {/* Card 2 */}
          <div
            data-usal="fade-u delay-200 duration-800"
            className="group flex flex-col items-center p-8 border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white"
          >
            <div className="bg-amber-100 text-amber-600 p-5 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-500">
              <UtensilsCrossed size={32} />
            </div>
            <h3 className="mt-6 text-xl sm:text-2xl font-bold text-gray-900">
              Surga Kuliner
            </h3>
            <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
              Cicipi ragam cita rasa otentik yang akan memanjakan lidah Anda,
              dari jajanan kaki lima hingga restoran mewah.
            </p>
          </div>

          {/* Card 3 */}
          <div
            data-usal="fade-u delay-400 duration-800"
            className="group flex flex-col items-center p-8 border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white"
          >
            <div className="bg-rose-100 text-rose-600 p-5 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Palette size={32} />
            </div>
            <h3 className="mt-6 text-xl sm:text-2xl font-bold text-gray-900">
              Budaya & Seni
            </h3>
            <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
              Selami kekayaan budaya melalui festival meriah, galeri seni, dan
              pertunjukan tradisional yang hidup.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
