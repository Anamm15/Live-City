import Image from "next/image";

export default function GallerySection() {
  return (
    <section className="py-20 px-6 sm:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2
          data-usal="fade-d duration-800"
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900"
        >
          Angle City
        </h2>
        <p
          data-usal="fade-d delay-200 duration-800"
          className="mt-3 sm:mt-4 text-base sm:text-lg text-center text-gray-600"
        >
          Lihatlah keindahan [Nama Kota] melalui lensa.
        </p>

        {/* Gallery Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Item 1 */}
          <div
            data-usal="fade-u duration-700"
            className="group relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-xl shadow-lg"
          >
            <Image
              src="/images/gallery-1.jpg"
              alt="Galeri Kota 1"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Item 2 */}
          <div
            data-usal="fade-u delay-200 duration-700"
            className="group relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-xl shadow-lg col-span-1 md:col-span-2"
          >
            <Image
              src="/images/gallery-3.jpg"
              alt="Galeri Kota 2"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Item 3 */}
          <div
            data-usal="fade-u delay-300 duration-700"
            className="group relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-xl shadow-lg"
          >
            <Image
              src="/images/gallery-2.jpg"
              alt="Galeri Kota 3"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Item 4 */}
          <div
            data-usal="fade-u delay-400 duration-700"
            className="group relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-xl shadow-lg col-span-1 sm:col-span-2 md:col-span-1"
          >
            <Image
              src="/images/gallery-4.jpg"
              alt="Galeri Kota 4"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Item 5 */}
          <div
            data-usal="fade-u delay-500 duration-700"
            className="group relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-xl shadow-lg col-span-1 md:col-span-2"
          >
            <Image
              src="/images/gallery-5.jpg"
              alt="Galeri Kota 5"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Item 6 */}
          <div
            data-usal="fade-u delay-600 duration-700"
            className="group relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-xl shadow-lg"
          >
            <Image
              src="/images/gallery-6.jpg"
              alt="Galeri Kota 6"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
