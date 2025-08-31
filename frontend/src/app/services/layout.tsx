// app/layout.tsx
import "@/app/globals.css";
import ServiceLayout from '@/layouts/Service';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ServiceLayout>{children}</ServiceLayout>
  );
}