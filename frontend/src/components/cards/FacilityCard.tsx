// /components/facilities/FacilityCard.tsx
import type { Facility } from '@/types/facility'; 
import { FiMapPin } from 'react-icons/fi';
import Button from '../buttons/Button';

// Helper untuk format tanggal
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
  }).format(date);
};

export default function FacilityCard({ facility }: { facility: Facility }) {
  const { name, description, buildDate, latitude, longitude, icon: Icon } = facility;

  const handleMapClick = () => {
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
  };

  return (
    <div className="group flex h-full transform flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Header dengan Ikon */}
      <div className="flex items-center justify-center bg-gray-50 p-6">
        <Icon className="h-16 w-16 text-primary transition-transform duration-300 group-hover:scale-110" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Konten Utama */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="mt-2 text-sm text-main-text">
            {description || 'Tidak ada deskripsi tersedia.'}
          </p>
        </div>

        {/* Detail Tambahan & Aksi */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Dibangun pada</span>
            <span className="font-semibold text-gray-500">{formatDate(buildDate)}</span>
          </div>

          <Button
            onClick={handleMapClick}
            className="mt-4 flex w-full items-center justify-center"
          >
            <FiMapPin className="mr-2 h-4 w-4" />
            Lihat di Peta
          </Button>
        </div>
      </div>
    </div>
  );
}