export const ReportCategory = {
  CLEANLINESS: "Cleanliness",
  SECURITY: "Security",
  INFRASTRUCTURE: "Infrastructure",
  PUBLIC_SERVICE: "Public service",
  ENVIRONMENT: "Environment",
  SOCIAL: "Social",
  EDUCATION: "Education",
  HEALTH: "Health",
  TRANSPORTATION: "Transportation",
  HOUSING: "Housing",
  OTHER: "Other",
};

export type ReportFormData = {
  title: string;
  date: string;
  category: string;
  file?: FileList;
  description: string;
};
