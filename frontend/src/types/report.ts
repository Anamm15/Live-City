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
  id: number;
  shortId: string;
  status: string;
  response?: string;
  files?: {
    id: number;
    urlFile: string;
    fileableId: number;
  }[];
  user: {
    id: number;
    name: string;
    email?: string;
    phoneNumber?: string;
    nationalIdentityNumber: string;
  };
};

export type ReportResponseUpdateData = {
  status: string;
  response?: string;
};
