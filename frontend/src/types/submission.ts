import { converEnumToOptions } from "@/utils/objectConverting";

export enum SubmissionCategory {
  ID_CARD = "ID Card",
  FAMILY_CARD = "Family Card",
  POLICE_CLEARANCE = "Police Clearance",
  BUSINESS_CERTIFICATE = "Business Certificate",
  DOMICILE_CERTIFICATE = "Domicile Certificate",
  POVERTY_CERTIFICATE = "Poverty Certificate",
  EVENT_PERMIT = "Event Permit",
  MICRO_BUSINESS_LICENSE = "Micro Business License",
  INHERITANCE_CERTIFICATE = "Inheritance Certificate",
  HEIR_CERTIFICATE = "Heir Certificate",
  DEATH_CERTIFICATE = "Death Certificate",
  BIRTH_CERTIFICATE = "Birth Certificate",
  MARRIAGE_CERTIFICATE = "Marriage Certificate",
  DIVORCE_CERTIFICATE = "Divorce Certificate",
  COVER_LETTER = "Cover Letter",
}

export const SubmissionCategoryOptions =
  converEnumToOptions(SubmissionCategory);

export type SubmissionFormData = {
  title: string;
  content: string;
  date: string;
  category: string;
  file?: FileList;
  description: string;
};

export type Submission = SubmissionFormData & {
  id: string;
  shortId: string;
  status: string;
};
