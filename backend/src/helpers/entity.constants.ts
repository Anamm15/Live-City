export const EconomicStatus = ['LOWER', 'LOWER_MIDDLE', 'MIDDLE', 'UPPER_MIDDLE', 'UPPER', 'UNKNOWN'] as const;
export const Gender = ['MALE', 'FEMALE'] as const;
export const Religion = ['ISLAM', 'CHRISTIAN', 'CATHOLIC', 'HINDU', 'BUDDHIST', 'CONFUCIAN', 'JUDAISM'] as const;
export const MaritalStatus = ['NEVER_MARRIED', 'MARRIED', 'DIVORCED', 'WIDOWED'] as const;
export const Role = ['ADMIN', 'USER'] as const;
export const Education = ['NO_SCHOOLING', 'ELEMENTARY', 'MIDDLE_SCHOOL', 'HIGH_SCHOOL', 'DIPLOMA_3', 'DIPLOMA_4', 'BACHELOR', 'MASTER', 'DOCTORATE'] as const;
export const Occupation = ['ENTREPRENEUR', 'UNEMPLOYED', 'EMPLOYED', 'STUDENT', 'RETIRED', 'OTHER'] as const;
export const ReportCategory = ['CLEANLINESS', 'SECURITY', 'INFRASTRUCTURE', 'PUBLIC_SERVICE', 'ENVIRONMENT', 'SOCIAL', 'EDUCATION', 'HEALTH', 'TRANSPORTATION', 'HOUSING', 'OTHER'] as const;
export const ReportStatus = ['PENDING', 'IN_PROGRESS', 'COMPLETED'] as const;
export const SubmissionCategory = [
   'ID_CARD',
   'FAMILY_CARD',
   'POLICE_CLEARANCE',
   'BUSINESS_CERTIFICATE',
   'DOMICILE_CERTIFICATE',
   'POVERTY_CERTIFICATE',
   'EVENT_PERMIT',
   'MICRO_BUSINESS_LICENSE',
   'INHERITANCE_CERTIFICATE',
   'HEIR_CERTIFICATE',
   'DEATH_CERTIFICATE',
   'BIRTH_CERTIFICATE',
   'MARRIAGE_CERTIFICATE',   
   'DIVORCE_CERTIFICATE',   
   'COVER_LETTER',
] as const;
export const SubmissionStatus = ['PENDING', 'PROCESSING', 'COMPLETED', 'REJECTED'] as const;
export const PollsType = ['VOTING', 'SURVEY'] as const;
export const PollsStatus = ['ACTIVE', 'CLOSED'] as const;
export const FileableType = [
   'VILLAGE',
   'FACILITY',
   'COMMUNITY',
   'NEWS',
   'SUBMISSION',
   'REPORT',
   'USER',
] as const;

export type EconomicStatusType = typeof EconomicStatus[number];
export type GenderType = typeof Gender[number];
export type ReligionType = typeof Religion[number];
export type MaritalStatusType = typeof MaritalStatus[number];
export type RoleType = typeof Role[number];
export type EducationType = typeof Education[number];
export type OccupationType = typeof Occupation[number];
export type ReportCategoryType = typeof ReportCategory[number];
export type ReportStatusType = typeof ReportStatus[number];
export type SubmissionCategoryType = typeof SubmissionCategory[number];
export type SubmissionStatusType = typeof SubmissionStatus[number];
export type PollsTypeType = typeof PollsType[number];
export type PollsStatusType = typeof PollsStatus[number];
export type FileableTypeType = typeof FileableType[number];
