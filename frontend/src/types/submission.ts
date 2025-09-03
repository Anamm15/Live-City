export const SubmissionCategory = {
  ID_CARD: "Id card",
  FAMILY_CARD: "Family card",
  POLICE_CLEARANCE: "Police clearance",
  BUSINESS_CERTIFICATE: "Business certificate",
  DOMICILE_CERTIFICATE: "Domicile certificate",
  POVERTY_CERTIFICATE: "Poverty certificate",
  EVENT_PERMIT: "Event permit",
  MICRO_BUSINESS_LICENSE: "Micro business license",
  INHERITANCE_CERTIFICATE: "Inheritance certificate",
  HEIR_CERTIFICATE: "Heir certificate",
  DEATH_CERTIFICATE: "Death certificate",
  BIRTH_CERTIFICATE: "Birth certificate",
  MARRIAGE_CERTIFICATE: "Marriage certificate",
  DIVORCE_CERTIFICATE: "Divorce certificate",
  COVER_LETTER: "Cover letter",
};

export type SubmissionFormData = {
  title: string;
  content: string;
  date: string;
  category: string;
  file?: FileList;
  description: string;
};
