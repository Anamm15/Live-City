import { converEnumToOptions } from "@/utils/objectConverting";

export enum ReportCategory {
  CLEANLINESS = "Cleanliness",
  SECURITY = "Security",
  INFRASTRUCTURE = "Infrastructure",
  PUBLIC_SERVICE = "Public Service",
  ENVIRONMENT = "Environment",
  SOCIAL = "Social",
  EDUCATION = "Education",
  HEALTH = "Health",
  TRANSPORTATION = "Transportation",
  HOUSING = "Housing",
  OTHER = "Other",
}

export const ReportCategoryOptions = converEnumToOptions(ReportCategory);

export type ReportFormData = {
  title: string;
  date: string;
  category: string;
  file?: FileList;
  description: string;
};

export type Report = ReportFormData & {
  id: string;
  shortId: string;
  status: string;
};
