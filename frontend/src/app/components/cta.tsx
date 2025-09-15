export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 sm:py-20 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          data-usal="fade-u duration-800"
          className="text-2xl sm:text-4xl font-bold leading-tight"
        >
          Siap Untuk Petualangan Anda?
        </h2>
        <p
          data-usal="fade-u delay-200 duration-800"
          className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-300"
        >
          Rencanakan kunjungan Anda, jelajahi peluang bisnis, atau sekadar cari
          tahu lebih banyak tentang apa yang membuat [Nama Kota] begitu hidup.
        </p>
        <a
          href="#"
          data-usal="zoom-in delay-400 duration-800"
          className="mt-6 sm:mt-8 inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
        >
          Pelajari Lebih Lanjut
        </a>
      </div>
    </section>
  );
}
