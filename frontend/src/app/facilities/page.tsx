"use client";

import FacilityCard from "@/components/cards/FacilityCard";
import Navbar from "@/components/semantic/Navbar";
import type { Facility } from "@/types/facility";
import {
  FaSwimmingPool,
  FaTree,
  FaHospitalAlt,
  FaSchool,
} from "react-icons/fa";

// Data Dummy
const mockFacilities: Facility[] = [
  {
    id: 1,
    name: "Kolam Renang Olimpiade",
    description:
      "Kolam renang dengan standar internasional untuk warga, dilengkapi dengan fasilitas modern.",
    latitude: -7.5361,
    longitude: 112.2384,
    buildDate: new Date("2021-05-15"),
    icon: FaSwimmingPool,
  },
  {
    id: 2,
    name: "Taman Kota Sentral",
    description:
      "Area hijau di pusat kota yang menyediakan ruang terbuka untuk rekreasi dan bersantai.",
    latitude: -7.537,
    longitude: 112.239,
    buildDate: new Date("2019-11-20"),
    icon: FaTree,
  },
  {
    id: 3,
    name: "Puskesmas Harapan Sehat",
    description:
      "Pusat kesehatan masyarakat yang melayani kebutuhan medis dasar bagi seluruh warga.",
    latitude: -7.5355,
    longitude: 112.2378,
    buildDate: new Date("2022-01-30"),
    icon: FaHospitalAlt,
  },
  {
    id: 4,
    name: "Sekolah Dasar Negeri 01",
    description:
      "Institusi pendidikan dasar yang berfokus pada pengembangan akademik dan karakter siswa.",
    latitude: -7.5381,
    longitude: 112.2405,
    buildDate: new Date("2018-07-01"),
    icon: FaSchool,
  },
];

export default function FacilitiesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-background p-4 sm:p-8 mt-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Our Facilities
          </h1>
          <p className="mb-8 text-main-text">
            Explore the various facilities available to enhance your quality of
            life.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockFacilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
