export type Facility = {
  id: number;
  name: string;
  description?: string | null;
  latitude: number;
  longitude: number;
  buildDate: Date;
  icon: React.ComponentType<{ className?: string }>;
};